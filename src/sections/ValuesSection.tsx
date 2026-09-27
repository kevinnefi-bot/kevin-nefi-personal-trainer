import React, { useState } from 'react';

export const ValuesSection: React.FC = () => {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      word: "HONESTY",
      spanish: "HONESTIDAD",
      desc: "Sin fórmulas mágicas ni promesas vacías. Resultados tangibles basados en trabajo duro y real.",
      color: "#00d2ff"
    },
    {
      word: "DISCIPLINE",
      spanish: "DISCIPLINA",
      desc: "El compromiso de presentarte y dar lo mejor de ti, especialmente los días en que no tienes ganas.",
      color: "#0066ff"
    },
    {
      word: "CONSISTENCY",
      spanish: "CONSISTENCIA",
      desc: "No se trata de entrenar 4 horas un día, sino de sostener el esfuerzo durante semanas y meses.",
      color: "#38bdf8"
    },
    {
      word: "COMMITMENT",
      spanish: "COMPROMISO",
      desc: "Tu dedicación alineada con mi guía técnica constante en cada paso del camino.",
      color: "#818cf8"
    },
    {
      word: "RESPECT",
      spanish: "RESPETO",
      desc: "Respetamos tus tiempos, tu punto de partida y tu ritmo de evolución sin comparaciones externas.",
      color: "#a855f7"
    },
    {
      word: "PERSONALIZATION",
      spanish: "PERSONALIZACIÓN",
      desc: "Cada persona es un mundo. Diseñamos el plan exclusivamente para tu cuerpo y tus objetivos.",
      color: "#c084fc"
    }
  ];

  return (
    <section className="relative py-36 bg-[#050608] border-t border-white/5 overflow-hidden">
      
      {/* Dynamic Background Backlight responding to active value */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[170px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: `${values[activeValue].color}18` }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            Pilares Fundamentales
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
            CORE <span className="text-gradient-electric">VALUES.</span>
          </h2>
        </div>

        {/* Vertical Interactive Typography Experience */}
        <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-10">
          {values.map((v, idx) => {
            const isActive = activeValue === idx;

            return (
              <div
                key={v.word}
                onMouseEnter={() => setActiveValue(idx)}
                onClick={() => setActiveValue(idx)}
                className={`cursor-pointer transition-all duration-500 text-center select-none group w-full ${
                  isActive
                    ? 'scale-105 sm:scale-115 opacity-100 blur-none'
                    : 'scale-90 sm:scale-95 opacity-30 hover:opacity-70 blur-[1px]'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className={`font-mono text-xs font-bold transition-colors ${isActive ? 'text-[#00d2ff]' : 'text-transparent'}`}>
                    0{idx + 1}
                  </span>
                  
                  <h3
                    className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight transition-all duration-500"
                    style={{
                      color: isActive ? '#ffffff' : '#64748b',
                      textShadow: isActive ? `0 0 40px ${v.color}88` : 'none',
                      letterSpacing: isActive ? '0.02em' : '-0.02em'
                    }}
                  >
                    {v.word}
                  </h3>
                </div>

                {/* Subtitle & description expanded on active */}
                {isActive && (
                  <div className="mt-3 max-w-md mx-auto animate-fadeIn">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00d2ff] block mb-1">
                      {v.spanish}
                    </span>
                    <p className="text-xs sm:text-sm text-[#94a3b8] font-light leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
