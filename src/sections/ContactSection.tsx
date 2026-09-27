import { useEffect, useRef } from 'react';
import { MessageCircle, Instagram, Video, ArrowUpRight } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { KEVIN_DATA } from '../data/kevinData';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050608]"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <GymCanvas sceneType="footer" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050608] via-transparent to-[#050608]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050608]/80 via-transparent to-[#050608]/80" />

      {/* Electric blue radial glow */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,210,255,0.08) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center contact-content"
        style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00d2ff]" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00d2ff]">
            Empezar es simple
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#00d2ff]" />
        </div>

        {/* Main Headline */}
        <h2 className="font-black uppercase leading-none mb-6 text-5xl md:text-7xl lg:text-8xl">
          <span className="block text-gradient-electric">READY TO</span>
          <span className="block text-white">BUILD YOUR</span>
          <span className="block text-gradient-violet">BEST VERSION?</span>
        </h2>

        {/* Subline */}
        <p className="text-lg md:text-xl text-white/60 font-light tracking-wide mb-12 max-w-xl mx-auto">
          Empezá tu proceso con{' '}
          <span className="text-white font-medium">Kevin Nefi.</span>
          <br />
          Una sola conversación puede cambiar todo.
        </p>

        {/* Primary CTA — WhatsApp */}
        <a
          href={KEVIN_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg uppercase tracking-widest overflow-hidden mb-6 mx-auto"
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 50%, #8b5cf6 100%)',
          }}
        >
          {/* Shine sweep */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
            }}
          />
          <MessageCircle size={22} className="relative z-10" />
          <span className="relative z-10">Escribirme por WhatsApp</span>
          <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
        </a>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px flex-1 max-w-[80px] bg-white/10" />
          <span className="text-xs text-white/30 tracking-widest uppercase">o encontrame en</span>
          <div className="h-px flex-1 max-w-[80px] bg-white/10" />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Instagram */}
          <a
            href={KEVIN_DATA.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 hover:border-[#00d2ff]/50 bg-white/[0.03] hover:bg-[#00d2ff]/5 transition-all duration-300"
          >
            <Instagram
              size={18}
              className="text-white/50 group-hover:text-[#00d2ff] transition-colors duration-300"
            />
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
              {KEVIN_DATA.socials.instagram.handle}
            </span>
          </a>

          {/* TikTok */}
          <a
            href={KEVIN_DATA.socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 hover:border-[#8b5cf6]/50 bg-white/[0.03] hover:bg-[#8b5cf6]/5 transition-all duration-300"
          >
            <Video
              size={18}
              className="text-white/50 group-hover:text-[#8b5cf6] transition-colors duration-300"
            />
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
              {KEVIN_DATA.socials.tiktok.handle}
            </span>
          </a>
        </div>

        {/* Footnote */}
        <p className="mt-12 text-xs text-white/20 tracking-widest uppercase">
          Entrena en Makina 1 &amp; Makina 2 · Santa Cruz, Bolivia
        </p>
      </div>

      {/* Inline animation style */}
      <style>{`
        .contact-content.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
