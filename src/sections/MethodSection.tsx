import React, { useState } from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { ArrowRight, Activity, CalendarCheck, Dumbbell, LineChart, SlidersHorizontal, Trophy } from 'lucide-react';

const iconsMap = [Activity, CalendarCheck, Dumbbell, LineChart, SlidersHorizontal, Trophy];

export const MethodSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="method" className="relative py-28 bg-[#070709] border-t border-white/5 overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#ff003c]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full">
              Metodología de Trabajo
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mt-4">
              EL MÉTODO <span className="text-gradient-crimson">PASO A PASO.</span>
            </h2>
          </div>
          <p className="text-sm text-[#a1a1b5] max-w-md">
            Un proceso estructurado en 6 etapas estratégicas diseñadas para evolucionar progresivamente tu cuerpo y tu fuerza.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KEVIN_DATA.method.map((item, idx) => {
            const Icon = iconsMap[idx % iconsMap.length];
            const isActive = activeStep === idx;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-3xl p-8 transition-all duration-400 relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#14141d] border-2 border-[#ff003c] shadow-[0_0_35px_rgba(255,0,60,0.25)] scale-[1.02]'
                    : 'bg-[#0c0c12] border border-white/10 hover:border-white/20 hover:bg-[#101018]'
                }`}
              >
                {/* Step Number watermark */}
                <span className="absolute top-4 right-6 font-display font-black text-6xl text-white/5 group-hover:text-[#ff003c]/15 transition-colors">
                  {item.step}
                </span>

                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#ff003c] text-white shadow-[0_0_15px_#ff003c]' : 'bg-[#181822] text-[#a1a1b5] group-hover:text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                    isActive ? 'text-[#ff003c]' : 'text-[#71717a]'
                  }`}>
                    Etapa {item.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {item.name}
                </h3>

                <p className="text-sm text-[#a1a1b5] leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex items-center text-xs font-semibold text-[#ff003c]">
                  <span>Saber más</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
