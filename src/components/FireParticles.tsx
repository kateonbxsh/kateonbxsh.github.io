// src/components/FireParticles.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FireParticles: React.FC<{ intensity: 'high' | 'low' }> = ({ intensity }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = intensity === 'high' ? 100 : 30;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = -Math.random() * 0.1 - 0.05;
      
      lifetimes[i] = Math.random() * 0.8 + 0.2;
    }

    return { positions, velocities, lifetimes };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speedMultiplier = intensity === 'high' ? 0.2 : 0.1;

    for (let i = 0; i < count; i++) {
      particles.lifetimes[i] -= delta * 2;

        if (particles.lifetimes[i] <= 0) {
            positions[i * 3] = (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 2] = 0;
            particles.lifetimes[i] = 0.5 + Math.random() * 0.5;
            
            particles.velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            particles.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            particles.velocities[i * 3 + 2] = -Math.random() * speedMultiplier - 0.05;
        } else {
            positions[i * 3] += particles.velocities[i * 3];
            positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
            positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
        }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={particles.positions}>
      <PointMaterial
        transparent
        color="#ff4800"
        size={intensity === 'high' ? 0.1 : 0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default FireParticles;