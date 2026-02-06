// src/components/SpaceScene.tsx
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Vector3, TextureLoader, BackSide } from 'three';
import { starsData } from '../data/starsData';
import { useNavigationStore } from '../stores/navigationStore';
import GalaxyBackground from './GalaxyBackground';
import Spacecraft from './Spacecraft';
import Stars from './Stars';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const SpaceScene: React.FC = () => {
  const { camera } = useThree();
  const { currentView, selectedStarId, setTransitioning } = useNavigationStore();
  
  const targetPosition = useRef(new Vector3(0, 0, 50));
  const targetLookAt = useRef(new Vector3(0, 0, 0));
  const orbitAngle = useRef(0);
  const orbitRadius = useRef(3);
  const isOrbiting = useRef(false);
  const isReturning = useRef(true);
  const hasReachedOrbit = useRef(false);
  const returnPhase = useRef(1);
  const homeOrbitAngle = useRef(0);
  const homeOrbitRadius = 90;
  const isHomeOrbiting = useRef(false);
  const texture = useLoader(TextureLoader, '/textures/space-sky.png')

  useEffect(() => {
    if (currentView === 'home') {
      isOrbiting.current = false;
      isReturning.current = true;
      hasReachedOrbit.current = false;
      returnPhase.current = 0;
      setTransitioning(true);

      const currentPos = camera.position.clone();
      const directionToHome = new Vector3(0, 0, 50).sub(currentPos).normalize();
      const lookAtTarget = currentPos.clone().add(directionToHome.multiplyScalar(10));
      targetLookAt.current.copy(lookAtTarget);
      
      setTimeout(() => {
        returnPhase.current = 1;
        // Calculate angle to smoothly join home orbit
        const currentAngle = Math.atan2(camera.position.x, camera.position.z);
        homeOrbitAngle.current = currentAngle;
        
        const orbitX = Math.sin(homeOrbitAngle.current) * homeOrbitRadius;
        const orbitZ = Math.cos(homeOrbitAngle.current) * homeOrbitRadius;
        targetPosition.current.set(orbitX, 0, orbitZ);
        targetLookAt.current.set(0, 0, 0);
      }, 1200);
    } else if (currentView === 'star' && selectedStarId) {
      const star = starsData.find((s) => s.id === selectedStarId);
      if (star) {
        const [x, y, z] = star.position;
        isReturning.current = false;
        isOrbiting.current = false;
        isHomeOrbiting.current = false;
        hasReachedOrbit.current = false;
        returnPhase.current = 0;
        orbitRadius.current = 0.8;
        const dx = x - camera.position.x;
        const dy = y - camera.position.y;

        const angle = Math.atan2(-dy, -dx); // radians
        orbitAngle.current = angle;
        
        const orbitX = x + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = z + Math.sin(orbitAngle.current) * orbitRadius.current;
        
        targetPosition.current.set(orbitX, y, orbitZ);
        
        const tangentAngle = orbitAngle.current + Math.PI / 2 + 0.4;
        const tangentX = Math.cos(tangentAngle) * 2;
        const tangentZ = Math.sin(tangentAngle) * 2;

        const lookX = x + tangentX;
        const lookZ = z + tangentZ;
        targetLookAt.current.set(lookX, y, lookZ);
        
        setTransitioning(true);
      }
    }
  }, [currentView, selectedStarId, setTransitioning, camera]);

  useFrame((_, delta) => {
    let positionSmoothing = .9 * delta;
    let lookSmoothing = 0.4 * delta;
    
    if (isReturning.current) {
      if (returnPhase.current === 0) {
        positionSmoothing = 6 * delta;
      } else {
        positionSmoothing = 1.2 * delta;
      }
    }
    
    // Home orbit - slow rotation around center
    if ((currentView === 'home' && isHomeOrbiting.current && !isReturning.current) || currentView === 'start') {
      homeOrbitAngle.current += delta * 0.05;
      const orbitX = Math.sin(homeOrbitAngle.current) * homeOrbitRadius;
      const orbitZ = Math.cos(homeOrbitAngle.current) * homeOrbitRadius;
      
      targetPosition.current.set(orbitX, 0, orbitZ);
      targetLookAt.current.set(0, 0, 0);
    }
    
    // Star orbit
    if (isOrbiting.current && selectedStarId && !isReturning.current) {
      const star = starsData.find((s) => s.id === selectedStarId);
      if (star) {
        const [cx, cy, cz] = star.position;
        orbitAngle.current += delta * 0.3;
        
        const orbitX = cx + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = cz + Math.sin(orbitAngle.current) * orbitRadius.current;
        
        targetPosition.current.set(orbitX, cy, orbitZ);
        
        const tangentAngle = orbitAngle.current + Math.PI / 2 + 0.4;
        const lookX = cx + Math.cos(tangentAngle) * 2;
        const lookZ = cz + Math.sin(tangentAngle) * 2;
        targetLookAt.current.set(lookX, cy, lookZ);
      }
    }

    camera.position.lerp(targetPosition.current, positionSmoothing);
    
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.add(camera.position);
    currentLookAt.lerp(targetLookAt.current, lookSmoothing);
    camera.lookAt(currentLookAt);

    const distance = camera.position.distanceTo(targetPosition.current);
    
    if (!isOrbiting.current && !isReturning.current && distance < 2 && !hasReachedOrbit.current && currentView === 'star') {
      hasReachedOrbit.current = true;
      isOrbiting.current = true;
      setTransitioning(false);
    } else if (isReturning.current && returnPhase.current === 1 && distance < 5) {
      isReturning.current = false;
      isHomeOrbiting.current = true;
      setTransitioning(false);
    }
  });

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Repeat twice along X axis (horizontal)
  texture.repeat.set(2, 1)  // (x, y)

  // Optionally dim
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[10, 5, 10]}
        intensity={3}
        castShadow
      />
      <mesh scale={1000}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          side={BackSide}       // render inside of the sphere
          map={texture}         // your PNG
          transparent           // allows opacity control
          opacity={0.15}         // dim effect
          toneMapped={true}    // avoids HDR tonemapping
        />
      </mesh>

      <Environment preset="sunset" />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <GalaxyBackground />
      <Stars />
      <Spacecraft />
    </>
  );
};

export default SpaceScene;