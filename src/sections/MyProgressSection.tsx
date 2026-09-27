import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { ArrowUpRight, Smartphone, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PhoneMockup3D } from '../components/3d/PhoneMockup3D';
import { Canvas } from '@react-three/fiber';

export const MyProgressSection: React.FC = () => {
  return (
    <section id="myprogress" className="relative py-28 bg-[#07070a] border-t border-white/5 overflow-hidden">
      
      {/* Intense Crimson Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#ff003c]/20 via-[#ff0055]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff003c]/10 border border-[#ff003c]/30 text-xs font-mono font-bold uppercase tracking-widest text-[#ff003c] mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{KEVIN_DATA.myProgress.statusBadge}</span>
            </div>

            <h2 className="font-display text-xs uppercase font-bold tracking-[0.3em] text-[#a1a1b5] mb-2">
              {KEVIN_DATA.myProgress.subtitle}
            </h2>

            <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-6">
              YOUR PROGRESS. <br />
              <span className="text-gradient-crimson">IN YOUR HANDS.</span>
            </h3>

            <p className="text-sm sm:text-base text-[#a1a1b5] leading-relaxed mb-8">
              {KEVIN_DATA.myProgress.description}
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3 mb-8">
              {KEVIN_DATA.myProgress.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ff003c]/20 border border-[#ff003c]/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff003c]" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Beta Disclaimer & Configurable Link CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={KEVIN_DATA.myProgress.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff003c] to-[#990022] shadow-[0_0_30px_rgba(255,0,60,0.4)] hover:shadow-[0_0_45px_rgba(255,0,60,0.7)] transition-all duration-300"
              >
                <span>EXPLORE MYPROGRESS</span>
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-[11px] text-[#71717a] px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <ShieldAlert className="w-4 h-4 text-[#ff003c] shrink-0" />
                <span>Plataforma en versión Beta activa para clientes.</span>
              </div>
            </div>

          </div>

          {/* Right 3D Smartphone Interactive Mockup */}
          <div className="lg:col-span-6 h-[450px] sm:h-[550px] relative flex items-center justify-center">
            
            {/* Ambient Backlight */}
            <div className="absolute w-[280px] h-[400px] rounded-full bg-[#ff003c]/25 blur-[90px] pointer-events-none" />

            <div className="w-full h-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-3, -2, 2]} intensity={2.0} color="#ff003c" />
                
                <PhoneMockup3D position={[0, 0, 0]} />
              </Canvas>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
