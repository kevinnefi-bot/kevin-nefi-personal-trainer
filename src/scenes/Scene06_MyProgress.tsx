import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

const FEATURES = [
  'Rutinas personalizadas estructuradas por semanas',
  'Guía nutricional alineada a tus objetivos',
  'Registro de evolución y fuerza',
  'Seguimiento directo con Kevin',
];

// CSS-only phone mockup with mock app UI
function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div
        className="absolute"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,255,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Phone shell */}
      <div
        className="relative phone-float"
        style={{
          width: '260px',
          height: '520px',
          borderRadius: '36px',
          border: '3px solid #1a2540',
          background: 'linear-gradient(180deg, #07090f 0%, #0a1020 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 40px rgba(0,210,255,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: '80px', height: '20px', borderRadius: '10px', background: '#0d1525' }} />
        </div>

        {/* Screen */}
        <div className="px-3 pb-3 h-full overflow-hidden">
          {/* App header */}
          <div className="flex items-center justify-between py-2 mb-3">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">MyProgress</div>
              <div className="text-xs text-white font-bold">Kevin Nefi</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[9px] text-green-400">Online</span>
            </div>
          </div>

          {/* Routine card */}
          <div className="rounded-xl bg-[#111827] p-3 mb-2.5 border border-white/5">
            <div className="text-[9px] text-[#00d2ff] uppercase tracking-widest mb-2">Semana 1 · Día 3</div>
            <div className="space-y-1.5">
              {[
                { ex: 'Press Banca', sets: '4×10' },
                { ex: 'Jalón al Pecho', sets: '3×12' },
                { ex: 'Remo con Barra', sets: '3×10' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70">{r.ex}</span>
                  <span className="text-[10px] text-[#00d2ff] font-mono font-bold">{r.sets}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition card */}
          <div className="rounded-xl bg-[#111827] p-3 mb-2.5 border border-white/5">
            <div className="text-[9px] text-[#8b5cf6] uppercase tracking-widest mb-2">Nutrición · Hoy</div>
            <div className="space-y-1.5">
              {[
                { meal: 'Desayuno', kcal: '480 kcal' },
                { meal: 'Almuerzo', kcal: '720 kcal' },
                { meal: 'Pre-entreno', kcal: '310 kcal' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/60">{m.meal}</span>
                  <span className="text-[10px] text-white/50 font-mono">{m.kcal}</span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[72%] rounded-full" style={{ background: 'linear-gradient(to right, #00d2ff, #8b5cf6)' }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-white/30">1,510 / 2,100 kcal</span>
              <span className="text-[8px] text-[#00d2ff]">72%</span>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex justify-around pt-2 border-t border-white/5">
            {['📋', '🥗', '📈', '👤'].map((icon, i) => (
              <div
                key={i}
                className={[
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm',
                  i === 0 ? 'bg-[#00d2ff]/15' : '',
                ].join(' ')}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Scene06_MyProgress() {
  const { goNext } = usePresentation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.anim-el');
    gsap.fromTo(els, { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.1 });
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#030407] pb-20">
      {/* Deep dark bg radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 50%, rgba(0,102,255,0.08) 0%, transparent 70%)' }}
      />

      {/* LEFT — content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-20 md:pt-0 w-full md:w-[45%]"
      >
        {/* Eyebrow */}
        <div className="anim-el flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00d2ff]">
            06 / 09 · MyProgress
          </span>
        </div>

        {/* Beta badge */}
        <div className="anim-el mb-4">
          <span className="glass-panel rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-[#8b5cf6]/40 text-[#8b5cf6]">
            ✦ Functional Beta
          </span>
        </div>

        {/* Title */}
        <h2 className="anim-el font-black uppercase leading-[0.9] mb-6">
          <span className="block text-white text-4xl md:text-5xl">TU PROGRESO.</span>
          <span className="block text-gradient-electric text-4xl md:text-5xl">EN TUS MANOS.</span>
        </h2>

        {/* Description */}
        <p className="anim-el text-white/55 text-base leading-relaxed max-w-sm mb-6">
          Espacio digital de seguimiento diseñado para estructurar y monitorear el proceso real de cada cliente.
        </p>

        {/* Features */}
        <ul className="anim-el space-y-3 mb-8">
          {FEATURES.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle size={16} className="text-[#00d2ff] flex-shrink-0 mt-0.5" />
              <span className="text-white/65 text-sm leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="anim-el flex flex-col gap-3">
          <a
            href={KEVIN_DATA.myProgress.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-widest"
            style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 50%, #8b5cf6 100%)' }}
          >
            Conocer MyProgress
            <ExternalLink size={14} />
          </a>

          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#00d2ff] hover:text-white transition-colors group w-fit"
          >
            Siguiente: Mi Filosofía
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* RIGHT — phone mockup */}
      <div className="relative z-10 flex items-center justify-center w-full md:w-[55%] py-12 md:py-0 px-8">
        <PhoneMockup />
      </div>

      {/* Phone float animation */}
      <style>{`
        @keyframes phone-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .phone-float {
          animation: phone-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
