// src/components/SpaceScene.tsx
import { Environment } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CubeTextureLoader, Vector3 } from 'three';
import { starsData } from '../data/starsData';
import { useNavigationStore } from '../stores/navigationStore';
import GalaxyBackground from './GalaxyBackground';
import Spacecraft from './Spacecraft';
import Stars from './Stars';
import WarpEffects from './WarpEffects';

// Update these paths to match your six skybox textures.
// Order must be: +X, -X, +Y, -Y, +Z, -Z
const SKYBOX_FACES = [
  '/textures/skybox/px.webp',
  '/textures/skybox/nx.webp',
  '/textures/skybox/py.webp',
  '/textures/skybox/ny.webp',
  '/textures/skybox/pz.webp',
  '/textures/skybox/nz.webp',
];

const chooseLeftTangentJoin = (start: Vector3, center: Vector3, radius: number) => {
  const relX = start.x - center.x;
  const relZ = start.z - center.z;
  const dist = Math.hypot(relX, relZ);

  const baseAngle = Math.atan2(relZ, relX);
  const candidateAngles =
    dist > radius + 1e-4
      ? (() => {
          const offset = Math.acos(THREE.MathUtils.clamp(radius / dist, -1, 1));
          return [baseAngle + offset, baseAngle - offset];
        })()
      : [baseAngle + Math.PI / 2, baseAngle - Math.PI / 2];

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

const RETURN_PHASE_NONE = -1;
const RETURN_PHASE_SPIRAL = 0;
const RETURN_PHASE_HOME_TRANSFER = 1;
const PLANET_ORBIT_RADIUS = 0.8;
const BASE_ORBIT_ANGULAR_SPEED = 0.3;
const MAX_RETURN_ORBIT_ANGULAR_SPEED = 0.9;
const PLANET_LOOK_TANGENT_BLEND = 0.45;
const RETURN_RADIUS_GROWTH_MIN = 0.1; // very slow initial growth (units/sec)
const RETURN_RADIUS_GROWTH_MAX = 0.8;   // faster growth after ramp-up (units/sec)
const RETURN_RADIUS_GROWTH_RAMP_TIME = 6.5; // seconds
const MAX_RETURN_SPIRAL_RADIUS = 3.6;
const RETURN_HOME_ALIGNMENT_DOT_THRESHOLD = 0.5;
const RETURN_HOME_TRANSFER_SMOOTH_MIN = 0.1;
const RETURN_HOME_TRANSFER_SMOOTH_MAX = 1.2;
const RETURN_HOME_TRANSFER_SMOOTH_RAMP_TIME = 1.2;

const getOrbitLookTarget = (
  orbitPos: Vector3,
  center: Vector3,
  tangentAngle: number
) => {
  const toPlanet = center.clone().sub(orbitPos);
  if (toPlanet.lengthSq() < 1e-6) return center.clone();
  toPlanet.normalize();

  const tangentDir = new Vector3(Math.cos(tangentAngle), 0, Math.sin(tangentAngle));
  const lookDir = tangentDir
    .multiplyScalar(1 - PLANET_LOOK_TANGENT_BLEND)
    .add(toPlanet.multiplyScalar(PLANET_LOOK_TANGENT_BLEND))
    .normalize();

  const lookDistance = Math.max(2.5, orbitPos.distanceTo(center) * 3.5);
  return orbitPos.clone().add(lookDir.multiplyScalar(lookDistance));
};

const SpaceScene: React.FC = () => {
  const { camera, scene } = useThree();
  const { currentView, selectedStarId, setTransitioning } = useNavigationStore();
  
  const targetPosition = useRef(new Vector3(0, 0, 50));
  const targetLookAt = useRef(new Vector3(0, 0, 0));
  const orbitAngle = useRef(0);
  const orbitRadius = useRef(3);
  const isOrbiting = useRef(false);
  const isReturning = useRef(true);
  const hasReachedOrbit = useRef(false);
  const returnPhase = useRef<number>(RETURN_PHASE_NONE);
  const homeOrbitAngle = useRef(0);
  const homeOrbitRadius = 90;
  const orbitDirection = useRef<1 | -1>(1);
  const isHomeOrbiting = useRef(false);
  const activeOrbitCenter = useRef<Vector3 | null>(null);
  const returnOrbitAngularSpeed = useRef(BASE_ORBIT_ANGULAR_SPEED);
  const returnSpiralElapsed = useRef(0);
  const returnHomeTransferElapsed = useRef(0);
  const spacecraftForward = useRef(new Vector3(0, 0, -1));
  const [skyboxTexture] = useLoader(CubeTextureLoader, [SKYBOX_FACES]);

  const handleSpacecraftForwardUpdate = useCallback((forward: Vector3) => {
    spacecraftForward.current.copy(forward);
  }, []);

  skyboxTexture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    scene.background = skyboxTexture;
    (scene as any).backgroundIntensity = 0.5;

    return () => {
      (scene as any).backgroundIntensity = 1;
    };
  }, [scene, skyboxTexture]);

  const startHomeTransfer = () => {
    returnPhase.current = RETURN_PHASE_HOME_TRANSFER;
    returnSpiralElapsed.current = 0;
    returnHomeTransferElapsed.current = 0;
    const currentAngle = Math.atan2(camera.position.x, camera.position.z);
    homeOrbitAngle.current = currentAngle;

    const orbitX = Math.sin(homeOrbitAngle.current) * homeOrbitRadius;
    const orbitZ = Math.cos(homeOrbitAngle.current) * homeOrbitRadius;
    targetPosition.current.set(orbitX, 0, orbitZ);
    targetLookAt.current.set(0, 0, 0);
  };

  useEffect(() => {
    if (currentView === 'home') {
      isOrbiting.current = false;
      isReturning.current = true;
      hasReachedOrbit.current = false;
      setTransitioning(true);

      if (activeOrbitCenter.current) {
        const center = activeOrbitCenter.current;
        returnPhase.current = RETURN_PHASE_SPIRAL;
        returnOrbitAngularSpeed.current = BASE_ORBIT_ANGULAR_SPEED;
        returnSpiralElapsed.current = 0;
        returnHomeTransferElapsed.current = 0;

        const orbitX = center.x + Math.cos(orbitAngle.current) * orbitRadius.current;
        const orbitZ = center.z + Math.sin(orbitAngle.current) * orbitRadius.current;
        targetPosition.current.set(orbitX, center.y, orbitZ);

        targetLookAt.current.set(center.x, center.y, center.z);
      } else {
        startHomeTransfer();
      }
    } else if (currentView === 'start') {
      // Ensure initial browse mode is interactive (clickable planets).
      isOrbiting.current = false;
      isReturning.current = false;
      isHomeOrbiting.current = true;
      hasReachedOrbit.current = false;
      activeOrbitCenter.current = null;
      returnPhase.current = RETURN_PHASE_NONE;
      setTransitioning(false);
    } else if (currentView === 'star' && selectedStarId) {
      const star = starsData.find((s) => s.id === selectedStarId);
      if (star) {
        const [x, y, z] = star.position;
        activeOrbitCenter.current = new Vector3(x, y, z);
        isReturning.current = false;
        isOrbiting.current = false;
        isHomeOrbiting.current = false;
        hasReachedOrbit.current = false;
        returnPhase.current = RETURN_PHASE_NONE;
        returnOrbitAngularSpeed.current = BASE_ORBIT_ANGULAR_SPEED;
        returnSpiralElapsed.current = 0;
        returnHomeTransferElapsed.current = 0;
        orbitRadius.current = PLANET_ORBIT_RADIUS;

        const tangentJoin = chooseLeftTangentJoin(camera.position, new Vector3(x, y, z), orbitRadius.current);

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
        targetLookAt.current.copy(
          getOrbitLookTarget(targetPosition.current, new Vector3(x, y, z), tangentAngle)
        );
        
        setTransitioning(true);
      }
    }
  }, [currentView, selectedStarId, setTransitioning, camera]);

  useFrame((_, delta) => {
    let positionSmoothing = 1.25 * delta;
    let lookSmoothing = 0.65 * delta;

    if (isReturning.current) {
      if (returnPhase.current === RETURN_PHASE_SPIRAL) {
        positionSmoothing = 5 * delta;
      } else if (returnPhase.current === RETURN_PHASE_HOME_TRANSFER) {
        returnHomeTransferElapsed.current += delta;
        const t = THREE.MathUtils.clamp(
          returnHomeTransferElapsed.current / RETURN_HOME_TRANSFER_SMOOTH_RAMP_TIME,
          0,
          1
        );
        const eased = t * t * (3 - 2 * t);
        const smoothValue = THREE.MathUtils.lerp(
          RETURN_HOME_TRANSFER_SMOOTH_MIN,
          RETURN_HOME_TRANSFER_SMOOTH_MAX,
          eased
        );
        positionSmoothing = smoothValue * delta;
      } else {
        positionSmoothing = RETURN_HOME_TRANSFER_SMOOTH_MAX * delta;
      }
    }

    // Keep entry motion from decaying too much before orbit capture.
    if (currentView === 'star' && !isOrbiting.current && !isReturning.current) {
      positionSmoothing = 1.1 * delta;
    }

    const isReturnSpiralOrbit =
      isReturning.current && returnPhase.current === RETURN_PHASE_SPIRAL && !!activeOrbitCenter.current;
    const isPlanetOrbit =
      isOrbiting.current && !isReturning.current && !!activeOrbitCenter.current;

    if ((isReturnSpiralOrbit || isPlanetOrbit) && activeOrbitCenter.current) {
      const center = activeOrbitCenter.current;
      if (isReturnSpiralOrbit) {
        returnSpiralElapsed.current += delta;
        const rampT = THREE.MathUtils.clamp(
          returnSpiralElapsed.current / RETURN_RADIUS_GROWTH_RAMP_TIME,
          0,
          1
        );
        const growthPerSecond = THREE.MathUtils.lerp(
          RETURN_RADIUS_GROWTH_MIN,
          RETURN_RADIUS_GROWTH_MAX,
          rampT * rampT
        );
        orbitRadius.current = Math.min(
          orbitRadius.current + growthPerSecond * delta,
          MAX_RETURN_SPIRAL_RADIUS
        );

        returnOrbitAngularSpeed.current = THREE.MathUtils.damp(
          returnOrbitAngularSpeed.current,
          MAX_RETURN_ORBIT_ANGULAR_SPEED,
          1.8,
          delta
        );
      } else {
        returnOrbitAngularSpeed.current = BASE_ORBIT_ANGULAR_SPEED;
      }

      orbitAngle.current += delta * returnOrbitAngularSpeed.current * orbitDirection.current;

      const orbitX = center.x + Math.cos(orbitAngle.current) * orbitRadius.current;
      const orbitZ = center.z + Math.sin(orbitAngle.current) * orbitRadius.current;
      const orbitY = center.y;
      targetPosition.current.set(orbitX, orbitY, orbitZ);

      const tangentAngle = orbitAngle.current + (Math.PI / 2) * orbitDirection.current;
      targetLookAt.current.copy(getOrbitLookTarget(targetPosition.current, center, tangentAngle));

      if (isReturnSpiralOrbit) {
        const toHomeDir = targetPosition.current.clone().multiplyScalar(-1);
        const craftLookDir = spacecraftForward.current.clone();
        let readyToLeaveOrbit = false;

        const toHomeLenXZ = Math.hypot(toHomeDir.x, toHomeDir.z);
        const craftLenXZ = Math.hypot(craftLookDir.x, craftLookDir.z);

        if (toHomeLenXZ > 1e-6 && craftLenXZ > 1e-6) {
          const lookHomeDot =
            (craftLookDir.x * toHomeDir.x + craftLookDir.z * toHomeDir.z) /
            (craftLenXZ * toHomeLenXZ);
          readyToLeaveOrbit =
            lookHomeDot >= RETURN_HOME_ALIGNMENT_DOT_THRESHOLD &&
            orbitRadius.current > PLANET_ORBIT_RADIUS + 0.08;
        }

        if (readyToLeaveOrbit) {
          activeOrbitCenter.current = null;
          startHomeTransfer();
        }
      }
    }

    // Safety: keep home/start interactive once return flow is finished.
    if ((currentView === 'home' || currentView === 'start') && !isReturning.current && !isOrbiting.current) {
      setTransitioning(false);
    }
    
    // Home orbit - slow rotation around center
    if ((currentView === 'home' && isHomeOrbiting.current && !isReturning.current) || currentView === 'start') {
      homeOrbitAngle.current += delta * 0.05;
      const orbitX = Math.sin(homeOrbitAngle.current) * homeOrbitRadius;
      const orbitZ = Math.cos(homeOrbitAngle.current) * homeOrbitRadius;
      
      targetPosition.current.set(orbitX, 0, orbitZ);
      targetLookAt.current.set(0, 0, 0);
    }
    
    camera.position.lerp(targetPosition.current, positionSmoothing);
    
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.add(camera.position);
    currentLookAt.lerp(targetLookAt.current, lookSmoothing);
    camera.lookAt(currentLookAt);

    const distance = camera.position.distanceTo(targetPosition.current);
    
    // Capture earlier so transfer does not visually "brake" before orbiting.
    const starOrbitCaptureDistance = Math.max(0.45, orbitRadius.current * 0.65);

    if (!isOrbiting.current && !isReturning.current && distance < starOrbitCaptureDistance && !hasReachedOrbit.current && currentView === 'star') {
      hasReachedOrbit.current = true;
      isOrbiting.current = true;
      setTransitioning(false);
    } else if (isReturning.current && returnPhase.current === RETURN_PHASE_HOME_TRANSFER && distance < 5) {
      isReturning.current = false;
      isHomeOrbiting.current = true;
      activeOrbitCenter.current = null;
      returnPhase.current = RETURN_PHASE_NONE;
      returnHomeTransferElapsed.current = 0;
      setTransitioning(false);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[10, 5, 10]}
        intensity={3}
        castShadow
      />
      <Environment preset="sunset" />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <GalaxyBackground />
      <Stars />
      <Spacecraft onForwardUpdate={handleSpacecraftForwardUpdate} />
      <WarpEffects />
    </>
  );
};

export default SpaceScene;
