import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface WarpStreaksProps {
  active: boolean;
}

const STREAK_COUNT = 120;
const STREAK_DEPTH = 320;

const WarpStreaks: React.FC<WarpStreaksProps> = ({ active }) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const attributeRef = useRef<THREE.BufferAttribute>(null);
  const strength = useRef(0);

  const data = useMemo(() => {
    const x = new Float32Array(STREAK_COUNT);
    const y = new Float32Array(STREAK_COUNT);
    const z = new Float32Array(STREAK_COUNT);
    const speed = new Float32Array(STREAK_COUNT);
    const positions = new Float32Array(STREAK_COUNT * 6);

    for (let i = 0; i < STREAK_COUNT; i++) {
      x[i] = (Math.random() - 0.5) * 150;
      y[i] = (Math.random() - 0.5) * 90;
      z[i] = -Math.random() * STREAK_DEPTH;
      speed[i] = 0.6 + Math.random() * 1.2;
    }

    return { x, y, z, speed, positions };
  }, []);

  useFrame(({ camera }, delta) => {
    const lines = linesRef.current;
    const mat = materialRef.current;
    const attr = attributeRef.current;
    if (!lines || !mat || !attr) return;

    strength.current = THREE.MathUtils.damp(strength.current, active ? 1 : 0, 3.8, delta);
    if (strength.current < 0.04) {
      lines.visible = false;
      mat.opacity = 0;
      return;
    }

    lines.visible = true;
    lines.position.copy(camera.position);
    lines.quaternion.copy(camera.quaternion);

    const travelSpeed = 16 + strength.current * 120;
    const streakLength = 1 + strength.current * 12;

    for (let i = 0; i < STREAK_COUNT; i++) {
      data.z[i] += data.speed[i] * travelSpeed * delta;

      if (data.z[i] > 6) {
        data.z[i] = -STREAK_DEPTH - Math.random() * 40;
        data.x[i] = (Math.random() - 0.5) * 150;
        data.y[i] = (Math.random() - 0.5) * 90;
      }

      const i6 = i * 6;
      data.positions[i6] = data.x[i];
      data.positions[i6 + 1] = data.y[i];
      data.positions[i6 + 2] = data.z[i];
      data.positions[i6 + 3] = data.x[i];
      data.positions[i6 + 4] = data.y[i];
      data.positions[i6 + 5] = data.z[i] - streakLength;
    }

    mat.opacity = THREE.MathUtils.damp(mat.opacity, strength.current * 0.28, 4, delta);
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          ref={attributeRef}
          attach="attributes-position"
          args={[data.positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color="#a5d9ff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

export default WarpStreaks;
