import React from 'react';
import { ArrowUpRight, Zap, Shield, MapPin, ChevronDown } from 'lucide-react';
import { KEVIN_DATA } from '../data/kevinData';
import { GymCanvas } from '../components/3d/GymCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#050608]">
      {/* 3D Background Canvas with Digital Character & Gym Objects */}
      <div className="absolute inset-0 z-0">
        <GymCanvas sceneType="hero" />
      </div>

      {/* Atmospheric Electric Blue & Violet Radial Lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#0066ff]/20 via-[#8b5cf6]/10 to-transparent blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-6rem)]">
        
        {/* Left Typography & CTA Column */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0f1d] border border-[#0066ff]/30 text-xs font-mono uppercase tracking-widest text-[#94a3b8] mb-6 shadow-[0_0_20px_rgba(0,102,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
            <Zap className="w-3.5 h-3.5 text-[#00d2ff]" />
            <span>Personal Trainer • 2 Años de Experiencia</span>
          </div>

          {/* Subtitle Tagline */}
          <h2 className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-[#00d2ff] mb-3">
            KEVIN NEFI — PERSONAL TRAINER
          </h2>

          {/* Headline Primary */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6">
            BUILD YOUR <br />
            <span className="text-gradient-electric">BEST VERSION.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mb-8 leading-relaxed font-light">
            Entrenamiento personalizado, seguimiento real y progreso sostenible. Construye una disciplina duradera sin complicaciones innecesarias.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href={KEVIN_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#0066ff] via-[#3b82f6] to-[#8b5cf6] shadow-[0_0_35px_rgba(0,102,255,0.5)] hover:shadow-[0_0_50px_rgba(0,210,255,0.7)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <span>EMPEZAR MI PROCESO</span>
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <a
              href="#problem"
              className="inline-flex items-center justify-center px-7 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider text-white bg-[#0e1424] border border-white/10 hover:border-[#0066ff]/50 hover:bg-[#141b30] transition-all duration-300 w-full sm:w-auto"
            >
              Conocer Más
            </a>
          </div>

          {/* Location details */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[#64748b] font-medium pt-6 border-t border-white/10 w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00d2ff]" />
              <span>Sedes: <strong className="text-white">Makina 1 & Makina 2</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8b5cf6]" />
              <span>Traslado a otros gimnasios disponible</span>
            </div>
          </div>
        </div>

        {/* Right 3D Viewport Spacer for Character Composition */}
        <div className="lg:col-span-5 h-[320px] lg:h-full relative pointer-events-none flex items-center justify-center">
          {/* Subtle mobile hint or space indicator */}
          <div className="hidden lg:block absolute bottom-8 right-4 text-right">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748b]">
              3D Digital Character • Interactive Canvas
            </span>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <a
        href="#problem"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#64748b] hover:text-[#00d2ff] transition-colors"
        aria-label="Scroll down"
      >
        <span className="tracking-widest uppercase font-mono text-[10px]">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
