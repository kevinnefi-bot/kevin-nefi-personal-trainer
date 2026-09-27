import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#09090d] border-t border-white/5 overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <GymCanvas sceneType="problem" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full">
            El Problema Común
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight mt-4 mb-6">
            IT DOESN'T HAVE TO BE <br />
            <span className="text-gradient-crimson">COMPLICATED.</span>
          </h2>
          <p className="text-base text-[#a1a1b5] leading-relaxed">
            El mundo del fitness se ha llenado de desinformación, mitos y dietas extremas. Muchas personas abandonan porque creen que transformar su físico requiere una vida imposible.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Myths / Overcomplicated side */}
          <div className="p-8 rounded-3xl bg-[#0e0e14] border border-red-900/30 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Lo que te han hecho creer</h3>
            </div>

            <ul className="space-y-4 text-sm text-[#a1a1b5]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>Rutinas caóticas de 2 horas diarias sin planificación clara.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>Dietas extremas, restrictivas e insostenibles en el tiempo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>Falsas promesas de "cambios en 30 días" sin hábitos reales.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>Sensación constante de frustración y falta de dirección.</span>
              </li>
            </ul>
          </div>

          {/* Kevin's Realist Approach */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#14141d] to-[#0d0d14] border border-[#ff003c]/40 relative overflow-hidden shadow-[0_0_40px_rgba(255,0,60,0.15)] group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ff003c]/20 border border-[#ff003c]/50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#ff003c]" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">El enfoque de Kevin Nefi</h3>
            </div>

            <ul className="space-y-4 text-sm text-white">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ff003c] mt-1.5 shrink-0 shadow-[0_0_8px_#ff003c]" />
                <span><strong>Entrenamiento eficiente:</strong> Ejercicios clave adaptados a tu tiempo y condición.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ff003c] mt-1.5 shrink-0 shadow-[0_0_8px_#ff003c]" />
                <span><strong>Nutrición realista:</strong> Orientación práctica para construir hábitos diarios.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ff003c] mt-1.5 shrink-0 shadow-[0_0_8px_#ff003c]" />
                <span><strong>Seguimiento constante:</strong> Medir peso, cargas y avance con la app MyProgress.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ff003c] mt-1.5 shrink-0 shadow-[0_0_8px_#ff003c]" />
                <span><strong>Consistencia sobre perfección:</strong> Avanzar día con día sin presiones falsas.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-[#ff003c]">
                MENOS CONFUSIÓN. MÁS DIRECCIÓN.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
