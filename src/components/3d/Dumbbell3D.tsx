import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Dumbbell3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  spinSpeed?: number;
  floatAmplitude?: number;
  accentColor?: string;
}

export const Dumbbell3D: React.FC<Dumbbell3DProps> = ({
  position = [0, 0, 0],
  rotation = [0.4, 0.6, 0.2],
  scale = 1,
  spinSpeed = 0.25,
  floatAmplitude = 0.15,
  accentColor = "#00d2ff"
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (spinSpeed !== 0) {
      groupRef.current.rotation.y += delta * spinSpeed;
      groupRef.current.rotation.z += delta * (spinSpeed * 0.4);
    }
    if (floatAmplitude > 0) {
      groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 1.4) * floatAmplitude;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Central Handle Barbell Grip */}
      <mesh castShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 2.2, 32]} />
        <meshStandardMaterial
          color="#dbeafe"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Knurling Grip Center Detail */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.19, 0.19, 1.4, 32]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Left Weight Plates Stack */}
      <group position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.35, 6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh castShadow position={[-0.25, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.4, 6]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Electric Blue Collar Ring */}
        <mesh position={[0.22, 0, 0]}>
          <torusGeometry args={[0.35, 0.04, 16, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Right Weight Plates Stack */}
      <group position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.35, 6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh castShadow position={[0.25, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.4, 6]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Electric Blue Collar Ring */}
        <mesh position={[-0.22, 0, 0]}>
          <torusGeometry args={[0.35, 0.04, 16, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.7} />
        </mesh>
      </group>
    </group>
  );
};
