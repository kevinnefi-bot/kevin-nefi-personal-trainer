import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GymParticleField } from './GymParticleField';
import { WeightPlate3D } from './WeightPlate3D';
import { Dumbbell3D } from './Dumbbell3D';
import { Barbell3D } from './Barbell3D';
import { NutritionTable3D } from './NutritionTable3D';
import { PhoneMockup3D } from './PhoneMockup3D';
import { KevinInteractiveCharacter } from './KevinInteractiveCharacter';

interface PresentationWorld3DProps {
  currentScene: number; // 0 to 8
  isTransitioning?: boolean;
}

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

    const lookTargetX = THREE.MathUtils.damp(0, sceneCameraTarget.x * 0.4 + parallaxX * 0.3, 2.5, delta);
    camera.lookAt(lookTargetX, 0, 0);
  });

  return null;
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

      {/* Scene 6 (Values): Dumbbell with violet accent float */}
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

      {/* Scene 8 (Final): Flanking Dumbbell and Plate */}
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
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
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

          {/* Movable & Interactive 3D Kevin Character */}
          <KevinInteractiveCharacter
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
