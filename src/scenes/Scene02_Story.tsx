import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

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
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen flex overflow-hidden bg-[#050608]">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 70% at 20% 50%, rgba(0,102,255,0.09) 0%, transparent 70%)',
        }}
      />

      {/* LEFT — 3D Kevin character */}
      <div className="absolute left-0 top-0 w-full md:w-[45%] h-full pointer-events-none opacity-80">
        <GymCanvas sceneType="hero" className="w-full h-full" />
        {/* Character rim glow overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,210,255,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Fade to right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, transparent 60%, #050608 100%)',
          }}
        />
      </div>

      {/* RIGHT — Story content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center ml-auto w-full md:w-[55%] px-8 md:px-12 lg:px-20 py-20 pb-28"
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
        <div className="space-y-4 mb-8">
          {STORY_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="anim-el text-white/65 text-base md:text-lg font-light leading-relaxed border-l-2 border-[#00d2ff]/25 pl-4"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="anim-el flex flex-wrap gap-3 mb-10">
          {STATS.map((s, i) => (
            <div key={i} className="glass-panel rounded-full px-4 py-2 flex flex-col items-center">
              <span className="text-white font-bold text-sm">{s.value}</span>
              <span className="text-white/40 text-xs">{s.label}</span>
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

      {/* Mobile dark gradient over canvas */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(to bottom, #050608 0%, transparent 40%, #050608 100%)' }}
      />
    </div>
  );
}
