import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PhoneMockup3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const PhoneMockup3D: React.FC<PhoneMockup3DProps> = ({
  position = [0, 0, 0],
  rotation = [0.15, -0.25, 0.05],
  scale = 1.2
}) => {
  const phoneRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!phoneRef.current) return;
    const t = state.clock.getElapsedTime();
    phoneRef.current.position.y = initialY + Math.sin(t * 1.2) * 0.12;
    phoneRef.current.rotation.y = rotation[1] + Math.cos(t * 0.8) * 0.08;
    phoneRef.current.rotation.x = rotation[0] + Math.sin(t * 0.6) * 0.05;
  });

  return (
    <group ref={phoneRef} position={position} rotation={rotation} scale={scale}>
      {/* Smartphone Body Outer Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 3.0, 0.18]} />
        <meshStandardMaterial
          color="#0c0c12"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Crimson Glow Frame Edge */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.54, 3.04, 0.12]} />
        <meshStandardMaterial
          color="#ff003c"
          emissive="#ff003c"
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Front Screen Display */}
      <mesh position={[0, 0, 0.096]}>
        <planeGeometry args={[1.4, 2.9]} />
        <meshBasicMaterial color="#08080c" />
      </mesh>

      {/* UI Elements Simulated inside Screen */}
      <group position={[0, 0, 0.1]}>
        {/* Header Bar */}
        <mesh position={[0, 1.25, 0]}>
          <planeGeometry args={[1.2, 0.2]} />
          <meshBasicMaterial color="#1a1a24" />
        </mesh>
        
        {/* App Title Banner "MYPROGRESS" */}
        <mesh position={[-0.2, 1.0, 0]}>
          <planeGeometry args={[0.7, 0.12]} />
          <meshBasicMaterial color="#ff003c" />
        </mesh>

        {/* Progress Circular Widget */}
        <mesh position={[0, 0.4, 0]}>
          <ringGeometry args={[0.3, 0.38, 32]} />
          <meshBasicMaterial color="#ff003c" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial color="#12121a" />
        </mesh>

        {/* Stat Cards */}
        <mesh position={[-0.32, -0.3, 0]}>
          <planeGeometry args={[0.55, 0.6]} />
          <meshBasicMaterial color="#161622" />
        </mesh>
        <mesh position={[0.32, -0.3, 0]}>
          <planeGeometry args={[0.55, 0.6]} />
          <meshBasicMaterial color="#161622" />
        </mesh>

        {/* Workout Plan Bar */}
        <mesh position={[0, -0.9, 0]}>
          <planeGeometry args={[1.2, 0.4]} />
          <meshBasicMaterial color="#1e1b26" />
        </mesh>

        {/* Action Button */}
        <mesh position={[0, -1.25, 0]}>
          <planeGeometry args={[1.2, 0.18]} />
          <meshBasicMaterial color="#ff003c" />
        </mesh>
      </group>

      {/* Camera Notch */}
      <mesh position={[0, 1.35, 0.101]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};
