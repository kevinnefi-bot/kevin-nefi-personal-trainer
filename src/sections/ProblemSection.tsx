import React from 'react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { ArrowRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const pillars = [
    { title: "EVALUAR", desc: "Comprender tu punto de inicio, movilidad e historial." },
    { title: "PLANIFICAR", desc: "Diseñar una ruta realista adaptada a tus horarios." },
    { title: "ENTRENAR", desc: "Ejecutar técnica impecable con intensidad progresiva." },
    { title: "SEGUIR", desc: "Monitorear cargas y evolución constante." },
    { title: "AJUSTAR", desc: "Optimizar variables cuando el cuerpo se adapta." },
    { title: "PROGRESAR", desc: "Resultados visibles y fuerza acumulada en el tiempo." }
  ];

  return (
    <section id="problem" className="relative py-32 bg-[#050608] border-t border-white/5 overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <GymCanvas sceneType="problem" />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#0066ff]/15 to-[#8b5cf6]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-4 py-1.5 rounded-full inline-block mb-6">
            La Realidad del Fitness
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-[1.0] mb-6">
            NO TIENE POR QUÉ <br />
            <span className="text-gradient-electric">SER COMPLICADO.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#94a3b8] font-light max-w-2xl mx-auto leading-relaxed">
            "Entrenar no debería sentirse como seguir una fórmula imposible."
          </p>
        </div>

        {/* Minimalist Typography Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={item.title}
              className="group p-8 rounded-3xl bg-[#080c16]/80 border border-white/10 hover:border-[#0066ff]/60 hover:bg-[#0c1222] transition-all duration-300 relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#00d2ff] font-bold">
                  0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#8b5cf6]" />
              </div>

              <h3 className="font-display font-black text-2xl text-white group-hover:text-[#00d2ff] transition-colors mb-2 tracking-wide">
                {item.title}
              </h3>

              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-[#0066ff] group-hover:text-[#00d2ff] transition-colors">
                <span>Estrategia activa</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-[#64748b]">
            MENOS CONFUSIÓN • MÁS DIRECCIÓN • RESULTADOS REALES
          </p>
        </div>

      </div>
    </section>
  );
};
