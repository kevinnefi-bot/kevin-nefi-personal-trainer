import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GymParticleField } from './GymParticleField';
import { WeightPlate3D } from './WeightPlate3D';
import { Dumbbell3D } from './Dumbbell3D';
import { KevinCharacter3D } from './KevinCharacter3D';

interface GymCanvasProps {
  sceneType?: 'hero' | 'problem' | 'method' | 'myprogress' | 'footer';
  className?: string;
  lowPowerMode?: boolean;
}

export const GymCanvas: React.FC<GymCanvasProps> = ({
  sceneType = 'hero',
  className = '',
  lowPowerMode = false
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
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
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: !lowPowerMode, alpha: true }}
        dpr={lowPowerMode ? 1 : [1, 2]}
      >
        {/* Cinematic Electric Blue & Violet Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 2, -2]} intensity={3.5} color="#0066ff" />
        <directionalLight position={[5, -2, -2]} intensity={3.0} color="#8b5cf6" />
        <pointLight position={[mousePos.x * 2, mousePos.y * 2, 3]} intensity={1.8} color="#00d2ff" distance={8} />

        <Suspense fallback={null}>
          <GymParticleField count={lowPowerMode ? 35 : 110} />

          {sceneType === 'hero' && (
            <>
              {/* Central 3D Digital Character of Kevin */}
              <KevinCharacter3D
                position={[1.8, -0.4, 0]}
                scale={1.05}
                mousePos={mousePos}
              />

              {/* Floating Olympic Weight Plate with Electric Blue Rim */}
              <WeightPlate3D
                position={[-2.8, 1.2, -0.5]}
                rotation={[0.7, 0.4, 0.2]}
                scale={0.75}
                spinSpeed={0.2}
                accentColor="#00d2ff"
              />

              {/* Floating Metallic Hex Dumbbell */}
              <Dumbbell3D
                position={[-2.4, -1.4, 0]}
                rotation={[0.3, -0.4, 0.5]}
                scale={0.85}
                spinSpeed={0.2}
                accentColor="#8b5cf6"
              />
            </>
          )}

          {sceneType === 'problem' && (
            <group position={[0, 0, 0]}>
              <WeightPlate3D
                position={[0, 0.4, 0]}
                rotation={[Math.PI / 2, 0.2, 0]}
                scale={1.2}
                spinSpeed={0.15}
                color="#090d16"
                accentColor="#00d2ff"
              />
              <WeightPlate3D
                position={[0, -0.4, -0.6]}
                rotation={[Math.PI / 2, -0.2, 0]}
                scale={1.4}
                spinSpeed={-0.1}
                color="#06080e"
                accentColor="#8b5cf6"
              />
            </group>
          )}

          {sceneType === 'method' && (
            <group position={[0, 0, 0]}>
              <WeightPlate3D
                position={[2.5, 0, 0]}
                rotation={[0.5, 0.8, 0]}
                scale={1.0}
                spinSpeed={0.3}
                accentColor="#00d2ff"
              />
            </group>
          )}

          {sceneType === 'footer' && (
            <>
              <KevinCharacter3D
                position={[0, -0.6, -0.5]}
                scale={0.9}
                mousePos={mousePos}
              />
              <Dumbbell3D
                position={[2.4, 0.5, 0]}
                rotation={[0.2, 0.8, 0]}
                scale={0.8}
                spinSpeed={0.25}
                floatAmplitude={0.15}
                accentColor="#8b5cf6"
              />
              <WeightPlate3D
                position={[-2.4, -0.5, 0]}
                rotation={[0.4, 0.3, 0.2]}
                scale={0.65}
                spinSpeed={0.2}
                accentColor="#00d2ff"
              />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
