// src/components/SpaceScene.tsx
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Vector3, Quaternion } from 'three';
import { starsData } from '../data/starsData';
import { useNavigationStore } from '../stores/navigationStore';
import GalaxyBackground from './GalaxyBackground';
import Spacecraft from './Spacecraft';
import Stars from './Stars';

const SpaceScene: React.FC = () => {
  const { camera } = useThree();
  const { currentView, selectedStarId, setTransitioning } = useNavigationStore();
  
  const targetPosition = useRef(new Vector3(0, 0, 50));
  const targetLookAt = useRef(new Vector3(0, 0, 0));
  const orbitAngle = useRef(0);
  const orbitRadius = useRef(4);
  const isOrbiting = useRef(false);
  const isReturning = useRef(false);
  const hasReachedOrbit = useRef(false);
  const returnPhase = useRef(0); // 0: turning, 1: moving back

  useEffect(() => {
    if (currentView === 'home') {
      isOrbiting.current = false;
      isReturning.current = true;
      hasReachedOrbit.current = false;
      returnPhase.current = 0;
      setTransitioning(true);

      // Turn to look towards home first
    const currentPos = camera.position.clone();
    const directionToHome = new Vector3(0, 0, 50).sub(currentPos).normalize();
    const lookAtTarget = currentPos.clone().add(directionToHome.multiplyScalar(10));
    targetLookAt.current.copy(lookAtTarget);
      
      // First turn around slowly
      setTimeout(() => {
        returnPhase.current = 1;
        targetPosition.current.set(0, 0, 50);
        targetLookAt.current.set(0, 0, 0);
      }, 1200);
    } else if (currentView === 'star' && selectedStarId) {
      const star = starsData.find((s) => s.id === selectedStarId);
      if (star) {
        const [x, y, z] = star.position;
        isReturning.current = false;
        isOrbiting.current = false;
        hasReachedOrbit.current = false;
        returnPhase.current = 0;
        orbitRadius.current = 0.7;
        orbitAngle.current = Math.PI / 2;
        
        const orbitX = x + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = z + Math.sin(orbitAngle.current) * orbitRadius.current;
        
        targetPosition.current.set(orbitX, y, orbitZ);
        
        const tangentAngle = orbitAngle.current + Math.PI / 2;
        const lookX = x + Math.cos(tangentAngle) * 2;
        const lookZ = z + Math.sin(tangentAngle) * 2;
        targetLookAt.current.set(lookX, y, lookZ);
        
        setTransitioning(true);
      }
    }
  }, [currentView, selectedStarId, setTransitioning]);

  useFrame((state, delta) => {
    let positionSmoothing = 1.2 * delta;
    let lookSmoothing = .4 * delta;
    
    // Slower smoothing when returning
    if (isReturning.current) {
      if (returnPhase.current === 0) {
        // Turning phase - only rotate, very slow
        positionSmoothing = 6 * delta;
      } else {
        // Moving back phase - slow and smooth
        positionSmoothing = 1.2 * delta;
      }
    }
    
    if (isOrbiting.current && selectedStarId && !isReturning.current) {
      const star = starsData.find((s) => s.id === selectedStarId);
      if (star) {
        const [cx, cy, cz] = star.position;
        orbitAngle.current += delta * 0.3;
        
        const orbitX = cx + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = cz + Math.sin(orbitAngle.current) * orbitRadius.current;
        
        targetPosition.current.set(orbitX, cy, orbitZ);
        
        const tangentAngle = orbitAngle.current + Math.PI / 2;
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
    
    if (!isOrbiting.current && !isReturning.current && distance < 2 && !hasReachedOrbit.current) {
      hasReachedOrbit.current = true;
      isOrbiting.current = true;
      setTransitioning(false);
    } else if (isReturning.current && returnPhase.current === 1 && distance < 10) {
      isReturning.current = false;
      setTransitioning(false);
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <GalaxyBackground />
      <Stars />
      <Spacecraft />
    </>
  );
};

export default SpaceScene;