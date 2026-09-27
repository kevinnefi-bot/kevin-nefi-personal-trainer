import React from 'react';
import { ArrowUpRight, Flame, Shield, MapPin } from 'lucide-react';
import { KEVIN_DATA } from '../data/kevinData';
import { GymCanvas } from '../components/3d/GymCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#070709]">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <GymCanvas sceneType="hero" />
      </div>

      {/* Atmospheric Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#ff003c]/20 via-[#ff0055]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Typography & CTA Column */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161620] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#a1a1b5] mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
            <Flame className="w-3.5 h-3.5 text-[#ff003c]" />
            <span>Personal Trainer • 2 Años de Experiencia</span>
          </div>

          {/* Subtitle Tagline */}
          <h2 className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-[#ff003c] mb-3">
            KEVIN NEFI — PERSONAL BRAND
          </h2>

          {/* Headline Primary */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6">
            BUILD YOUR <br />
            <span className="text-gradient-crimson">BEST VERSION.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-[#a1a1b5] max-w-xl mb-8 leading-relaxed font-light">
            Entrenamiento realista, personalizado y enfocado en progreso constante a largo plazo. Sin dietas extremas ni rutinas genéricas.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href={KEVIN_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff003c] via-[#e60033] to-[#990022] shadow-[0_0_35px_rgba(255,0,60,0.5)] hover:shadow-[0_0_50px_rgba(255,0,60,0.8)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <span>{KEVIN_DATA.hero.cta}</span>
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <a
              href="#philosophy"
              className="inline-flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-semibold uppercase tracking-wider text-white bg-[#12121a] border border-white/10 hover:border-[#ff003c]/50 hover:bg-[#1a1a26] transition-all duration-300 w-full sm:w-auto"
            >
              Ver Filosofía
            </a>
          </div>

          {/* Location details */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[#71717a] font-medium pt-6 border-t border-white/10 w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff003c]" />
              <span>Gimnasios: <strong className="text-white">Makina 1 & Makina 2</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ff003c]" />
              <span>Disponibilidad a Domicilio / Externa</span>
            </div>
          </div>
        </div>

        {/* Right Kevin Photo Cinematic Integration */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          
          {/* Crimson Aura Background Behind Photo */}
          <div className="absolute w-[300px] h-[400px] sm:w-[380px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#ff003c]/40 to-[#ff0055]/10 blur-[80px] -z-10 animate-pulse" />

          {/* Glass Image Container */}
          <div className="relative group w-full max-w-sm sm:max-w-md rounded-3xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
            
            {/* Kevin Real Photo */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0c0c12]">
              <img
                src="/assets/kevin-photo.jpg"
                alt="Kevin Nefi Personal Trainer"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 contrast-125 transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Rim Lighting Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff003c]/20 via-transparent to-transparent mix-blend-color-dodge opacity-60" />

              {/* Float Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#09090d]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-sm">KEVIN NEFI</h3>
                  <p className="text-[11px] text-[#a1a1b5]">22 Años • Entrenador Personal</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#ff003c]/20 border border-[#ff003c]/40 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#ff003c]" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
