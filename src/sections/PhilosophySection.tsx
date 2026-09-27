import React from 'react';
import { Quote } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-36 bg-[#040507] border-t border-white/5 overflow-hidden flex items-center justify-center">
      
      {/* Background 3D Digital Character subtle watermark silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen flex items-center justify-center">
        <img
          src="/assets/kevin-3d-character.jpg"
          alt="Kevin 3D Character Silhouette"
          className="h-full w-auto max-w-none object-cover filter brightness-75 contrast-150 blur-[1px]"
        />
      </div>

      {/* Atmospheric Electric Blue & Violet Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#0066ff]/15 via-[#8b5cf6]/15 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[#0066ff]/20 border border-[#0066ff]/40 flex items-center justify-center mx-auto mb-8 shadow-[0_0_25px_rgba(0,102,255,0.3)]">
          <Quote className="w-6 h-6 text-[#00d2ff]" />
        </div>

        <span className="text-xs uppercase font-mono font-bold tracking-[0.3em] text-[#00d2ff] mb-6 block">
          Filosofía Personal — Kevin Nefi
        </span>

        {/* Main Massive Editorial Text */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto mb-8">
          YOUR STARTING POINT <br />
          DOESN'T DEFINE <br />
          <span className="text-gradient-electric">YOUR RESULT.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto font-light leading-relaxed mb-12">
          "Lo que importa es la decisión de empezar, aprender y seguir."
        </p>

        {/* Supporting Brand Tags */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#64748b]">
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:border-[#00d2ff] transition-colors">
            START WHERE YOU ARE
          </span>
          <span className="text-[#00d2ff]">•</span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:border-[#8b5cf6] transition-colors">
            BUILD FROM THERE
          </span>
          <span className="text-[#8b5cf6]">•</span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:border-[#00d2ff] transition-colors">
            PROGRESS OVER PERFECTION
          </span>
        </div>

      </div>
    </section>
  );
};
