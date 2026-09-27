import React, { useState } from 'react';
import { ArrowRight, Zap, Check } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { WeightPlate3D } from '../components/3d/WeightPlate3D';

export const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);

  const plans = [
    {
      id: "normal",
      name: "PLAN NORMAL",
      price: "500",
      currency: "Bs",
      period: "por mes",
      subtitle: "Entrenamiento integral individual",
      features: [
        "Evaluación física inicial",
        "Rutina de entrenamiento personalizada",
        "Orientación nutricional adaptada",
        "Seguimiento personalizado continuo",
        "Acceso a MyProgress (Beta)"
      ],
      popular: true,
      accentColor: "#00d2ff"
    },
    {
      id: "duo",
      name: "PLAN 2 PERSONAS",
      price: "800",
      currency: "Bs",
      period: "por mes",
      subtitle: "Entrena en pareja o con un amigo",
      features: [
        "Evaluación física individualizada para ambos",
        "Planes adaptados a la meta de cada persona",
        "Orientación nutricional específica",
        "Motivación y seguimiento conjunto",
        "Acceso a MyProgress para ambos"
      ],
      popular: false,
      accentColor: "#8b5cf6"
    },
    {
      id: "trimestral",
      name: "PLAN 3 MESES",
      price: "1,200",
      currency: "Bs",
      period: "3 meses",
      subtitle: "Compromiso de mediano plazo",
      features: [
        "Planificación estratégica a 12 semanas",
        "Reevaluaciones mensuales de progreso",
        "Ajuste periódico de cargas y volumen",
        "Evolución continua y hábitos sólidos",
        "Acceso preferencial a MyProgress"
      ],
      popular: false,
      accentColor: "#0066ff"
    },
    {
      id: "dias3",
      name: "3 DÍAS / SEMANA",
      price: "300",
      currency: "Bs",
      period: "por mes",
      subtitle: "Ideal para iniciar o agendas ajustadas",
      features: [
        "3 sesiones semanales estructuradas",
        "Enfoque en ejercicios compuestos de alto estímulo",
        "Orientación práctica de alimentación",
        "Seguimiento semanal de evolución",
        "Acceso a MyProgress"
      ],
      popular: false,
      accentColor: "#38bdf8"
    }
  ];

  return (
    <section id="plans" className="relative py-32 bg-[#050608] border-t border-white/5 overflow-hidden">
      
      {/* Background Electric Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#0066ff]/15 via-[#8b5cf6]/10 to-transparent blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.25em] text-[#00d2ff] bg-[#0066ff]/10 border border-[#0066ff]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            Planes & Tarifas
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mb-4">
            MEMBERSHIP <span className="text-gradient-electric">PLANS.</span>
          </h2>
          <p className="text-sm text-[#94a3b8] font-light">
            Inversión clara y transparente para iniciar tu proceso.
          </p>
        </div>

        {/* 4 Interactive Plans Grid with 3D Plate representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const isSelected = selectedPlan === idx;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setSelectedPlan(idx)}
                onClick={() => setSelectedPlan(idx)}
                className={`cursor-pointer rounded-3xl p-7 flex flex-col justify-between transition-all duration-400 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#090e1a] border-2 border-[#0066ff] shadow-[0_0_40px_rgba(0,102,255,0.3)] scale-[1.03] z-10'
                    : 'bg-[#070a12]/70 border border-white/10 hover:border-white/20 hover:bg-[#080d18]'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] text-[10px] font-mono font-bold uppercase tracking-widest text-white flex items-center gap-1 shadow-[0_0_15px_rgba(0,102,255,0.5)]">
                    <Zap className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                )}

                <div>
                  {/* Mini 3D Weight Plate Canvas inside card */}
                  <div className="h-28 w-full mb-4 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
                      <ambientLight intensity={0.7} />
                      <directionalLight position={[3, 3, 3]} intensity={1.8} color="#ffffff" />
                      <pointLight position={[-2, -1, 2]} intensity={2.0} color={plan.accentColor} />
                      <WeightPlate3D
                        position={[0, 0, 0]}
                        rotation={[0.8, isSelected ? 0.6 : 0.2, 0]}
                        scale={0.55}
                        spinSpeed={isSelected ? 0.5 : 0.1}
                        accentColor={plan.accentColor}
                      />
                    </Canvas>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1 uppercase tracking-wide">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mb-5 font-light">
                    {plan.subtitle}
                  </p>

                  {/* Price Typography */}
                  <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-white/5">
                    <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                      {plan.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-lg text-[#00d2ff]">
                        {plan.currency}
                      </span>
                      <span className="text-[10px] text-[#64748b] font-mono">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                        <Check className="w-3.5 h-3.5 text-[#00d2ff] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action CTA */}
                <a
                  href={`https://wa.me/59176438793?text=Hola%20Kevin,%20quiero%20informaci%C3%B3n%20sobre%20el%20${encodeURIComponent(plan.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] text-white shadow-[0_0_25px_rgba(0,102,255,0.4)]'
                      : 'bg-[#0f1526] hover:bg-white hover:text-black text-white border border-white/10'
                  }`}
                >
                  <span>EMPEZAR MI PROCESO</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-[#64748b]">
          <p>* Entrenamientos disponibles en Makina 1, Makina 2 o traslado coordinado a otros gimnasios.</p>
        </div>

      </div>
    </section>
  );
};
