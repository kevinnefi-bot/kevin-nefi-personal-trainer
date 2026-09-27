import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GymParticleField } from './GymParticleField';
import { WeightPlate3D } from './WeightPlate3D';
import { Dumbbell3D } from './Dumbbell3D';
import { PhoneMockup3D } from './PhoneMockup3D';
import { useTexture } from '@react-three/drei';

interface PresentationWorld3DProps {
  currentScene: number; // 0 to 8
  isTransitioning?: boolean;
}

// Scene target setups for Kevin
interface KevinSceneTransform {
  position: [number, number, number];
  scale: number;
  rotationY: number;
  opacity: number;
}

const KEVIN_SCENE_TRANSFORMS: Record<number, KevinSceneTransform> = {
  // 0: Meet - Right side, heroic stance, looking slightly center-left
  0: { position: [1.75, -0.32, 0], scale: 1.05, rotationY: -0.12, opacity: 1.0 },
  // 1: Story - Left side, intimate and conversational, closer to viewer
  1: { position: [-1.75, -0.28, 0.2], scale: 1.1, rotationY: 0.18, opacity: 1.0 },
  // 2: Problem - Right-center, observing the scattered equipment
  2: { position: [1.35, -0.35, 0], scale: 1.0, rotationY: -0.22, opacity: 0.95 },
  // 3: Method - Far right, standing by the method process visualization
  3: { position: [2.15, -0.4, -0.2], scale: 0.95, rotationY: -0.2, opacity: 0.9 },
  // 4: Services - Left side, framing the active services
  4: { position: [-2.1, -0.38, -0.3], scale: 0.95, rotationY: 0.22, opacity: 0.85 },
  // 5: MyProgress - Left of center, gesturing towards the phone mockup
  5: { position: [-1.45, -0.32, 0.1], scale: 1.02, rotationY: 0.28, opacity: 1.0 },
  // 6: Values - Left side, serene posture under violet atmospheric rim light
  6: { position: [-2.25, -0.4, -0.4], scale: 0.92, rotationY: 0.2, opacity: 0.85 },
  // 7: Plans - Background center, watching over the training options
  7: { position: [0, -0.5, -1.2], scale: 0.82, rotationY: 0, opacity: 0.7 },
  // 8: Final - Center-stage, prominent, welcoming the user to build their best version
  8: { position: [0, -0.35, 0.35], scale: 1.18, rotationY: 0, opacity: 1.0 },
};

// Smooth Camera Controller that reacts to currentScene and mouse position
function CameraRig({ currentScene, mousePos }: { currentScene: number; mousePos: { x: number; y: number } }) {
  const { camera } = useThree();

  // Subtle target camera offsets per scene to create continuous cinematic world flow
  const targetCamX = useMemo(() => {
    switch (currentScene) {
      case 0: return 0.2;
      case 1: return -0.3;
      case 2: return 0.1;
      case 3: return 0.4;
      case 4: return -0.4;
      case 5: return 0.2;
      case 6: return -0.3;
      case 7: return 0.0;
      case 8: return 0.0;
      default: return 0.0;
    }
  }, [currentScene]);

  useFrame((_, delta) => {
    const mouseOffsetX = mousePos.x * 0.3;
    const mouseOffsetY = mousePos.y * 0.2;

    const desiredX = targetCamX + mouseOffsetX;
    const desiredY = 0 + mouseOffsetY;
    const desiredZ = 5.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredZ, 2.5, delta);
    camera.lookAt(targetCamX * 0.5, 0, 0);
  });

  return null;
}

