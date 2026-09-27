import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { ShieldCheck, Zap, TrendingUp, Target, Heart, Sliders } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  Heart,
  Sliders
};

export const ValuesSection: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#070709] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full">
            Valores de Marca
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mt-4 mb-4">
            PRINCIPIOS <span className="text-gradient-crimson">INNEGOCIABLES.</span>
          </h2>
          <p className="text-sm text-[#a1a1b5] leading-relaxed">
            Los 6 pilares que guían la relación de entrenamiento entre Kevin y cada uno de sus clientes.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KEVIN_DATA.values.map((item, idx) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;

            return (
              <div
                key={item.title}
                className="group relative rounded-3xl bg-[#0c0c12] border border-white/10 p-8 hover:border-[#ff003c]/50 hover:bg-[#12121a] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Number Accent */}
                <span className="absolute top-4 right-6 font-display font-black text-5xl text-white/5 group-hover:text-[#ff003c]/15 transition-colors">
                  0{idx + 1}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#181824] border border-white/10 group-hover:border-[#ff003c] group-hover:bg-[#ff003c] text-white flex items-center justify-center mb-6 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff003c] block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-display font-bold text-2xl text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#a1a1b5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#71717a]">
                  <span>Pilar 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#ff003c] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
