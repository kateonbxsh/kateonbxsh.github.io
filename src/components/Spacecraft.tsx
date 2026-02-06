import React, { useRef, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { Group, Vector3, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import FireParticles from './FireParticles';
import { useNavigationStore } from '../stores/navigationStore';

const Spacecraft: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, '/models/dreamchaser.glb');
  
  const offset = new Vector3(-1, -2, -5);
  const velocity = useRef(new Vector3());
  const prevCameraPos = useRef(new Vector3());
  const prevCameraLookAt = useRef(new Vector3());
  
  const { isTransitioning } = useNavigationStore();

  useEffect(() => {
    prevCameraPos.current.copy(camera.position);
    camera.getWorldDirection(prevCameraLookAt.current);
  }, [camera]);

  useFrame(() => {
    if (groupRef.current) {
      const targetPosition = new Vector3();
      camera.localToWorld(targetPosition.copy(offset));
      
      velocity.current.subVectors(camera.position, prevCameraPos.current);
      
      const currentLookDir = new Vector3();
      camera.getWorldDirection(currentLookDir);
      
      groupRef.current.position.copy(targetPosition);
      
      const direction = velocity.current.length() > 0.001 
            ? velocity.current.clone().normalize()
            : currentLookDir.clone();
            
        const lookAtPos = new Vector3(
            groupRef.current.position.x + direction.x,
            groupRef.current.position.y + direction.y,
            groupRef.current.position.z + direction.z
        );
        
        const tempObj = new Object3D();
        tempObj.position.copy(groupRef.current.position);
        tempObj.lookAt(lookAtPos);
        const targetQuaternion = tempObj.quaternion;
        
        groupRef.current.quaternion.slerp(targetQuaternion, 0.05);
      
      prevCameraPos.current.copy(camera.position);
      prevCameraLookAt.current.copy(currentLookDir);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={0.1} rotation={[0, Math.PI, 0]} />
      <FireParticles intensity={isTransitioning ? 'high' : 'low'} />
    </group>
  );
};
export default Spacecraft;