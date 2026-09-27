import React, { useState } from 'react';
import { WeightPlate3D } from '../components/3d/WeightPlate3D';
import { Canvas } from '@react-three/fiber';

export const MethodSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "EVALUAR",
      sub: "Conocer tu punto de partida.",
      detail: "Analizamos tu historial, hábitos actuales, composición física y cualquier molestia o lesión previa para establecer una línea base sólida y segura."
    },
    {
      num: "02",
      title: "PLANIFICAR",
      sub: "Crear un proceso adaptado a ti.",
      detail: "Diseñamos una rutina personalizada con distribución inteligente de días, volumen de entrenamiento y enfoque específico según tus metas."
    },
    {
      num: "03",
      title: "ENTRENAR",
      sub: "Aprender, ejecutar y mejorar.",
      detail: "Acompañamiento presencial en sala (Makina 1, Makina 2 o coordinado) asegurando técnica correcta, rango de movimiento y seguridad articular."
    },
    {
      num: "04",
      title: "SEGUIR",
      sub: "Revisar tu progreso.",
      detail: "Monitoreo constante del desempeño, repeticiones y sensaciones a través de la plataforma digital MyProgress."
    },
    {
      num: "05",
      title: "AJUSTAR",
      sub: "Adaptar el proceso cuando sea necesario.",
      detail: "Las adaptaciones del cuerpo requieren cambios periódicos de cargas, series y enfoque nutricional para evitar estancamientos."
    },
    {
      num: "06",
      title: "PROGRESAR",
      sub: "Construir resultados sostenibles.",
      detail: "Consolidación de hábitos, aumento de fuerza real y evolución corporal estética mantenible a largo plazo."
    }
  ];

  return (
    <section id="method" className="relative py-32 bg-[#050608] border-t border-white/5 overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#8b5cf6]/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            Metodología de Entrenamiento
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            MY <span className="text-gradient-electric">METHOD.</span>
          </h2>
        </div>

        {/* Interactive Layout: Left Interactive 3D Anchor + Right Steps List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 3D Interactive Weight Plate Anchor */}
          <div className="lg:col-span-5 h-[340px] lg:h-[450px] relative flex items-center justify-center rounded-3xl bg-[#080c16]/50 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-[#0066ff]/20 to-transparent blur-2xl pointer-events-none" />
            
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
              <directionalLight position={[-4, -2, -2]} intensity={3.0} color="#0066ff" />
              <pointLight position={[0, 0, 3]} intensity={2.0} color="#8b5cf6" />
              
              <WeightPlate3D
                position={[0, 0, 0]}
                rotation={[0.6 + activeStep * 0.2, 0.4 + activeStep * 0.5, 0]}
                scale={0.9}
                spinSpeed={0.15}
                accentColor={activeStep % 2 === 0 ? "#00d2ff" : "#8b5cf6"}
              />
            </Canvas>

            {/* Active Stage Indicator Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
              <span>ETAPA SELECCIONADA</span>
              <strong className="text-[#00d2ff] text-sm">{steps[activeStep].num} — {steps[activeStep].title}</strong>
            </div>
          </div>

          {/* Right Steps Selector */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden border ${
                    isActive
                      ? 'bg-[#0d1424] border-[#0066ff] shadow-[0_0_30px_rgba(0,102,255,0.25)] translate-x-2'
                      : 'bg-[#070a12]/80 border-white/5 hover:border-white/15 hover:bg-[#0a0f1c]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className={`font-mono text-sm font-bold ${isActive ? 'text-[#00d2ff]' : 'text-[#64748b]'}`}>
                        {s.num}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                        {s.title}
                      </h3>
                      <span className="hidden sm:inline-block text-xs text-[#94a3b8] font-light">
                        — {s.sub}
                      </span>
                    </div>

                    <span className={`text-xs font-mono uppercase tracking-wider ${isActive ? 'text-[#00d2ff]' : 'text-transparent'}`}>
                      {isActive ? 'Activo' : ''}
                    </span>
                  </div>

                  {isActive && (
                    <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed pt-2 border-t border-white/5 animate-fadeIn">
                      {s.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
