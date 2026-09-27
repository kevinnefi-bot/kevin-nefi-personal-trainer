import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GymParticleField } from './GymParticleField';
import { WeightPlate3D } from './WeightPlate3D';
import { Dumbbell3D } from './Dumbbell3D';

interface GymCanvasProps {
  sceneType?: 'hero' | 'problem' | 'myprogress' | 'footer';
  className?: string;
  lowPowerMode?: boolean;
}

export const GymCanvas: React.FC<GymCanvasProps> = ({
  sceneType = 'hero',
  className = '',
  lowPowerMode = false
}) => {
  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: !lowPowerMode, alpha: true }}
        dpr={lowPowerMode ? 1 : [1, 2]}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -2, -2]} intensity={2.0} color="#ff003c" />
        <pointLight position={[0, 3, 2]} intensity={1.5} color="#ff0055" />

        <Suspense fallback={null}>
          <GymParticleField count={lowPowerMode ? 35 : 100} />

          {sceneType === 'hero' && (
            <>
              <WeightPlate3D
                position={[3.2, 1.2, -1]}
                rotation={[0.8, 0.4, 0.2]}
                scale={0.7}
                spinSpeed={0.25}
              />
              <Dumbbell3D
                position={[-3.0, -1.2, -0.5]}
                rotation={[0.3, -0.4, 0.5]}
                scale={0.8}
                spinSpeed={0.2}
              />
            </>
          )}

          {sceneType === 'problem' && (
            <group position={[0, 0, 0]}>
              <WeightPlate3D
                position={[0, 0.4, 0]}
                rotation={[Math.PI / 2, 0.2, 0]}
                scale={1.1}
                spinSpeed={0.15}
                color="#121218"
              />
              <WeightPlate3D
                position={[0, -0.4, -0.5]}
                rotation={[Math.PI / 2, -0.2, 0]}
                scale={1.3}
                spinSpeed={-0.1}
                color="#1c1c24"
              />
            </group>
          )}

          {sceneType === 'footer' && (
            <Dumbbell3D
              position={[0, 0, 0]}
              rotation={[0.2, 0.8, 0]}
              scale={1.1}
              spinSpeed={0.3}
              floatAmplitude={0.2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
