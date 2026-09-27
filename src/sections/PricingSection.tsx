import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { Check, ArrowRight, Zap } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="plans" className="relative py-28 bg-[#09090d] border-t border-white/5 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#ff003c]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full">
            Planes & Inversión
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight mt-4 mb-4">
            PLANES DE <span className="text-gradient-crimson">ENTRENAMIENTO.</span>
          </h2>
          <p className="text-sm text-[#a1a1b5] leading-relaxed">
            Tarifas transparentes adaptadas a tus metas. Sin costos ocultos ni letras chicas.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {KEVIN_DATA.plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#161622] via-[#101018] to-[#0a0a0f] border-2 border-[#ff003c] shadow-[0_0_40px_rgba(255,0,60,0.3)] scale-[1.03] z-10'
                  : 'bg-[#0c0c12] border border-white/10 hover:border-white/30 hover:bg-[#101018]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff003c] to-[#990022] text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Más Recomendado</span>
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-lg text-white mb-1 uppercase tracking-wider">
                  {plan.name}
                </h3>
                <p className="text-xs text-[#a1a1b5] mb-6 font-light">
                  {plan.subtitle}
                </p>

                {/* Big Price Display */}
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                  <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight group-hover:text-[#ff003c] transition-colors">
                    {plan.price}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-xl text-[#ff003c]">
                      {plan.currency}
                    </span>
                    {plan.period && (
                      <span className="text-[10px] text-[#71717a] font-mono">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#d0d0dc]">
                      <Check className="w-4 h-4 text-[#ff003c] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking CTA Button */}
              <a
                href={`https://wa.me/59176438793?text=Hola%20Kevin,%20quiero%20informaci%C3%B3n%20sobre%20el%20${encodeURIComponent(plan.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[#ff003c] hover:bg-[#ff1a4f] text-white shadow-[0_0_20px_#ff003c]'
                    : 'bg-[#181824] hover:bg-white hover:text-black text-white border border-white/10'
                }`}
              >
                <span>SELECCIONAR PLAN</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>
          ))}
        </div>

        {/* Custom arrangement note */}
        <div className="mt-12 text-center text-xs text-[#71717a]">
          <p>* Entrenamientos disponibles en Makina 1, Makina 2 o traslado a otros gimnasios previa coordinación.</p>
        </div>

      </div>
    </section>
  );
};
