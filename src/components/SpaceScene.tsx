// src/components/SpaceScene.tsx
import { Environment } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BackSide, TextureLoader, Vector3 } from 'three';
import { starsData } from '../data/starsData';
import { useNavigationStore } from '../stores/navigationStore';
import GalaxyBackground from './GalaxyBackground';
import Spacecraft from './Spacecraft';
import Stars from './Stars';
import WarpEffects from './WarpEffects';

const chooseLeftTangentJoin = (start: Vector3, center: Vector3, radius: number) => {
  const relX = start.x - center.x;
  const relZ = start.z - center.z;
  const dist = Math.hypot(relX, relZ);

  if (dist <= radius + 1e-4) {
    return null;
  }

  const baseAngle = Math.atan2(relZ, relX);
  const offset = Math.acos(THREE.MathUtils.clamp(radius / dist, -1, 1));
  const candidateAngles = [baseAngle + offset, baseAngle - offset];

  const toCenterX = center.x - start.x;
  const toCenterZ = center.z - start.z;
  const toCenterLen = Math.hypot(toCenterX, toCenterZ) || 1;
  const toCenterDirX = toCenterX / toCenterLen;
  const toCenterDirZ = toCenterZ / toCenterLen;

  // left vector in XZ plane = up x forward
  const leftX = toCenterDirZ;
  const leftZ = -toCenterDirX;

  let bestAngle = candidateAngles[0];
  let bestScore = -Infinity;

  for (const angle of candidateAngles) {
    const px = center.x + Math.cos(angle) * radius;
    const pz = center.z + Math.sin(angle) * radius;
    const dirX = px - start.x;
    const dirZ = pz - start.z;
    const dirLen = Math.hypot(dirX, dirZ) || 1;
    const dirNormX = dirX / dirLen;
    const dirNormZ = dirZ / dirLen;
    const score = dirNormX * leftX + dirNormZ * leftZ;

    if (score > bestScore) {
      bestScore = score;
      bestAngle = angle;
    }
  }

  const tangentX = Math.cos(bestAngle + Math.PI / 2);
  const tangentZ = Math.sin(bestAngle + Math.PI / 2);
  const targetX = center.x + Math.cos(bestAngle) * radius;
  const targetZ = center.z + Math.sin(bestAngle) * radius;

  return {
    orbitAngle: bestAngle,
    targetX,
    targetZ,
    tangentX,
    tangentZ,
  };
};

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
  const orbitDirection = useRef<1 | -1>(1);
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

        const tangentJoin = chooseLeftTangentJoin(camera.position, new Vector3(x, y, z), orbitRadius.current);

        if (tangentJoin) {
          orbitAngle.current = tangentJoin.orbitAngle;
          targetPosition.current.set(tangentJoin.targetX, y, tangentJoin.targetZ);

          const toTargetX = tangentJoin.targetX - camera.position.x;
          const toTargetZ = tangentJoin.targetZ - camera.position.z;
          const toTargetLen = Math.hypot(toTargetX, toTargetZ) || 1;
          const approachX = toTargetX / toTargetLen;
          const approachZ = toTargetZ / toTargetLen;
          const tangentDot = tangentJoin.tangentX * approachX + tangentJoin.tangentZ * approachZ;
          orbitDirection.current = tangentDot >= 0 ? 1 : -1;

          const tangentAngle = orbitAngle.current + (Math.PI / 2) * orbitDirection.current;
          const lookX = x + Math.cos(tangentAngle) * 2;
          const lookZ = z + Math.sin(tangentAngle) * 2;
          targetLookAt.current.set(lookX, y, lookZ);
        } else {
          const fallbackAngle = Math.atan2(camera.position.z - z, camera.position.x - x);
          orbitAngle.current = fallbackAngle;
          orbitDirection.current = 1;

          const orbitX = x + Math.cos(orbitAngle.current) * orbitRadius.current;
          const orbitZ = z + Math.sin(orbitAngle.current) * orbitRadius.current;
          targetPosition.current.set(orbitX, y, orbitZ);

          const tangentAngle = orbitAngle.current + Math.PI / 2;
          const lookX = x + Math.cos(tangentAngle) * 2;
          const lookZ = z + Math.sin(tangentAngle) * 2;
          targetLookAt.current.set(lookX, y, lookZ);
        }
        
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
        orbitAngle.current += delta * 0.3 * orbitDirection.current;
        
        const orbitX = cx + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = cz + Math.sin(orbitAngle.current) * orbitRadius.current;
        
        targetPosition.current.set(orbitX, cy, orbitZ);
        
        const tangentAngle = orbitAngle.current + (Math.PI / 2) * orbitDirection.current;
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
      <WarpEffects />
    </>
  );
};

export default SpaceScene;
