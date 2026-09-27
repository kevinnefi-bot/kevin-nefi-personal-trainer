import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GymParticleFieldProps {
  count?: number;
}

export const GymParticleField: React.FC<GymParticleFieldProps> = ({ count = 120 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const electricBlue = new THREE.Color('#00d2ff');
    const royalBlue = new THREE.Color('#0066ff');
    const violet = new THREE.Color('#8b5cf6');
    const steel = new THREE.Color('#475569');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const randomColor = Math.random();
      let chosenColor = steel;
      if (randomColor > 0.75) {
        chosenColor = electricBlue;
      } else if (randomColor > 0.5) {
        chosenColor = violet;
      } else if (randomColor > 0.3) {
        chosenColor = royalBlue;
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sca[i] = Math.random() * 0.08 + 0.02;
    }

    return [pos, col, sca];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
