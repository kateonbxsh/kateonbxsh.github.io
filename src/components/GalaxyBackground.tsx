// src/components/GalaxyBackground.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HOME_ORBIT_RADIUS = 90;
const DISTANT_STAR_MIN_RADIUS = HOME_ORBIT_RADIUS * 1.5;
const STAR_LAYER_CONFIG = [
  { count: 2800, baseSize: 0.09, sizeVariation: 0.06, opacity: 0.85 },
  { count: 1600, baseSize: 0.4, sizeVariation: 0.08, opacity: 0.9 },
  { count: 600, baseSize: 0.8, sizeVariation: 0.1, opacity: 0.95 },
];

const randomDistantPosition = () => {
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

  return { x, y, z };
};

const GalaxyBackground: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const starLayers = useMemo(() => {
    return STAR_LAYER_CONFIG.map((layer) => {
      const positions = new Float32Array(layer.count * 3);
      const colors = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;
        const { x, y, z } = randomDistantPosition();
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // Vary size per star
        sizes[i] = layer.baseSize + (Math.random() - 0.5) * layer.sizeVariation;

        // Color gradient from white to light blue
        const tint = Math.random();
        colors[i3] = THREE.MathUtils.lerp(1.0, 0.5, tint);      // Red: more contrast
        colors[i3 + 1] = THREE.MathUtils.lerp(1.0, 0.5, tint); // Green: more contrast
        colors[i3 + 2] = 1.0;                                         // Blue: always full
      }

      return {
        ...layer,
        positions,
        colors,
        sizes,
      };
    });
  }, []);

  useFrame((_) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00005;
    }
  });

  return (
    <group ref={groupRef}>
      {starLayers.map((layer, idx) => (
        <Points
          key={`star-layer-${idx}`}
          positions={layer.positions}
          colors={layer.colors}
          stride={3}
          frustumCulled={false}
        >
          <PointMaterial
            transparent
            vertexColors
            size={layer.baseSize}
            opacity={layer.opacity}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      ))}
    </group>
  );
};

export default GalaxyBackground;