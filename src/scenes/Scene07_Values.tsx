import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

const ICON_MAP: Record<string, string> = {
  ShieldCheck: '🛡️',
  Zap: '⚡',
  TrendingUp: '📈',
  Target: '🎯',
  Heart: '🤝',
  Sliders: '⚙️',
};

export function Scene07_Values() {
  const { goNext } = usePresentation();
  const topRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      gsap.fromTo(topRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.value-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.25 }
      );
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 py-20 pb-28">
      {/* Readability gradient: Kevin on left in 3D world, cards across center-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.75) 70%, rgba(5,6,8,0.3) 100%)',
        }}
      />

      {/* Top */}
      <div ref={topRef} className="relative z-10 mb-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#8b5cf6]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8b5cf6]">
            07 / 09 · Mi Filosofía
          </span>
        </div>
        <h2 className="font-black uppercase text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          ¿POR QUÉ ENTRENAR{' '}
          <span className="text-gradient-violet">CONMIGO?</span>
        </h2>
        <p className="text-white/50 text-base mt-2">
          Sin promesas falsas. Solo un proceso real, consistente y diseñado para ti.
        </p>
      </div>

      {/* Values grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mb-8"
      >
        {KEVIN_DATA.values.map((v, i) => (
          <div
            key={i}
            className="value-card glass-panel rounded-2xl p-5 border border-white/10 hover:border-[#8b5cf6]/40 hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex items-start gap-3 border-l-2 border-[#8b5cf6] pl-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{ICON_MAP[v.iconName] ?? '✦'}</span>
                  <span className="font-bold text-white text-sm uppercase tracking-wide">{v.title}</span>
                </div>
                <div className="text-[#8b5cf6] text-xs font-semibold mb-2">{v.subtitle}</div>
                <p className="text-white/55 text-xs leading-relaxed">{v.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <div className="relative z-10">
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#8b5cf6] hover:text-white transition-colors group w-fit"
        >
          Siguiente: Planes
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
