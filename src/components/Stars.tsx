// src/components/Stars.tsx
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Mesh, TextureLoader } from 'three';
import { StarData, starsData } from '../data/starsData';
import { useLanguageStore } from '../stores/languageStore';
import { useNavigationStore } from '../stores/navigationStore';

const Star: React.FC<StarData> = ({ id, position, texture, title, color }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { currentLanguage } = useLanguageStore();
  const { setView, isTransitioning, currentView, selectedStarId } = useNavigationStore();

  const tex = useLoader(TextureLoader, texture);

  const isSelected = currentView === 'star' && selectedStarId === id;

  useFrame((_) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      const scale = hovered && !isSelected ? 1.3 : 1;
      meshRef.current.scale.lerp({ x: scale, y: scale, z: scale } as any, 0.1);
    }
  });

  

  const handleClick = () => {
    if (!isTransitioning) {
      setView('star', id);
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
            map={tex}
            emissiveIntensity={hovered && !isSelected ? 0.6 : 0.1}
            color={color}
            emissive={color}
            metalness={-10}
            roughness={-20}
            toneMapped={false}
        />
      </mesh>
      <pointLight color={color} intensity={hovered && !isSelected ? 2 : 1} distance={15} decay={1} />
      <Html 
      pointerEvents='auto'
      position={[0, 6, 0]} 
      >
        <div onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
            onClick={handleClick} style={{
            background: 'rgba(49, 49, 49, 0.3)',
            padding: '8px 24px',
            whiteSpace: 'nowrap',
            opacity: isSelected ? 0 : 1,
            transition: 'opacity 0.5s ease',
            cursor: 'pointer',
            pointerEvents: isSelected ? 'none' : 'auto'
            
        }}>
            {title[currentLanguage]}
        </div>
    </Html>
    </group>
  );
};

const Stars: React.FC = () => {
  return (
    <>
      {starsData.map((star) => (
        <Star
          key={star.id}
          {...star}
        />
      ))}
    </>
  );
};

export default Stars;