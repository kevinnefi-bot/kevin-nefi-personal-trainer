import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GymParticleField } from './GymParticleField';
import { WeightPlate3D } from './WeightPlate3D';
import { Dumbbell3D } from './Dumbbell3D';
import { Barbell3D } from './Barbell3D';
import { NutritionTable3D } from './NutritionTable3D';
import { PhoneMockup3D } from './PhoneMockup3D';
import { useTexture } from '@react-three/drei';

interface PresentationWorld3DProps {
  currentScene: number; // 0 to 8
  isTransitioning?: boolean;
}

interface KevinSceneTransform {
  position: [number, number, number];
  scale: number;
  rotationY: number;
  isMuscular: boolean;
}

// Scene target setups for Kevin
const KEVIN_SCENE_TRANSFORMS: Record<number, KevinSceneTransform> = {
  // 0: Meet Kevin - Heroic right side
  0: { position: [1.72, -0.28, 0], scale: 1.05, rotationY: -0.14, isMuscular: true },
  // 1: My Story - Lean start ("Tengo 22 años y llevo alrededor de 2 años entrenando...")
  1: { position: [-1.75, -0.25, 0.2], scale: 1.08, rotationY: 0.16, isMuscular: false },
  // 2: The Problem - Training transition ("¿No sabes por dónde empezar?")
  2: { position: [1.35, -0.32, 0], scale: 1.02, rotationY: -0.2, isMuscular: false },
  // 3: My Method - Transformed aesthetic peak ("Así trabajamos - No tiene por qué ser complicado")
  3: { position: [2.15, -0.35, -0.2], scale: 1.0, rotationY: -0.18, isMuscular: true },
  // 4: Services - Left side framing the training options
  4: { position: [-2.1, -0.35, -0.25], scale: 0.98, rotationY: 0.22, isMuscular: true },
  // 5: MyProgress - Standing beside the glowing 3D phone
  5: { position: [-1.45, -0.3, 0.1], scale: 1.04, rotationY: 0.28, isMuscular: true },
  // 6: Values - Left side with atmospheric violet rim light
  6: { position: [-2.2, -0.36, -0.35], scale: 0.95, rotationY: 0.18, isMuscular: true },
  // 7: Plans - Background center observing plate pedestals
  7: { position: [0, -0.48, -1.1], scale: 0.84, rotationY: 0, isMuscular: true },
  // 8: Final - Center-stage, prominent, welcoming the user
  8: { position: [0, -0.32, 0.4], scale: 1.16, rotationY: 0, isMuscular: true },
};

// 2026 Cinematic Camera Rig with handheld organic float, dolly, orbit and mouse parallax
function CinematicCameraRig({
  currentScene,
  mousePos,
  isTransitioning,
}: {
  currentScene: number;
  mousePos: { x: number; y: number };
  isTransitioning?: boolean;
}) {
  const { camera } = useThree();

  const sceneCameraTarget = useMemo(() => {
    switch (currentScene) {
      case 0: return { x: 0.15, y: 0.0, z: 5.7, fov: 45 };
      case 1: return { x: -0.25, y: 0.05, z: 5.5, fov: 46 };
      case 2: return { x: 0.2, y: -0.05, z: 5.8, fov: 47 };
      case 3: return { x: 0.35, y: 0.0, z: 5.6, fov: 45 };
      case 4: return { x: -0.35, y: 0.0, z: 5.6, fov: 46 };
      // Scene 5: MyProgress - Push-in dive towards the smartphone
      case 5: return { x: 0.3, y: 0.05, z: 5.0, fov: 43 };
      case 6: return { x: -0.25, y: 0.0, z: 5.7, fov: 45 };
      case 7: return { x: 0.0, y: -0.1, z: 5.9, fov: 48 };
      // Scene 8: Final - Intimate close-up dolly
      case 8: return { x: 0.0, y: 0.05, z: 5.3, fov: 44 };
      default: return { x: 0.0, y: 0.0, z: 5.7, fov: 45 };
    }
  }, [currentScene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle handheld camera float (organic cinematic feel)
    const handheldX = Math.sin(t * 0.7) * 0.035;
    const handheldY = Math.cos(t * 0.9) * 0.025;

    // Mouse parallax
    const parallaxX = mousePos.x * 0.25;
    const parallaxY = mousePos.y * 0.18;

    // Transition dynamic pulse
    const transitionPush = isTransitioning ? -0.15 : 0;

    const targetX = sceneCameraTarget.x + parallaxX + handheldX;
    const targetY = sceneCameraTarget.y + parallaxY + handheldY;
    const targetZ = sceneCameraTarget.z + transitionPush;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.0, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.0, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.0, delta);

    // LookAt follows slightly towards center with mouse damping
    const lookTargetX = THREE.MathUtils.damp(0, sceneCameraTarget.x * 0.4 + parallaxX * 0.3, 2.5, delta);
    camera.lookAt(lookTargetX, 0, 0);
  });

  return null;
}

