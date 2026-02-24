// src/components/GalaxyBackground.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HOME_ORBIT_RADIUS = 90;
const DISTANT_STAR_MIN_RADIUS = HOME_ORBIT_RADIUS * 1.5;

const GalaxyBackground: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;

      let x = 0;
      let y = 0;
      let z = 0;
      let distance = 0;

      do {
        x = (Math.random() - 0.5) * 440;
        y = (Math.random() - 0.5) * 440;
        z = (Math.random() - 0.5) * 440;
        distance = Math.sqrt((x * x) + (y * y) + (z * z));
      } while (distance < DISTANT_STAR_MIN_RADIUS);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((_) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.00005;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default GalaxyBackground;
