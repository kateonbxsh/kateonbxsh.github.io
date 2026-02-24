import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group, Object3D, ShaderMaterial, Vector3 } from 'three';
import * as THREE from 'three';
import FireParticles from './FireParticles';
import { useNavigationStore } from '../stores/navigationStore';

const flameVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;

    float wobble = sin((position.y * 15.0) + (uTime * 28.0)) * 0.055 * uIntensity;
    p.x += normal.x * wobble;
    p.z += normal.z * wobble;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const flameFragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    float edge = smoothstep(0.52, 0.06, abs(vUv.x - 0.5));
    float lengthFade = pow(1.0 - vUv.y, 1.35);
    float grain = hash(vUv * 29.0 + vec2(uTime * 2.4, uTime * 1.6));
    float flicker = 0.78 + 0.22 * sin((uTime * 34.0) + (vUv.y * 22.0) + (grain * 6.2831));

    float alpha = edge * lengthFade * flicker * (0.28 + uIntensity * 1.02);

    vec3 hot = vec3(1.0, 0.95, 0.78);
    vec3 core = vec3(1.0, 0.58, 0.2);
    vec3 tail = vec3(0.24, 0.62, 1.0);

    vec3 color = mix(tail, core, smoothstep(0.0, 0.85, 1.0 - vUv.y));
    color = mix(color, hot, smoothstep(0.0, 0.24, abs(vUv.x - 0.5)));
    color *= 0.86 + (uSpeed * 0.03);

    gl_FragColor = vec4(color, alpha);
  }
`;

const Spacecraft: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const flameGroupRef = useRef<Group>(null);
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, '/models/dreamchaser.glb');

  const offset = useMemo(() => new Vector3(-1, -2, -5), []);
  const velocity = useRef(new Vector3());
  const prevCameraPos = useRef(new Vector3());
  const prevCameraLookAt = useRef(new Vector3());
  const enginePower = useRef(0.35);

  const { isTransitioning } = useNavigationStore();

  const flameMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 0.4 },
          uSpeed: { value: 0 },
        },
        vertexShader: flameVertexShader,
        fragmentShader: flameFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    []
  );

  useEffect(() => {
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        obj.material.metalness = 1;
        obj.material.roughness = 0.6;
        obj.material.needsUpdate = true;
      }
    });

    return () => {
      flameMaterial.dispose();
    };
  }, [flameMaterial, gltf]);

  useEffect(() => {
    prevCameraPos.current.copy(camera.position);
    camera.getWorldDirection(prevCameraLookAt.current);
  }, [camera]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetPosition = new Vector3();
    camera.localToWorld(targetPosition.copy(offset));

    velocity.current.subVectors(camera.position, prevCameraPos.current);

    const currentLookDir = new Vector3();
    camera.getWorldDirection(currentLookDir);

    groupRef.current.position.copy(targetPosition);

    const direction =
      velocity.current.length() > 0.01
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
    groupRef.current.quaternion.slerp(tempObj.quaternion, 0.05);

    const speed = velocity.current.length() / Math.max(delta, 1e-3);
    const speedFactor = Math.min(speed / 6, 1);
    const targetPower = isTransitioning ? 1 : 0.35 + speedFactor * 0.25;

    enginePower.current = THREE.MathUtils.damp(enginePower.current, targetPower, 6, delta);

    flameMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    flameMaterial.uniforms.uIntensity.value = THREE.MathUtils.damp(
      flameMaterial.uniforms.uIntensity.value,
      enginePower.current,
      8,
      delta
    );
    flameMaterial.uniforms.uSpeed.value = THREE.MathUtils.damp(
      flameMaterial.uniforms.uSpeed.value,
      speedFactor * 14,
      8,
      delta
    );

    if (flameGroupRef.current) {
      const stretch = 0.9 + enginePower.current * 1.5;
      flameGroupRef.current.scale.set(1, stretch, 1);
    }

    prevCameraPos.current.copy(camera.position);
    prevCameraLookAt.current.copy(currentLookDir);
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={0.1} rotation={[0, Math.PI, 0]} />

      <group ref={flameGroupRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[0, .6, 0]}>
          <coneGeometry args={[0.08, 0.68, 22, 1, true]} />
          <primitive object={flameMaterial} attach="material" />
        </mesh>

        <group position={[0, .28, 0]}>
          <FireParticles intensity={isTransitioning ? 'high' : 'low'} />
        </group>
      </group>
    </group>
  );
};

export default Spacecraft;
