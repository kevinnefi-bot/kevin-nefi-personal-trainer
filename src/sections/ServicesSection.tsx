import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Dumbbell3D } from '../components/3d/Dumbbell3D';
import { ArrowUpRight } from 'lucide-react';
import { KEVIN_DATA } from '../data/kevinData';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      num: "01",
      title: "EVALUACIÓN FÍSICA",
      tag: "Diagnóstico",
      desc: "Análisis completo de movilidad, fuerza básica, historial de lesiones y objetivos individuales para estructurar el plan sin riesgos."
    },
    {
      num: "02",
      title: "ENTRENAMIENTO PERSONALIZADO",
      tag: "Fuerza & Estética",
      desc: "Rutinas guiadas presencialmente (en Makina 1, Makina 2 o a domicilio) enfocadas en hipertrofia, recomposición corporal y técnica sólida."
    },
    {
      num: "03",
      title: "ORIENTACIÓN NUTRICIONAL",
      tag: "Hábitos Sostenibles",
      desc: "Estrategia alimenticia práctica y realista adaptada a tu estilo de vida para potenciar el rendimiento sin dietas extremas ni mitos."
    },
    {
      num: "04",
      title: "SEGUIMIENTO PERSONAL",
      tag: "Feedback 1 a 1",
      desc: "Comunicación continua, acompañamiento directo para resolver dudas en el gimnasio y mantener la constancia que genera resultados."
    },
    {
      num: "05",
      title: "MYPROGRESS",
      tag: "Tecnología Beta",
      desc: "Acceso exclusivo a la plataforma de monitoreo digital para registrar tus pesos, ver la evolución de cargas y consultar tu rutina."
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-[#050608] border-t border-white/5 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0066ff]/15 via-[#8b5cf6]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            Servicios Principales
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            WHAT <span className="text-gradient-electric">I DO.</span>
          </h2>
        </div>

        {/* Visual Interactive System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Service Selector List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {services.map((svc, idx) => {
              const isSelected = selectedService === idx;
              return (
                <div
                  key={svc.num}
                  onMouseEnter={() => setSelectedService(idx)}
                  onClick={() => setSelectedService(idx)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#0b101e] border-[#0066ff] shadow-[0_0_35px_rgba(0,102,255,0.25)] translate-x-2'
                      : 'bg-[#070a12]/60 border-white/5 hover:border-white/15 hover:bg-[#090e1a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <span className={`font-display font-black text-2xl sm:text-3xl ${isSelected ? 'text-[#00d2ff]' : 'text-[#475569]'}`}>
                        {svc.num}
                      </span>
                      <div>
                        <div className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider mb-1">
                          {svc.tag}
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00d2ff] transition-colors">
                          {svc.title}
                        </h3>
                      </div>
                    </div>

                    <a
                      href={KEVIN_DATA.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected ? 'bg-[#0066ff] text-white shadow-[0_0_15px_#0066ff]' : 'bg-white/5 text-[#64748b] hover:text-white'
                      }`}
                      aria-label={`Consultar por ${svc.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  {isSelected && (
                    <p className="mt-4 pt-3 border-t border-white/5 text-sm text-[#94a3b8] leading-relaxed">
                      {svc.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Dynamic 3D Object Showcase reacting to selected service */}
          <div className="lg:col-span-5 h-[380px] lg:h-[480px] relative rounded-3xl bg-[#080d1a]/60 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-[#00d2ff]/15 via-[#8b5cf6]/10 to-transparent blur-2xl pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
              <directionalLight position={[-4, 2, -2]} intensity={3.5} color="#0066ff" />
              <pointLight position={[0, -2, 2]} intensity={2.0} color="#8b5cf6" />
              
              <Dumbbell3D
                position={[0, 0, 0]}
                rotation={[0.3 + selectedService * 0.4, 0.5 + selectedService * 0.6, 0.2]}
                scale={1.05}
                spinSpeed={0.2}
                accentColor={selectedService % 2 === 0 ? "#00d2ff" : "#8b5cf6"}
              />
            </Canvas>

            {/* Service Counter Overlay */}
            <div className="absolute top-6 right-6 font-display font-black text-5xl text-white/10 select-none">
              {services[selectedService].num}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
              <span>INTERACTIVE 3D GYM OBJECT</span>
              <span className="text-[#00d2ff] font-bold">ROTATING</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
