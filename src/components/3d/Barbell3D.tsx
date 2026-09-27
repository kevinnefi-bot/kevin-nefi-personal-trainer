import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Barbell3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  spinSpeed?: number;
  accentColor?: string;
}

export const Barbell3D: React.FC<Barbell3DProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  spinSpeed = 0,
  accentColor = '#00d2ff',
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (spinSpeed !== 0) {
      groupRef.current.rotation.y += delta * spinSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Steel Bar */}
      <mesh castShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 4.4, 32]} />
        <meshStandardMaterial
          color="#e2e8f0"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Knurled Grip Center Sections */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.8, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.45} metalness={0.85} />
      </mesh>
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.8, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.45} metalness={0.85} />
      </mesh>

      {/* Left Sleeve & Collar */}
      <group position={[-1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.85, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Left Olympic Plate 1 (Large 20kg) */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.14, 32]} />
          <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Left Plate 2 (15kg) */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.12, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Collar Ring */}
        <mesh position={[0, -0.44, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Right Sleeve & Collar */}
      <group position={[1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.85, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Right Olympic Plate 1 */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.14, 32]} />
          <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Right Plate 2 */}
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.12, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Collar Ring */}
        <mesh position={[0, 0.44, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
};