// Dynamic Kevin character that physically travels and transitions across scenes
function DynamicKevinMesh({
  currentScene,
  isTransitioning,
  mousePos,
}: {
  currentScene: number;
  isTransitioning?: boolean;
  mousePos: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture('/assets/kevin-3d-character.jpg');

  const target = KEVIN_SCENE_TRANSFORMS[currentScene] ?? KEVIN_SCENE_TRANSFORMS[0];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Natural breathing / idle motion
    const breathingOffset = Math.sin(t * 1.6) * 0.035;

    // Walking stride bobbing when actively transitioning or moving
    const walkingBob = isTransitioning ? Math.sin(t * 9.0) * 0.06 : 0;

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
        <planeGeometry args={[3.2, 4.4]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Volumetric Violet Glow Accent */}
      <mesh position={[0.3, 0.2, -0.16]}>
        <planeGeometry args={[2.6, 3.6]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main 3D Digital Character Plane */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 3.73]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.35}
          metalness={0.15}
          transparent={true}
        />
      </mesh>

      {/* Left Electric Blue Rim Light Aura */}
      <mesh position={[-1.38, 0, 0.02]} rotation={[0, 0.35, 0]}>
        <planeGeometry args={[0.09, 3.6]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Right Violet Rim Light Aura */}
      <mesh position={[1.38, 0, 0.02]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.09, 3.6]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Dynamic 3D Equipment that populates the continuous world
function DynamicWorldEquipment({ currentScene }: { currentScene: number }) {
  // Show / hide or reposition objects based on active presentation scene
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

      {/* Scene 1 (Story): Subtle background plate on far right */}
      {currentScene === 1 && (
        <WeightPlate3D
          position={[2.8, -0.8, -0.8]}
          rotation={[0.3, 0.5, 0.1]}
          scale={0.65}
          spinSpeed={0.15}
          accentColor="#0066ff"
        />
      )}

      {/* Scene 2 (Problem): Scattered gym equipment representing chaos */}
      {currentScene === 2 && (
        <group>
          <WeightPlate3D
            position={[-2.0, 0.8, -0.4]}
            rotation={[1.2, 0.8, 0.5]}
            scale={0.85}
            spinSpeed={0.12}
            accentColor="#8b5cf6"
          />
          <Dumbbell3D
            position={[-2.2, -1.2, -0.2]}
            rotation={[-0.4, 0.6, 1.0]}
            scale={0.75}
            spinSpeed={0.15}
            accentColor="#00d2ff"
          />
        </group>
      )}

      {/* Scene 3 (Method): Olympic Plate Stack anchor */}
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

      {/* Scene 4 (Services): Dumbbell floating on right */}
      {currentScene === 4 && (
        <Dumbbell3D
          position={[2.4, 0.6, -0.2]}
          rotation={[0.4, 0.6, 0.2]}
          scale={0.8}
          spinSpeed={0.22}
          accentColor="#8b5cf6"
        />
      )}

      {/* Scene 5 (MyProgress): 3D Phone Mockup floating prominently on right */}
      {currentScene === 5 && (
        <PhoneMockup3D
          position={[1.5, 0.05, 0.4]}
          rotation={[0.1, -0.28, 0.02]}
          scale={1.15}
        />
      )}

      {/* Scene 7 (Plans): Olympic plate stacks in background */}
      {currentScene === 7 && (
        <group position={[0, -1.2, -1.5]}>
          <WeightPlate3D position={[-2.8, 0, 0]} scale={0.7} accentColor="#00d2ff" spinSpeed={0.15} />
          <WeightPlate3D position={[-0.9, 0, 0]} scale={0.7} accentColor="#8b5cf6" spinSpeed={0.15} />
          <WeightPlate3D position={[0.9, 0, 0]} scale={0.7} accentColor="#6366f1" spinSpeed={0.15} />
          <WeightPlate3D position={[2.8, 0, 0]} scale={0.7} accentColor="#22d3ee" spinSpeed={0.15} />
        </group>
      )}

      {/* Scene 8 (Final): Dumbbell and Plate flanking Kevin */}
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
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <CameraRig currentScene={currentScene} mousePos={mousePos} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 2, -2]} intensity={3.2} color="#0066ff" />
        <directionalLight position={[5, -2, -2]} intensity={2.8} color="#8b5cf6" />
        <pointLight position={[mousePos.x * 2.5, mousePos.y * 2.5, 3.5]} intensity={1.5} color="#00d2ff" distance={9} />

        <Suspense fallback={null}>
          {/* Persistent Floating Gym Particles across all scenes */}
          <GymParticleField count={95} />

          {/* Persistent Dynamic Kevin that travels across scenes */}
          <DynamicKevinMesh
            currentScene={currentScene}
            isTransitioning={isTransitioning}
            mousePos={mousePos}
          />

          {/* Scene Equipment */}
          <DynamicWorldEquipment currentScene={currentScene} />
        </Suspense>
      </Canvas>
    </div>
  );
}
