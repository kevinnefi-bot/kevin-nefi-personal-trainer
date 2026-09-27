import React from 'react';
import { Dumbbell, Instagram, Video, MessageSquare, ArrowUpRight } from 'lucide-react';
import { KEVIN_DATA } from '../../data/kevinData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#040507] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Accent Ambient Glow in Electric Blue and Violet */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-[#0066ff]/15 via-[#8b5cf6]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f1422] border border-white/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#00d2ff]" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                KEVIN NEFI
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed">
              Personal Trainer enfocado en entrenamientos realistas, personalizados y sostenibles. Construye tu mejor versión con seguimiento constante.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-3.5 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
              Sedes: Makina 1 & Makina 2 | Personalizado
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">Navegación</h4>
            <a href="#hero" className="text-xs text-[#94a3b8] hover:text-[#00d2ff] transition-colors">Inicio</a>
            <a href="#method" className="text-xs text-[#94a3b8] hover:text-[#00d2ff] transition-colors">Método</a>
            <a href="#services" className="text-xs text-[#94a3b8] hover:text-[#00d2ff] transition-colors">Servicios</a>
            <a href="#myprogress" className="text-xs text-[#94a3b8] hover:text-[#00d2ff] transition-colors">MyProgress (Beta)</a>
            <a href="#plans" className="text-xs text-[#94a3b8] hover:text-[#00d2ff] transition-colors">Planes & Tarifas</a>
          </div>

          {/* Socials & Direct Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">Redes & Contacto</h4>
            
            <a
              href={KEVIN_DATA.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#090d16] border border-white/5 hover:border-[#0066ff]/50 text-xs text-[#cbd5e1] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#8b5cf6]" />
                <span>{KEVIN_DATA.socials.instagram.handle}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={KEVIN_DATA.socials.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#090d16] border border-white/5 hover:border-[#0066ff]/50 text-xs text-[#cbd5e1] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#00d2ff]" />
                <span>{KEVIN_DATA.socials.tiktok.handle}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={KEVIN_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#090d16] border border-white/5 hover:border-[#0066ff]/50 text-xs text-[#cbd5e1] hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0066ff]" />
                <span>+{KEVIN_DATA.phoneDisplay}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748b] gap-4">
          <p>© 2026 Kevin Nefi. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#94a3b8]">MyProgress: <strong className="text-[#00d2ff]">Functional Beta</strong></span>
            <span>•</span>
            <span>Diseño & Experiencia 3D Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
