import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { MessageSquare, ArrowUpRight, Instagram, Video } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-32 bg-[#050507] border-t border-white/5 overflow-hidden">
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <GymCanvas sceneType="footer" />
      </div>

      {/* Atmospheric Volumetric Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#ff003c]/25 via-[#ff0055]/15 to-transparent blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <span className="text-xs uppercase font-mono font-bold tracking-[0.3em] text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/30 px-4 py-1.5 rounded-full inline-block mb-6 shadow-lg">
          ¿Listo para empezar?
        </span>

        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight mb-6">
          READY TO BUILD YOUR <br />
          <span className="text-gradient-crimson">BEST VERSION?</span>
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1b5] max-w-xl mx-auto mb-10 font-light leading-relaxed">
          No dejes tu progreso para después. Empieza hoy tu proceso personalizado con Kevin Nefi.
        </p>

        {/* Primary WhatsApp Direct CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href={KEVIN_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-10 py-5 rounded-2xl text-base font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff003c] via-[#e60033] to-[#990022] shadow-[0_0_40px_rgba(255,0,60,0.6)] hover:shadow-[0_0_60px_rgba(255,0,60,0.9)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            <span>ENVIAR MENSAJE A WHATSAPP</span>
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a
            href={KEVIN_DATA.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101018] border border-white/10 hover:border-[#ff003c]/50 text-xs font-semibold text-white transition-all hover:scale-105"
          >
            <Instagram className="w-4 h-4 text-[#ff003c]" />
            <span>Instagram: {KEVIN_DATA.socials.instagram.handle}</span>
          </a>

          <a
            href={KEVIN_DATA.socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101018] border border-white/10 hover:border-[#ff003c]/50 text-xs font-semibold text-white transition-all hover:scale-105"
          >
            <Video className="w-4 h-4 text-[#ff003c]" />
            <span>TikTok: {KEVIN_DATA.socials.tiktok.handle}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
