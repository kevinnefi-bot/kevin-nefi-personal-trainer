import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

// Visual representation per service index
function ServiceVisual({ index }: { index: number }) {
  if (index === 0) {
    // Evaluación — body measurement graphic
    return (
      <div className="w-full h-52 flex items-center justify-center relative rounded-2xl overflow-hidden glass-panel border border-white/10">
        <div className="flex flex-col items-center gap-3">
          {/* Stylized body silhouette */}
          <div className="relative w-16 h-28">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#00d2ff]/80 bg-[#00d2ff]/20" />
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-10 h-14 rounded-lg border-2 border-[#00d2ff]/60 bg-[#00d2ff]/10" />
            <div className="absolute top-[52px] left-0 w-4 h-10 rounded-full border border-[#8b5cf6]/60 bg-[#8b5cf6]/10" />
            <div className="absolute top-[52px] right-0 w-4 h-10 rounded-full border border-[#8b5cf6]/60 bg-[#8b5cf6]/10" />
            <div className="absolute bottom-0 left-2 w-4 h-8 rounded-full border border-[#00d2ff]/40 bg-[#00d2ff]/10" />
            <div className="absolute bottom-0 right-2 w-4 h-8 rounded-full border border-[#00d2ff]/40 bg-[#00d2ff]/10" />
          </div>
          {/* Measurement indicators */}
          <div className="flex gap-4 text-xs text-[#00d2ff]">
            <span className="flex items-center gap-1.5 font-mono">
              <div className="w-6 h-px bg-[#00d2ff]" />
              DIAGNÓSTICO INICIAL
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Entrenamiento — Gym focus visual
    return (
      <div className="w-full h-52 rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-3">🏋️‍♂️</div>
        <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">Hipertrofia & Fuerza</div>
        <div className="text-xs text-white/50">Makina 1, Makina 2 o a domicilio</div>
      </div>
    );
  }

  if (index === 2) {
    // Nutrición — food icons grid
    const foods = [
      { e: '🍗', n: 'Proteína' },
      { e: '🥦', n: 'Micros' },
      { e: '🍚', n: 'Energía' },
      { e: '🥑', n: 'Grasas' },
      { e: '💧', n: 'Agua' },
      { e: '🍎', n: 'Fibra' },
    ];
    return (
      <div className="w-full h-52 rounded-2xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {foods.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{f.e}</span>
              <span className="text-[11px] text-white/60 font-medium">{f.n}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (index === 3) {
    // Seguimiento — calendar grid
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const checked = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26];
    return (
      <div className="w-full h-52 rounded-2xl glass-panel border border-white/10 p-5 overflow-hidden">
        <div className="text-xs text-white/50 uppercase tracking-widest mb-3 font-semibold">Registro de constancia</div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => (
            <div
              key={d}
              className={[
                'w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold transition-colors',
                checked.includes(d)
                  ? 'bg-[#00d2ff]/25 text-[#00d2ff] border border-[#00d2ff]/50'
                  : 'bg-white/[0.03] text-white/20 border border-white/5',
              ].join(' ')}
            >
              {checked.includes(d) ? '✓' : d}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // index === 4: MyProgress
  return (
    <div className="w-full h-52 rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-4xl mb-3">📱</div>
      <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">MyProgress Beta</div>
      <div className="text-xs text-[#00d2ff] font-mono">App de control en tiempo real</div>
    </div>
  );
}

export function Scene05_Services() {
  const { goNext } = usePresentation();
  const [activeService, setActiveService] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.service-btn');
      gsap.fromTo(items, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(detailRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
    }
  }, [activeService]);

  const service = KEVIN_DATA.services[activeService];

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden pb-20">
      {/* Readability gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,6,8,0.95) 0%, rgba(5,6,8,0.85) 50%, rgba(5,6,8,0.4) 100%)',
        }}
      />

      {/* LEFT — service list */}
      <div
        ref={listRef}
        className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-20 md:pt-0 w-full md:w-[42%]"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#8b5cf6]" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8b5cf6]">
              05 / 09 · Servicios
            </span>
          </div>
          <h2 className="font-black uppercase text-3xl md:text-4xl text-white leading-tight">
            ¿EN QUÉ PUEDO{' '}
            <span className="text-gradient-violet">AYUDARTE?</span>
          </h2>
        </div>

        <div className="space-y-2">
          {KEVIN_DATA.services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveService(i)}
              className={[
                'service-btn w-full text-left px-4 py-3 rounded-xl transition-all duration-250 group flex items-center gap-3',
                i === activeService
                  ? 'glass-panel-active border-l-2 border-[#8b5cf6]'
                  : 'hover:bg-white/[0.04] border-l-2 border-transparent glass-panel',
              ].join(' ')}
            >
              <span
                className={[
                  'text-xs font-mono font-bold w-7 flex-shrink-0',
                  i === activeService ? 'text-[#8b5cf6]' : 'text-white/30 group-hover:text-white/60',
                ].join(' ')}
              >
                {s.number}
              </span>
              <span
                className={[
                  'font-semibold text-sm uppercase tracking-wide transition-colors leading-tight',
                  i === activeService ? 'text-white' : 'text-white/50 group-hover:text-white/80',
                ].join(' ')}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#8b5cf6] hover:text-white transition-colors group w-fit"
        >
          Siguiente: MyProgress
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RIGHT — service detail */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-[58%] px-8 md:px-12 lg:px-16 py-10 md:py-20">
        <div ref={detailRef} className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 max-w-lg">
          {/* Service visual */}
          <ServiceVisual index={activeService} />

          {/* Service info */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="glass-panel rounded-full px-3.5 py-1 text-xs font-semibold text-[#8b5cf6] border border-[#8b5cf6]/40">
                {service?.tag}
              </span>
            </div>
            <h3 className="font-black uppercase text-2xl md:text-3xl text-white mb-3 leading-tight">
              {service?.title}
            </h3>
            <p className="text-white/65 text-base leading-relaxed">
              {service?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
