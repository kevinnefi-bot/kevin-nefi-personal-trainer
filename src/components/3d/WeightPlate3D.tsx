import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeightPlate3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  accentColor?: string;
  spinSpeed?: number;
}

export const WeightPlate3D: React.FC<WeightPlate3DProps> = ({
  position = [0, 0, 0],
  rotation = [Math.PI / 2, 0, 0],
  scale = 1,
  color = "#0e131d",
  accentColor = "#00d2ff",
  spinSpeed = 0.35
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && spinSpeed !== 0) {
      groupRef.current.rotation.z += delta * spinSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Outer Rim */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.35, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0.88}
        />
      </mesh>

      {/* Outer Lip Ridge */}
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[2.0, 0.12, 16, 48]} />
        <meshStandardMaterial
          color="#161e2e"
          roughness={0.3}
          metalness={0.75}
        />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[2.0, 0.12, 16, 48]} />
        <meshStandardMaterial
          color="#161e2e"
          roughness={0.3}
          metalness={0.75}
        />
      </mesh>

      {/* Inner Electric Accent Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 48]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Center Hole Hub */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.38, 32]} />
        <meshStandardMaterial
          color="#080b12"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Center Opening Cutout Simulation */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial
          color="#030407"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grip Handles cutout details */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]}>
          <mesh position={[1.4, 0, 0]}>
            <boxGeometry args={[0.4, 0.25, 0.18]} />
            <meshStandardMaterial
              color="#090d16"
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
