// src/components/Stars.tsx
import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, Color, TextureLoader } from 'three';
import { StarData, starsData } from '../data/starsData';
import { useNavigationStore } from '../stores/navigationStore';
import { Html } from '@react-three/drei';
import { useLanguageStore } from '../stores/languageStore';

const Star: React.FC<StarData> = ({ id, position, texture, title, color }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { currentLanguage } = useLanguageStore();
  const { setView, isTransitioning, currentView, selectedStarId } = useNavigationStore();

  const tex = useLoader(TextureLoader, texture);

  const isSelected = currentView === 'star' && selectedStarId === id;

  useFrame((state) => {
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
      <mesh scale={1.05}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={hovered ? 0.2 : 0.08}
            depthWrite={false}
        />
      </mesh>
      <pointLight color={color} intensity={hovered && !isSelected ? 2 : 1} distance={15} decay={1} />
      <Html 
      pointerEvents='auto'
      position={[-1, 6, 0]} 
      >
        <div onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
            onClick={handleClick} style={{
            background: 'rgba(0,0,0,0.8)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
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
          {...star}
        />
      ))}
    </>
  );
};

export default Stars;