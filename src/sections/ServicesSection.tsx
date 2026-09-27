import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { ArrowUpRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-28 bg-[#09090d] border-t border-white/5 overflow-hidden">
      
      {/* Radial Accent Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ff003c]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full">
            Servicios Principales
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight mt-4 mb-4">
            SERVICIOS <span className="text-gradient-crimson">ESPECIALIZADOS.</span>
          </h2>
          <p className="text-sm text-[#a1a1b5] leading-relaxed">
            Una propuesta integral diseñada para acompañar a principiantes, jóvenes y adultos en cada fase de su proceso físico.
          </p>
        </div>

        {/* Services List Editorial Cards */}
        <div className="space-y-6">
          {KEVIN_DATA.services.map((service) => (
            <div
              key={service.number}
              className="group relative rounded-3xl bg-[#0d0d14] border border-white/10 p-8 sm:p-10 hover:border-[#ff003c]/60 hover:bg-[#12121a] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Number */}
                <span className="font-display font-black text-4xl sm:text-6xl text-[#ff003c] group-hover:scale-110 transition-transform duration-300">
                  {service.number}
                </span>

                <div className="max-w-xl">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#a1a1b5] uppercase tracking-wider mb-2">
                    {service.tag}
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#ff003c] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#a1a1b5] mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Right CTA */}
              <div className="shrink-0">
                <a
                  href={KEVIN_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#181824] border border-white/10 text-white group-hover:bg-[#ff003c] group-hover:border-[#ff003c] group-hover:shadow-[0_0_20px_#ff003c] transition-all duration-300"
                  aria-label={`Consultar por ${service.title}`}
                >
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
