import React from 'react';
import { Dumbbell, Instagram, Video, MessageSquare, ArrowUpRight } from 'lucide-react';
import { KEVIN_DATA } from '../../data/kevinData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050507] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Accent Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#ff003c]/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#14141c] border border-white/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#ff003c]" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                KEVIN NEFI
              </span>
            </div>
            <p className="text-sm text-[#a1a1b5] max-w-sm leading-relaxed">
              Personal Trainer enfocado en entrenamientos realistas, personalizados y sostenibles. Construye tu mejor versión con seguimiento constante.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-pulse" />
              Sedes: Makina 1 & Makina 2 | Personalizado
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">Navegación</h4>
            <a href="#hero" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">Inicio</a>
            <a href="#philosophy" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">Filosofía</a>
            <a href="#method" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">Método</a>
            <a href="#services" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">Servicios</a>
            <a href="#myprogress" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">MyProgress (Beta)</a>
            <a href="#plans" className="text-xs text-[#a1a1b5] hover:text-[#ff003c] transition-colors">Planes & Tarifas</a>
          </div>

          {/* Socials & Direct Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">Redes & Contacto</h4>
            
            <a
              href={KEVIN_DATA.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0f0f15] border border-white/5 hover:border-[#ff003c]/50 text-xs text-[#d0d0dc] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#ff003c]" />
                <span>{KEVIN_DATA.socials.instagram.handle}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={KEVIN_DATA.socials.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0f0f15] border border-white/5 hover:border-[#ff003c]/50 text-xs text-[#d0d0dc] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#ff003c]" />
                <span>{KEVIN_DATA.socials.tiktok.handle}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={KEVIN_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0f0f15] border border-white/5 hover:border-[#ff003c]/50 text-xs text-[#d0d0dc] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#ff003c]" />
                <span>+{KEVIN_DATA.phoneDisplay}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717a] gap-4">
          <p>© 2026 Kevin Nefi. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#a1a1b5]">MyProgress: <strong className="text-[#ff003c]">Functional Beta</strong></span>
            <span>•</span>
            <span>Diseño & Desarrollo Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
