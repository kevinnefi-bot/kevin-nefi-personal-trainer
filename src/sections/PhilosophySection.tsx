import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { Quote } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-32 bg-[#050507] border-t border-white/5 overflow-hidden flex items-center justify-center">
      
      {/* Background Dark Kevin Photo Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-luminosity">
        <img
          src="/assets/kevin-photo.jpg"
          alt="Kevin Background"
          className="w-full h-full object-cover object-center filter grayscale contrast-200"
        />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff003c]/15 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[#ff003c]/20 border border-[#ff003c]/40 flex items-center justify-center mx-auto mb-8">
          <Quote className="w-6 h-6 text-[#ff003c]" />
        </div>

        <span className="text-xs uppercase font-mono font-bold tracking-[0.3em] text-[#ff003c] mb-6 block">
          Filosofía Personal — Kevin Nefi
        </span>

        {/* Main Massive Editorial Text */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight max-w-5xl mx-auto mb-8">
          "TU PUNTO DE PARTIDA NO DEFINE TU RESULTADO FINAL. <br />
          <span className="text-gradient-crimson">TU DECISIÓN DE CONTINUAR SÍ."</span>
        </h2>

        <p className="text-sm sm:text-base text-[#a1a1b5] max-w-2xl mx-auto font-light leading-relaxed mb-12">
          El verdadero cambio no sucede de la noche a la mañana. Se construye repetición a repetición, día a día, adaptando el entrenamiento a tu vida y no tu vida al entrenamiento.
        </p>

        {/* Taglines Banner */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#71717a]">
          {KEVIN_DATA.philosophy.taglines.map((tagline, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:border-[#ff003c] transition-colors">
                {tagline}
              </span>
              {idx < KEVIN_DATA.philosophy.taglines.length - 1 && (
                <span className="text-[#ff003c]">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
