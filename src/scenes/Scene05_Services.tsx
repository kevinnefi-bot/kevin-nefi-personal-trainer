import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

// Visual representation per service index
function ServiceVisual({ index }: { index: number }) {
  if (index === 0) {
    // Evaluación — body measurement graphic
    return (
      <div className="w-full h-56 flex items-center justify-center relative rounded-2xl overflow-hidden bg-[#0a0d14] border border-white/5">
        <div className="flex flex-col items-center gap-3">
          {/* Stylized body silhouette made with CSS */}
          <div className="relative w-16 h-28">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#00d2ff]/60 bg-[#00d2ff]/10" />
            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-10 h-14 rounded-lg border-2 border-[#00d2ff]/40 bg-[#00d2ff]/5" />
            <div className="absolute top-[52px] left-0 w-4 h-10 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/5" />
            <div className="absolute top-[52px] right-0 w-4 h-10 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/5" />
            <div className="absolute bottom-0 left-2 w-4 h-8 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/5" />
            <div className="absolute bottom-0 right-2 w-4 h-8 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/5" />
          </div>
          {/* Measurement lines */}
          <div className="flex gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <div className="w-8 h-px bg-[#00d2ff]/40" />
              Punto inicial
            </span>
          </div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,210,255,0.05) 0%, transparent 70%)' }}
        />
      </div>
    );
  }

  if (index === 1) {
    // Entrenamiento — mini 3D canvas
    return (
      <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/5 relative">
        <GymCanvas sceneType="hero" className="w-full h-full" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0a0d14 0%, transparent 60%)' }}
        />
      </div>
    );
  }

  if (index === 2) {
    // Nutrición — food emojis grid
    const foods = ['🍗', '🥦', '🍚', '🍎', '🥚', '💧', '🥑', '🥝'];
    return (
      <div className="w-full h-56 rounded-2xl overflow-hidden bg-[#0a0d14] border border-white/5 flex items-center justify-center p-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          {foods.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{f}</span>
              <div className="w-4 h-0.5 bg-[#00d2ff]/20 rounded-full" />
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
      <div className="w-full h-56 rounded-2xl bg-[#0a0d14] border border-white/5 p-4 overflow-hidden">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Historial de sesiones</div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => (
            <div
              key={d}
              className={[
                'w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium transition-colors',
                checked.includes(d)
                  ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30'
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
    <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/5 relative">
      <GymCanvas sceneType="myprogress" className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-panel rounded-xl px-4 py-2 text-xs text-[#00d2ff] font-semibold tracking-widest uppercase border border-[#00d2ff]/20">
          MyProgress Beta
        </div>
      </div>
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
    <div className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#050608] pb-20">
      {/* Violet ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
      />

      {/* LEFT — service list */}
      <div
        ref={listRef}
        className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-20 md:pt-0 w-full md:w-[38%]"
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

        <div className="space-y-1.5">
          {KEVIN_DATA.services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveService(i)}
              className={[
                'service-btn w-full text-left px-4 py-3 rounded-xl transition-all duration-250 group flex items-center gap-3',
                i === activeService
                  ? 'glass-panel-active border-l-2 border-[#8b5cf6]'
                  : 'hover:bg-white/[0.03] border-l-2 border-transparent',
              ].join(' ')}
            >
              <span
                className={[
                  'text-xs font-mono font-bold w-7 flex-shrink-0',
                  i === activeService ? 'text-[#8b5cf6]' : 'text-white/25 group-hover:text-white/50',
                ].join(' ')}
              >
                {s.number}
              </span>
              <span
                className={[
                  'font-semibold text-sm uppercase tracking-wide transition-colors leading-tight',
                  i === activeService ? 'text-white' : 'text-white/40 group-hover:text-white/70',
                ].join(' ')}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#8b5cf6] hover:text-white transition-colors group w-fit"
        >
          Siguiente: MyProgress
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RIGHT — service detail */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-[62%] px-8 md:px-12 lg:px-16 py-10 md:py-20">
        <div ref={detailRef}>
          {/* Service visual */}
          <ServiceVisual index={activeService} />

          {/* Service info */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="glass-panel rounded-full px-3 py-1 text-xs font-semibold text-[#8b5cf6] border border-[#8b5cf6]/30">
                {service?.tag}
              </span>
            </div>
            <h3 className="font-black uppercase text-2xl md:text-3xl text-white mb-3 leading-tight">
              {service?.title}
            </h3>
            <p className="text-white/60 text-base leading-relaxed max-w-lg">
              {service?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
