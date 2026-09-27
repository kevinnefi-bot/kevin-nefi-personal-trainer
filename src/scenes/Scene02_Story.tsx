import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';

const STORY_PARAGRAPHS = [
  'Tengo 22 años y llevo alrededor de 2 años entrenando.',
  'Con el tiempo entendí que entrenar no se trata solamente de levantar peso.',
  'También se trata de aprender, ser constante y encontrar un proceso que puedas mantener.',
  'Ese proceso es lo que comparto con cada persona que entrena conmigo.',
];

const STATS = [
  { value: '22', label: 'años' },
  { value: '~2 años', label: 'experiencia' },
  { value: 'Makina 1 & 2', label: 'entreno en' },
];

export function Scene02_Story() {
  const { goNext } = usePresentation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.anim-el');
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen flex overflow-hidden">
      {/* Readability gradient: Kevin is on the left in 3D world, text on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(5,6,8,0.94) 0%, rgba(5,6,8,0.85) 50%, rgba(5,6,8,0.2) 80%, transparent 100%)',
        }}
      />

      {/* RIGHT — Story content */}
      <div
        ref={contentRef}
        className="relative z-10 pointer-events-auto flex flex-col justify-center ml-auto w-full md:w-[58%] px-8 md:px-14 lg:px-20 py-20 pb-28"
      >
        {/* Eyebrow */}
        <div className="anim-el flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00d2ff]">
            02 / 09 · Mi Historia
          </span>
        </div>

        {/* Title */}
        <h2 className="anim-el font-black uppercase text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] mb-8">
          SOY KEVIN.
        </h2>

        {/* Story paragraphs */}
        <div className="space-y-4 mb-8 max-w-xl">
          {STORY_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="anim-el text-white/70 text-base md:text-lg font-light leading-relaxed border-l-2 border-[#00d2ff]/30 pl-4 glass-panel py-2 px-3 rounded-r-xl"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="anim-el flex flex-wrap gap-3 mb-10">
          {STATS.map((s, i) => (
            <div key={i} className="glass-panel rounded-full px-5 py-2.5 flex flex-col items-center border border-white/10">
              <span className="text-white font-bold text-base">{s.value}</span>
              <span className="text-white/40 text-xs tracking-wider uppercase">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Next CTA */}
        <button
          onClick={goNext}
          className="anim-el inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#00d2ff] hover:text-white transition-colors group w-fit"
        >
          Siguiente: El Problema
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
