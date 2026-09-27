import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HelpCircle, Dumbbell, UtensilsCrossed, Calendar, ArrowRight } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { usePresentation } from '../engine/usePresentation';

const PROBLEMS = [
  {
    icon: HelpCircle,
    problem: '"No sé qué hacer."',
    hint: 'Equipamiento por todos lados, sin un plan.',
    color: '#00d2ff',
  },
  {
    icon: Dumbbell,
    problem: '"No sé si lo estoy haciendo bien."',
    hint: 'La técnica importa más de lo que crees.',
    color: '#8b5cf6',
  },
  {
    icon: UtensilsCrossed,
    problem: '"No sé qué comer."',
    hint: 'La nutrición hace la diferencia real.',
    color: '#00d2ff',
  },
  {
    icon: Calendar,
    problem: '"Empiezo y luego dejo de hacerlo."',
    hint: 'La constancia supera al talento.',
    color: '#8b5cf6',
  },
];

export function Scene03_Problem() {
  const { goNext } = usePresentation();
  const topRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      gsap.fromTo(topRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.problem-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    }
    if (bottomRef.current) {
      gsap.fromTo(bottomRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050608] px-6 md:px-16 lg:px-24 py-20 pb-28">
      {/* Violet tint bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Ambient 3D scene */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-25">
        <GymCanvas sceneType="problem" className="w-full h-full" />
      </div>

      {/* TOP title */}
      <div ref={topRef} className="relative z-10 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#8b5cf6]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8b5cf6]">
            03 / 09 · El Problema
          </span>
        </div>
        <h2 className="font-black uppercase text-4xl md:text-5xl lg:text-6xl text-white leading-[0.9] max-w-2xl">
          ¿NO SABES POR DÓNDE{' '}
          <span className="text-gradient-violet">EMPEZAR?</span>
        </h2>
      </div>

      {/* Problem cards grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-3xl"
      >
        {PROBLEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="problem-card glass-panel rounded-2xl p-5 border border-white/5 hover:border-[#00d2ff]/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}15` }}
                >
                  <Icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-snug mb-1.5">
                    {item.problem}
                  </p>
                  <p className="text-white/40 text-xs italic leading-relaxed">{item.hint}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transform moment */}
      <div ref={bottomRef} className="relative z-10 max-w-3xl">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00d2ff]/40 to-transparent mb-8" />
        <p className="font-black uppercase text-3xl md:text-4xl lg:text-5xl text-gradient-electric leading-tight mb-3">
          NO TIENE POR QUÉ SER COMPLICADO.
        </p>
        <p className="text-white/50 text-base mb-7">Kevin lo hace simple.</p>
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#00d2ff] hover:text-white transition-colors group w-fit"
        >
          Ver cómo trabajo
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
