import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface KevinCharacter3DProps {
  position?: [number, number, number];
  scale?: number;
  mousePos?: { x: number; y: number };
}

export const KevinCharacter3D: React.FC<KevinCharacter3DProps> = ({
  position = [0, -0.3, 0],
  scale = 1.0,
  mousePos = { x: 0, y: 0 }
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/assets/kevin-3d-character.jpg');

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Natural breathing / idle motion
    const breathingOffset = Math.sin(t * 1.5) * 0.04;
    groupRef.current.position.y = position[1] + breathingOffset;

    // Subtle pointer parallax tracking
    const targetRotY = (mousePos.x * 0.15);
    const targetRotX = (-mousePos.y * 0.08);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Volumetric Glow Backdrop Behind Character */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[3.2, 4.4]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0.4, 0.2, -0.15]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main 3D Digital Character Plane with Depth and Lighting */}
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 3.73]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.4}
          metalness={0.15}
          transparent={true}
        />
      </mesh>

      {/* Electric Blue Rim Light Aura Simulation */}
      <mesh position={[-1.38, 0, 0.02]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[0.08, 3.6]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Violet Rim Light Edge Simulation */}
      <mesh position={[1.38, 0, 0.02]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[0.08, 3.6]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
