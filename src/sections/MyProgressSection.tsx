import React from 'react';
import { KEVIN_DATA } from '../data/kevinData';
import { ArrowUpRight, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PhoneMockup3D } from '../components/3d/PhoneMockup3D';
import { Canvas } from '@react-three/fiber';

export const MyProgressSection: React.FC = () => {
  return (
    <section id="myprogress" className="relative py-32 bg-[#050608] border-t border-white/5 overflow-hidden">
      
      {/* Electric Blue & Violet Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#0066ff]/20 via-[#8b5cf6]/15 to-transparent blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/30 text-xs font-mono font-bold uppercase tracking-widest text-[#00d2ff] mb-6 w-fit shadow-[0_0_20px_rgba(0,102,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{KEVIN_DATA.myProgress.statusBadge}</span>
            </div>

            <h2 className="font-display text-xs uppercase font-bold tracking-[0.3em] text-[#94a3b8] mb-2">
              MYPROGRESS PLATFORM
            </h2>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6">
              YOUR PROGRESS. <br />
              <span className="text-gradient-electric">IN YOUR HANDS.</span>
            </h3>

            <p className="text-base text-[#94a3b8] leading-relaxed mb-8 font-light">
              {KEVIN_DATA.myProgress.description}
            </p>

            {/* Feature Checklist - Authentic real app points */}
            <div className="space-y-3.5 mb-10">
              {KEVIN_DATA.myProgress.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0066ff]/20 border border-[#0066ff]/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff]" />
                  </div>
                  <span className="text-sm text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Beta Disclaimer & Configurable Link CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={KEVIN_DATA.myProgress.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_45px_rgba(0,210,255,0.7)] transition-all duration-300"
              >
                <span>EXPLORE MYPROGRESS</span>
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-[11px] text-[#64748b] px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10">
                <ShieldAlert className="w-4 h-4 text-[#00d2ff] shrink-0" />
                <span>Versión beta funcional para alumnos activos.</span>
              </div>
            </div>

          </div>

          {/* Right 3D Smartphone Interactive Mockup */}
          <div className="lg:col-span-6 h-[460px] sm:h-[560px] relative flex items-center justify-center">
            
            {/* Ambient Electric Backlight */}
            <div className="absolute w-[300px] h-[420px] rounded-full bg-gradient-to-tr from-[#0066ff]/25 to-[#8b5cf6]/20 blur-[100px] pointer-events-none" />

            <div className="w-full h-full">
              <Canvas camera={{ position: [0, 0, 4.8], fov: 40 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
                <directionalLight position={[-4, 2, -2]} intensity={3.0} color="#0066ff" />
                <pointLight position={[3, -2, 2]} intensity={2.2} color="#8b5cf6" />
                
                <PhoneMockup3D position={[0, 0, 0]} scale={1.25} />
              </Canvas>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
