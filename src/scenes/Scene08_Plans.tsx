import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

const PLAN_ACCENTS: Record<string, string> = {
  normal: '#00d2ff',
  duo: '#8b5cf6',
  trimestral: '#6366f1',
  dias3: '#22d3ee',
};

function PlatePriceVisual({ price, accent }: { price: string; accent: string }) {
  return (
    <div className="relative w-16 h-16 mb-4 mx-auto">
      {/* Outer ring — big plate */}
      <div
        className="absolute inset-0 rounded-full border-4"
        style={{ borderColor: `${accent}30` }}
      />
      {/* Middle ring */}
      <div
        className="absolute inset-2 rounded-full border-2"
        style={{ borderColor: `${accent}60` }}
      />
      {/* Inner circle — center hole */}
      <div
        className="absolute inset-[10px] rounded-full flex items-center justify-center"
        style={{
          background: `${accent}15`,
          border: `1.5px solid ${accent}`,
        }}
      >
        <span className="text-[8px] font-black text-white leading-none text-center">
          Bs
        </span>
      </div>
    </div>
  );
}

export function Scene08_Plans() {
  const { goNext } = usePresentation();
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.plan-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050608] px-6 md:px-16 lg:px-24 py-20 pb-28">
      {/* Blue radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,102,255,0.07) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00d2ff]">
            08 / 09 · Planes
          </span>
        </div>
        <h2 className="font-black uppercase text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          ¿CÓMO QUIERES{' '}
          <span className="text-gradient-electric">EMPEZAR?</span>
        </h2>
        <p className="text-white/40 text-base mt-2">
          Cada persona tiene su ritmo. Elige el que se adapta a ti.
        </p>
      </div>

      {/* Plans grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mb-10"
      >
        {KEVIN_DATA.plans.map((plan, i) => {
          const accent = PLAN_ACCENTS[plan.id] ?? '#00d2ff';
          const isActive = activePlan === i;
          return (
            <div
              key={plan.id}
              onClick={() => setActivePlan(isActive ? null : i)}
              className={[
                'plan-card relative rounded-2xl p-5 cursor-pointer transition-all duration-300',
                isActive ? 'glass-panel-active scale-[1.02]' : 'glass-panel hover:scale-[1.01] hover:border-white/15',
              ].join(' ')}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: accent, color: '#050608' }}
                >
                  Más Popular
                </div>
              )}

              {/* Plate visual */}
              <PlatePriceVisual price={plan.price} accent={accent} />

              {/* Plan name */}
              <h3 className="font-black text-white text-xs uppercase tracking-widest text-center mb-2 leading-tight">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-1">
                <span className="font-black text-3xl" style={{ color: accent }}>
                  {plan.price}
                </span>
                <span className="text-white/60 text-sm font-medium ml-1">{plan.currency}</span>
              </div>
              <div className="text-white/30 text-[10px] text-center mb-3">{plan.period}</div>

              {/* Subtitle */}
              <p className="text-white/50 text-[11px] text-center leading-snug mb-3">{plan.subtitle}</p>

              {/* Expanded features */}
              {isActive && (
                <div className="border-t border-white/10 pt-3 mt-2 space-y-2">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <CheckCircle size={12} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                      <span className="text-white/60 text-[11px] leading-snug">{f}</span>
                    </div>
                  ))}
                  <a
                    href={KEVIN_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${accent} 0%, #8b5cf6 100%)` }}
                  >
                    <MessageCircle size={12} />
                    Elegir este plan
                  </a>
                </div>
              )}

              {!isActive && (
                <div
                  className="text-[10px] text-center uppercase tracking-widest mt-1"
                  style={{ color: `${accent}80` }}
                >
                  Ver detalles
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Nav */}
      <div className="relative z-10">
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#00d2ff] hover:text-white transition-colors group w-fit"
        >
          Siguiente: Empezar
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
