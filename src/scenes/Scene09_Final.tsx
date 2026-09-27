import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageCircle, Instagram, Video, ArrowLeft } from 'lucide-react';
import { usePresentation } from '../engine/usePresentation';
import { KEVIN_DATA } from '../data/kevinData';

export function Scene09_Final() {
  const { goPrev } = usePresentation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.anim-el');
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.14, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Readability backdrop: Kevin is centered in 3D world right behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(5,6,8,0.7) 0%, rgba(5,6,8,0.85) 60%, rgba(5,6,8,0.95) 100%)',
        }}
      />

      {/* Back button */}
      <button
        onClick={goPrev}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/40 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors glass-panel px-4 py-2 rounded-full border border-white/10"
      >
        <ArrowLeft size={14} />
        Planes
      </button>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center py-20"
      >
        {/* Eyebrow */}
        <div className="anim-el flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.35em] uppercase text-[#00d2ff]">
            09 / 09 · Empezar
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#00d2ff]" />
        </div>

        {/* Kevin name */}
        <div className="anim-el text-xs tracking-[0.5em] text-white/40 uppercase mb-4 font-mono font-bold">
          Kevin Nefi · Personal Trainer
        </div>

        {/* Main headline */}
        <h2 className="anim-el font-black uppercase leading-[0.88] mb-6">
          <span className="block text-white text-5xl md:text-7xl">¿LISTO PARA</span>
          <span className="block text-gradient-electric text-5xl md:text-7xl">EMPEZAR?</span>
        </h2>

        {/* Body */}
        <p className="anim-el text-white/70 text-lg font-light leading-relaxed max-w-md mx-auto mb-10">
          Empieza tu proceso con{' '}
          <span className="text-white font-medium">Kevin Nefi.</span>
          <br />
          Una sola conversación puede cambiar todo.
        </p>

        {/* Primary WhatsApp CTA */}
        <a
          href={KEVIN_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="anim-el group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-base uppercase tracking-widest overflow-hidden mb-6 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 50%, #8b5cf6 100%)',
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)' }}
          />
          <MessageCircle size={20} className="relative z-10" />
          <span className="relative z-10">Empezar mi Proceso</span>
        </a>

        {/* Divider */}
        <div className="anim-el flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 max-w-[70px] bg-white/10" />
          <span className="text-[10px] text-white/30 tracking-widest uppercase font-semibold">o encuéntrame en</span>
          <div className="h-px flex-1 max-w-[70px] bg-white/10" />
        </div>

        {/* Social links */}
        <div className="anim-el flex items-center justify-center gap-3 flex-wrap">
          <a
            href={KEVIN_DATA.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-[#00d2ff]/60 bg-white/[0.04] hover:bg-[#00d2ff]/10 transition-all duration-300"
          >
            <Instagram size={16} className="text-white/50 group-hover:text-[#00d2ff] transition-colors" />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {KEVIN_DATA.socials.instagram.handle}
            </span>
          </a>
          <a
            href={KEVIN_DATA.socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-[#8b5cf6]/60 bg-white/[0.04] hover:bg-[#8b5cf6]/10 transition-all duration-300"
          >
            <Video size={16} className="text-white/50 group-hover:text-[#8b5cf6] transition-colors" />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {KEVIN_DATA.socials.tiktok.handle}
            </span>
          </a>
        </div>

        {/* Footnote */}
        <p className="anim-el mt-10 text-[11px] text-white/30 tracking-[0.3em] uppercase font-mono">
          Makina 1 & Makina 2 · Santa Cruz, Bolivia
        </p>
      </div>
    </div>
  );
}