// Dynamic Kevin character utilizing the exact user uploaded image with aspect ratio 9:16 (2.36 x 4.2)
function DynamicKevinCharacter({
  currentScene,
  isTransitioning,
  mousePos,
}: {
  currentScene: number;
  isTransitioning?: boolean;
  mousePos: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Exact user image as main muscular representation
  const muscularTexture = useTexture('/assets/kevin-character-exact.png');
  // Slim starting image for early transformation scenes
  const slimTexture = useTexture('/assets/kevin-slim.jpg');

  const target = KEVIN_SCENE_TRANSFORMS[currentScene] ?? KEVIN_SCENE_TRANSFORMS[0];
  const activeTexture = target.isMuscular ? muscularTexture : slimTexture;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Natural breathing / idle motion
    const breathingOffset = Math.sin(t * 1.6) * 0.035;

    // Walking stride bobbing when actively transitioning or moving
    const walkingBob = isTransitioning ? Math.sin(t * 9.5) * 0.065 : 0;

    // Smoothly interpolate position towards target scene coordinates
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      target.position[0],
      3.0,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      target.position[1] + breathingOffset + walkingBob,
      3.0,
      delta
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      target.position[2],
      3.0,
      delta
    );

    // Smooth scale interpolation
    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(curScale, target.scale, 3.0, delta);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Rotation interpolation: base scene angle + mouse parallax
    const mouseRotY = mousePos.x * 0.12;
    const mouseRotX = -mousePos.y * 0.06;
    const desiredRotY = target.rotationY + mouseRotY;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, desiredRotY, 3.5, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, mouseRotX, 3.5, delta);
  });

  return (
    <group ref={groupRef} position={target.position} scale={target.scale}>
      {/* Volumetric Electric Blue Glow Backdrop */}
      <mesh position={[0, 0, -0.22]}>
        <planeGeometry args={[2.8, 4.6]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Volumetric Violet Glow Accent */}
      <mesh position={[0.25, 0.2, -0.16]}>
        <planeGeometry args={[2.5, 4.2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Character Plane with exact 9:16 aspect ratio (576 x 1024 -> 2.3625 x 4.2) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[2.36, 4.2]} />
        <meshStandardMaterial
          map={activeTexture}
          roughness={0.35}
          metalness={0.15}
          transparent={true}
        />
      </mesh>

      {/* Left Electric Blue Rim Light Aura */}
      <mesh position={[-1.18, 0, 0.02]} rotation={[0, 0.35, 0]}>
        <planeGeometry args={[0.08, 4.1]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Right Violet Rim Light Aura */}
      <mesh position={[1.18, 0, 0.02]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.08, 4.1]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Dynamic 3D Equipment that populates the continuous world
function DynamicWorldEquipment({ currentScene }: { currentScene: number }) {
  return (
    <group>
      {/* Scene 0 (Hero): Floating Dumbbell & Olympic Plate */}
      {currentScene === 0 && (
        <>
          <WeightPlate3D
            position={[-2.7, 1.3, -0.5]}
            rotation={[0.7, 0.4, 0.2]}
            scale={0.75}
            spinSpeed={0.2}
            accentColor="#00d2ff"
          />
          <Dumbbell3D
            position={[-2.3, -1.3, 0]}
            rotation={[0.3, -0.4, 0.5]}
            scale={0.85}
            spinSpeed={0.25}
            accentColor="#8b5cf6"
          />
        </>
      )}

      {/* Scene 1 (Story): Subtle background plate & dumbbell */}
      {currentScene === 1 && (
        <>
          <WeightPlate3D
            position={[2.8, -0.8, -0.8]}
            rotation={[0.3, 0.5, 0.1]}
            scale={0.65}
            spinSpeed={0.15}
            accentColor="#0066ff"
          />
          <Dumbbell3D
            position={[2.4, 1.2, -0.6]}
            rotation={[-0.2, 0.4, 0.3]}
            scale={0.7}
            spinSpeed={0.18}
            accentColor="#8b5cf6"
          />
        </>
      )}

      {/* Scene 2 (Problem & Training Initiation): Olympic Barbell & scattered plates */}
      {currentScene === 2 && (
        <group>
          <Barbell3D
            position={[-1.2, -1.2, 0.2]}
            rotation={[0.1, 0.2, -0.05]}
            scale={0.85}
            accentColor="#00d2ff"
          />
          <WeightPlate3D
            position={[-2.4, 0.8, -0.4]}
            rotation={[1.2, 0.8, 0.5]}
            scale={0.85}
            spinSpeed={0.12}
            accentColor="#8b5cf6"
          />
        </group>
      )}

      {/* Scene 3 (Method): Olympic Plate Stack anchor & Barbell */}
      {currentScene === 3 && (
        <group position={[-2.2, 0, -0.2]}>
          <WeightPlate3D
            position={[0, 0.35, 0]}
            rotation={[Math.PI / 2, 0.15, 0]}
            scale={0.9}
            spinSpeed={0.2}
            accentColor="#00d2ff"
          />
          <WeightPlate3D
            position={[0, -0.35, -0.2]}
            rotation={[Math.PI / 2, -0.15, 0]}
            scale={1.05}
            spinSpeed={-0.15}
            accentColor="#8b5cf6"
          />
        </group>
      )}

      {/* Scene 4 (Services): 3D Nutrition Table with chicken, rice, water bottle, stopwatch */}
      {currentScene === 4 && (
        <group position={[1.8, -0.7, -0.1]}>
          <NutritionTable3D scale={0.9} />
          <Dumbbell3D
            position={[-1.2, 1.4, -0.2]}
            rotation={[0.4, 0.6, 0.2]}
            scale={0.75}
            spinSpeed={0.22}
            accentColor="#8b5cf6"
          />
        </group>
      )}

      {/* Scene 5 (MyProgress): 3D Phone Mockup floating prominently on right */}
      {currentScene === 5 && (
        <PhoneMockup3D
          position={[1.5, 0.05, 0.4]}
          rotation={[0.1, -0.28, 0.02]}
          scale={1.15}
        />
      )}

      {/* Scene 6 (Values): Dumbbell & Plate with subtle violet float */}
      {currentScene === 6 && (
        <group position={[2.4, 0, -0.4]}>
          <Dumbbell3D scale={0.75} spinSpeed={0.2} accentColor="#8b5cf6" />
        </group>
      )}

      {/* Scene 7 (Plans): 4 Olympic plate stacks in background representing the 4 plans */}
      {currentScene === 7 && (
        <group position={[0, -1.2, -1.5]}>
          <WeightPlate3D position={[-2.8, 0, 0]} scale={0.75} accentColor="#00d2ff" spinSpeed={0.15} />
          <WeightPlate3D position={[-0.9, 0, 0]} scale={0.75} accentColor="#8b5cf6" spinSpeed={0.15} />
          <WeightPlate3D position={[0.9, 0, 0]} scale={0.75} accentColor="#6366f1" spinSpeed={0.15} />
          <WeightPlate3D position={[2.8, 0, 0]} scale={0.75} accentColor="#22d3ee" spinSpeed={0.15} />
        </group>
      )}

      {/* Scene 8 (Final): Flanking Dumbbell and Plate under celebratory lighting */}
      {currentScene === 8 && (
        <>
          <Dumbbell3D
            position={[-2.6, 0.2, -0.2]}
            rotation={[0.3, 0.5, 0.2]}
            scale={0.75}
            spinSpeed={0.2}
            accentColor="#00d2ff"
          />
          <WeightPlate3D
            position={[2.6, -0.3, -0.2]}
            rotation={[0.4, -0.3, 0.1]}
            scale={0.75}
            spinSpeed={0.2}
            accentColor="#8b5cf6"
          />
        </>
      )}
    </group>
  );
}

export function PresentationWorld3D({ currentScene, isTransitioning }: PresentationWorld3DProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    if (!window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5.7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <CinematicCameraRig
          currentScene={currentScene}
          mousePos={mousePos}
          isTransitioning={isTransitioning}
        />

        {/* Volumetric Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 2, -2]} intensity={3.5} color="#0066ff" />
        <directionalLight position={[5, -2, -2]} intensity={3.0} color="#8b5cf6" />
        <pointLight
          position={[mousePos.x * 2.5, mousePos.y * 2.5, 3.5]}
          intensity={1.6}
          color="#00d2ff"
          distance={10}
        />

        <Suspense fallback={null}>
          {/* Floating Atmospheric Gym Particles */}
          <GymParticleField count={110} />

          {/* Dynamic Kevin Character with exact user art and transformation state */}
          <DynamicKevinCharacter
            currentScene={currentScene}
            isTransitioning={isTransitioning}
            mousePos={mousePos}
          />

          {/* Dynamic 3D Equipment */}
          <DynamicWorldEquipment currentScene={currentScene} />
        </Suspense>
      </Canvas>
    </div>
  );
}
