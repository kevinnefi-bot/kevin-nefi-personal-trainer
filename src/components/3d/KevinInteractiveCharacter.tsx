import React, { useRef, useState, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

interface KevinInteractiveCharacterProps {
  currentScene: number;
  isTransitioning?: boolean;
  mousePos: { x: number; y: number };
}

interface SceneConfig {
  pos: [number, number, number];
  scale: number;
  rotY: number;
  textureKey: 'curls' | 'squat' | 'hipthrust' | 'pushup' | 'selfie';
  exerciseName: string;
  repSpeed: number;
  repAmplitude: number;
  repType: 'vertical' | 'squat' | 'pushup' | 'breathing';
}

const SCENE_CONFIGS: Record<number, SceneConfig> = {
  // 0: Meet Kevin - Bicep Curls con mancuernas
  0: {
    pos: [1.68, -0.3, 0],
    scale: 1.05,
    rotY: -0.15,
    textureKey: 'curls',
    exerciseName: 'CURL DE BÍCEPS CON MANCUERNAS',
    repSpeed: 3.2,
    repAmplitude: 0.08,
    repType: 'vertical',
  },
  // 1: Mi Historia - Hip Thrust con barra
  1: {
    pos: [-1.75, -0.26, 0.2],
    scale: 1.08,
    rotY: 0.18,
    textureKey: 'hipthrust',
    exerciseName: 'HIP THRUST CON BARRA OLÍMPICA',
    repSpeed: 2.8,
    repAmplitude: 0.1,
    repType: 'vertical',
  },
  // 2: El Problema - Sentadilla pesada con barra
  2: {
    pos: [1.3, -0.32, 0],
    scale: 1.04,
    rotY: -0.22,
    textureKey: 'squat',
    exerciseName: 'SENTADILLA PROFUNDA CON PESO',
    repSpeed: 2.3,
    repAmplitude: 0.18,
    repType: 'squat',
  },
  // 3: Mi Método - Sentadillas de potencia
  3: {
    pos: [2.1, -0.35, -0.2],
    scale: 1.02,
    rotY: -0.18,
    textureKey: 'squat',
    exerciseName: 'SENTADILLA PESADA DE FUERZA',
    repSpeed: 2.5,
    repAmplitude: 0.16,
    repType: 'squat',
  },
  // 4: Servicios - Flexiones explosivas (Push-ups)
  4: {
    pos: [-1.9, -0.7, -0.2],
    scale: 0.95,
    rotY: 0.25,
    textureKey: 'pushup',
    exerciseName: 'FLEXIONES EXPLOSIVAS DE PECHO',
    repSpeed: 3.8,
    repAmplitude: 0.09,
    repType: 'pushup',
  },
  // 5: MyProgress - Exact Selfie Pose con Smartphone
  5: {
    pos: [-1.45, -0.3, 0.1],
    scale: 1.06,
    rotY: 0.28,
    textureKey: 'selfie',
    exerciseName: 'CONTROL & PROGRESO REAL (BETA)',
    repSpeed: 1.8,
    repAmplitude: 0.04,
    repType: 'breathing',
  },
  // 6: Filosofía - Curls con mancuernas
  6: {
    pos: [-2.15, -0.36, -0.35],
    scale: 0.98,
    rotY: 0.18,
    textureKey: 'curls',
    exerciseName: 'CURL ESTRICTO DE BÍCEPS',
    repSpeed: 3.0,
    repAmplitude: 0.08,
    repType: 'vertical',
  },
  // 7: Planes - Hip Thrust con barra
  7: {
    pos: [0, -0.48, -1.1],
    scale: 0.88,
    rotY: 0,
    textureKey: 'hipthrust',
    exerciseName: 'BLOQUEO DE CADERA CON PESO',
    repSpeed: 2.6,
    repAmplitude: 0.09,
    repType: 'vertical',
  },
  // 8: Final - Selfie Pose mirando al usuario
  8: {
    pos: [0, -0.3, 0.4],
    scale: 1.18,
    rotY: 0,
    textureKey: 'selfie',
    exerciseName: 'TRANSFORMACIÓN COMPLETA (LV. 22)',
    repSpeed: 1.8,
    repAmplitude: 0.04,
    repType: 'breathing',
  },
};

export const KevinInteractiveCharacter: React.FC<KevinInteractiveCharacterProps> = ({
  currentScene,
  isTransitioning = false,
  mousePos,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  // Load all 5 transparent anime exercise textures
  const textures = {
    curls: useTexture('/assets/kevin-curls-transparent.png'),
    squat: useTexture('/assets/kevin-squat-transparent.png'),
    hipthrust: useTexture('/assets/kevin-hipthrust-transparent.png'),
    pushup: useTexture('/assets/kevin-pushup-transparent.png'),
    selfie: useTexture('/assets/kevin-selfie-transparent.png'),
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userRotationY, setUserRotationY] = useState(0);
  const [interactionPulse, setInteractionPulse] = useState(0);
  const [repCount, setRepCount] = useState(1);
  const lastPointerX = useRef(0);
  const lastRepCycle = useRef(0);

  const config = SCENE_CONFIGS[currentScene] ?? SCENE_CONFIGS[0];
  const activeTexture = textures[config.textureKey];

  // Aspect ratio adjustments per pose
  const meshDimensions = useMemo(() => {
    if (config.textureKey === 'pushup') {
      // Pushups are horizontal
      return [3.8, 2.14] as [number, number];
    }
    // Vertical poses: 9:16 ratio
    return [2.36, 4.2] as [number, number];
  }, [config.textureKey]);

  // Pointer drag event handlers for direct 3D interactivity
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    lastPointerX.current = e.clientX;
    setInteractionPulse(1.0);
    setRepCount((prev) => (prev % 15) + 1);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    setUserRotationY((prev) => prev + deltaX * 0.012);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Constant Continuous Weight Lifting Repetition Engine
    const repPhase = (t * config.repSpeed) % (Math.PI * 2);
    const repProgress = Math.sin(repPhase);

    // Track completed repetitions
    const currentCycle = Math.floor((t * config.repSpeed) / (Math.PI * 2));
    if (currentCycle !== lastRepCycle.current) {
      lastRepCycle.current = currentCycle;
      setRepCount((prev) => (prev % 12) + 1);
    }

    let repOffsetY = 0;
    let repRotZ = 0;
    let repScaleY = 1.0;

    if (config.repType === 'squat') {
      // Sentadilla: cuerpo baja con control y sube con explosión
      const squatVal = (Math.cos(repPhase) + 1) * 0.5; // 0 to 1
      repOffsetY = -squatVal * config.repAmplitude * 1.8;
      repScaleY = 1.0 - squatVal * 0.03;
    } else if (config.repType === 'pushup') {
      // Flexiones: movimiento de pecho y tronco rítmico
      repOffsetY = Math.sin(repPhase) * config.repAmplitude;
      repRotZ = Math.cos(repPhase) * 0.04;
    } else if (config.repType === 'vertical') {
      // Curl / Press: tensión muscular con bombeo
      repOffsetY = Math.sin(repPhase) * config.repAmplitude;
    } else {
      // Breathing / Selfie: respiración idle
      repOffsetY = Math.sin(t * 1.8) * config.repAmplitude;
    }

    // Walking stride bobbing when actively transitioning across scenes
    const walkingBob = isTransitioning ? Math.sin(t * 9.5) * 0.065 : 0;

    // Decay user manual rotation back to scene default gradually when not dragging
    if (!isDragging && Math.abs(userRotationY) > 0.001) {
      setUserRotationY((prev) => THREE.MathUtils.damp(prev, 0, 1.8, delta));
    }

    // Decay interaction pulse
    if (interactionPulse > 0.01) {
      setInteractionPulse((prev) => THREE.MathUtils.damp(prev, 0, 3.0, delta));
    }

    // Smooth position interpolation towards target scene coordinates + active repetition offset
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      config.pos[0],
      3.2,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      config.pos[1] + repOffsetY + walkingBob,
      4.0,
      delta
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      config.pos[2],
      3.2,
      delta
    );

    // Smooth scale interpolation (with slight expansion on hover)
    const hoverScaleMultiplier = isHovered ? 1.04 : 1.0;
    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(
      curScale,
      config.scale * hoverScaleMultiplier,
      3.2,
      delta
    );
    groupRef.current.scale.set(nextScale, nextScale * repScaleY, nextScale);

    // Dynamic rotation: base scene rotation + user drag rotation + mouse parallax
    const mouseRotY = mousePos.x * 0.15;
    const mouseRotX = -mousePos.y * 0.08;
    const desiredRotY = config.rotY + userRotationY + mouseRotY;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      desiredRotY,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      mouseRotX,
      3.5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      repRotZ,
      3.5,
      delta
    );

    // Pulse aura animation
    if (auraRef.current) {
      const auraOpacity = 0.14 + (isHovered ? 0.14 : 0) + interactionPulse * 0.35;
      (auraRef.current.material as THREE.MeshBasicMaterial).opacity = auraOpacity;
    }

    // Contact ground shadow dynamic squash with rep position
    if (shadowRef.current) {
      const shadowScale = 1.0 + Math.abs(repOffsetY) * 2.0;
      shadowRef.current.scale.set(shadowScale, shadowScale, 1.0);
    }
  });

  return (
    <group
      ref={groupRef}
      position={config.pos}
      scale={config.scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Volumetric Electric Blue Power Aura Behind Character */}
      <mesh ref={auraRef} position={[0, 0, -0.15]}>
        <planeGeometry args={[meshDimensions[0] * 1.15, meshDimensions[1] * 1.08]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Volumetric Violet Glow Accent */}
      <mesh position={[0.2, 0.1, -0.1]}>
        <planeGeometry args={[meshDimensions[0] * 1.05, meshDimensions[1] * 1.02]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Contact Ground Shadow */}
      <mesh
        ref={shadowRef}
        position={[0, config.textureKey === 'pushup' ? -0.9 : -2.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1.05, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      {/* Transparent Anime Video Game Character Mesh */}
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={meshDimensions} />
        <meshStandardMaterial
          map={activeTexture}
          roughness={0.25}
          metalness={0.15}
          transparent={true}
          alphaTest={0.02}
        />
      </mesh>

      {/* Interactive Electric Cyan Rim Edge */}
      <mesh position={[-meshDimensions[0] / 2, 0, 0.02]} rotation={[0, 0.4, 0]}>
        <planeGeometry args={[0.07, meshDimensions[1] * 0.96]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={isHovered ? 0.9 : 0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Interactive Violet Rim Edge */}
      <mesh position={[meshDimensions[0] / 2, 0, 0.02]} rotation={[0, -0.4, 0]}>
        <planeGeometry args={[0.07, meshDimensions[1] * 0.96]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={isHovered ? 0.9 : 0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Anime Video Game RPG Stats Badge in 3D */}
      <Html
        position={[0, meshDimensions[1] / 2 + 0.35, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          <div className="glass-panel px-3.5 py-1.5 rounded-full border border-[#00d2ff]/40 shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-[#00d2ff] font-mono whitespace-nowrap uppercase">
              LV. 22 · {config.exerciseName}
            </span>
            <span className="text-[10px] font-bold text-white/80 font-mono bg-white/10 px-2 py-0.5 rounded-md">
              REP {repCount}/12
            </span>
          </div>
          <div className="text-[9px] text-white/40 tracking-widest uppercase font-mono mt-1">
            {isHovered ? '⚡ ARRASTRA PARA GIRAR 360°' : 'MEJOR QUE AYER'}
          </div>
        </div>
      </Html>
    </group>
  );
};
