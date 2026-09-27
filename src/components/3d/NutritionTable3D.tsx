import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NutritionTable3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const NutritionTable3D: React.FC<NutritionTable3DProps> = ({
  position = [0, 0, 0],
  rotation = [0.2, -0.2, 0],
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const plateRef = useRef<THREE.Group>(null);
  const bottleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (plateRef.current) {
      plateRef.current.rotation.y = t * 0.3;
    }
    if (bottleRef.current) {
      bottleRef.current.position.y = 0.35 + Math.sin(t * 1.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Table Top Surface (Dark Titanium / Glass) */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.08, 48]} />
        <meshStandardMaterial
          color="#0c1220"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Table Edge Accent Ring */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[1.58, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#00d2ff"
          emissive="#00d2ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Ceramic Plate with Balanced Meal */}
      <group ref={plateRef} position={[-0.45, 0.05, 0.2]}>
        {/* White Ceramic Dish */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.42, 0.06, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
        </mesh>
        {/* Chicken Breast Portion (Golden Brown) */}
        <mesh position={[-0.12, 0.06, 0.05]} castShadow>
          <boxGeometry args={[0.3, 0.07, 0.22]} />
          <meshStandardMaterial color="#c28e46" roughness={0.6} />
        </mesh>
        {/* Jasmine Rice Mound */}
        <mesh position={[0.16, 0.05, -0.08]} castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Steamed Broccoli / Greens */}
        <mesh position={[0.08, 0.06, 0.18]} castShadow>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
      </group>

      {/* Translucent Water Bottle (Hydration) */}
      <group ref={bottleRef} position={[0.7, 0.35, -0.3]}>
        {/* Bottle Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.65, 24]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            roughness={0.1}
            transmission={0.8}
            thickness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Bottle Cap */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#0066ff" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* Digital Stopwatch (Discipline / Chrono) */}
      <group position={[0.55, 0.04, 0.45]} rotation={[-Math.PI / 2, 0, 0.4]}>
        {/* Stopwatch body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Stopwatch screen */}
        <mesh position={[0, 0.025, 0]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial color="#00d2ff" />
        </mesh>
      </group>

      {/* Floating Holographic Macro Rings */}
      <group position={[-0.45, 0.65, 0.2]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.7, 0.015, 16, 48]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.85, 0.015, 16, 48]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};
