import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';

export function Scene01_Meet() {
  const { goNext, goTo } = usePresentation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.anim-el');
    gsap.fromTo(
      els,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen flex overflow-hidden">
      {/* Readability gradient for text on left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.8) 45%, rgba(5,6,8,0.2) 75%, transparent 100%)',
        }}
      />

      {/* LEFT — Text content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-1/2 py-20 pb-28"
      >
        {/* Eyebrow */}
        <div className="anim-el flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.35em] uppercase text-[#00d2ff]">
            Kevin Nefi · Personal Trainer
          </span>
        </div>

        {/* Headline */}
        <h1 className="anim-el font-black uppercase leading-[0.9] mb-6">
          <span className="block text-white text-5xl md:text-6xl lg:text-7xl">BUILD YOUR</span>
          <span className="block text-gradient-electric text-5xl md:text-6xl lg:text-7xl">
            BEST VERSION.
          </span>
        </h1>

        {/* Body */}
        <p className="anim-el text-white/60 text-lg font-light leading-relaxed max-w-sm mb-10">
          Entrenamiento personalizado, seguimiento real y progreso sostenible.
        </p>

        {/* CTAs */}
        <div className="anim-el flex flex-wrap gap-4">
          <button
            onClick={goNext}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm uppercase tracking-[0.2em] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 50%, #8b5cf6 100%)',
            }}
          >
            <span className="relative z-10">Empezar</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => goTo(1)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white/70 font-medium text-sm uppercase tracking-[0.2em] border border-white/15 hover:border-[#00d2ff]/50 hover:text-white transition-all duration-300 glass-panel"
          >
            Conocerme
          </button>
        </div>

        {/* Chapter indicator */}
        <div className="anim-el mt-12 flex items-center gap-2">
          <span className="text-[#00d2ff] font-mono font-bold text-sm">01</span>
          <span className="text-white/20 font-mono text-sm">/ 09</span>
          <div className="w-12 h-px bg-white/10 ml-2" />
          <span className="text-white/30 text-xs tracking-widest uppercase">Meet Kevin</span>
        </div>
      </div>
    </div>
  );
}
