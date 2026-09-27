import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { GymCanvas } from '../components/3d/GymCanvas';
import { usePresentation } from '../engine/usePresentation';

const METHOD_STEPS = [
  {
    step: '01',
    name: 'EVALUAR',
    description: 'Entender de dónde partes: historial, lesiones, nivel actual y metas reales.',
    visual: 'Punto de partida — medición y diagnóstico inicial.',
    icon: '📋',
  },
  {
    step: '02',
    name: 'PLANIFICAR',
    description: 'Diseñar una estrategia adaptada a tus tiempos, capacidades y disponibilidad.',
    visual: 'Plan personalizado con rutinas organizadas por semanas.',
    icon: '📅',
  },
  {
    step: '03',
    name: 'ENTRENAR',
    description: 'Ejecutar la rutina con técnica sólida, intensidad correcta y seguridad.',
    visual: 'Trabajo real con equipamiento — fuerza, técnica y progresión.',
    icon: '🏋️',
  },
  {
    step: '04',
    name: 'SEGUIR',
    description: 'Monitorear la evolución constante y verificar el cumplimiento.',
    visual: 'Seguimiento directo y continuo con Kevin.',
    icon: '📱',
  },
  {
    step: '05',
    name: 'AJUSTAR',
    description: 'Optimizar cargas, volumen y variables cuando el cuerpo se adapta.',
    visual: 'Ajuste estratégico de variables cuando el cuerpo evoluciona.',
    icon: '⚙️',
  },
  {
    step: '06',
    name: 'PROGRESAR',
    description: 'Mantener resultados a largo plazo con disciplina y consistencia.',
    visual: 'Progreso real y sostenible — paso a paso.',
    icon: '📈',
  },
];

export function Scene04_Method() {
  const { goNext } = usePresentation();
  const [activeStep, setActiveStep] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.step-item');
      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeStep]);

  const step = METHOD_STEPS[activeStep];

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#050608] pb-20">
      {/* Ambient 3D bg */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <GymCanvas sceneType="method" className="w-full h-full" />
      </div>

      {/* Blue radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(0,102,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* LEFT — Step list */}
      <div
        ref={listRef}
        className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-20 pt-20 md:pt-0 w-full md:w-[38%]"
      >
        {/* Eyebrow + title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00d2ff]" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00d2ff]">
              04 / 09 · Mi Método
            </span>
          </div>
          <h2 className="font-black uppercase text-3xl md:text-4xl text-white leading-tight">
            ASÍ{' '}
            <span className="text-gradient-electric">TRABAJAMOS.</span>
          </h2>
          <p className="text-white/40 text-sm mt-2">Selecciona cada etapa para explorarla.</p>
        </div>

        {/* Steps */}
        <div className="space-y-1">
          {METHOD_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={[
                'step-item w-full text-left px-4 py-3 rounded-xl transition-all duration-250 flex items-center gap-3 group',
                i === activeStep
                  ? 'glass-panel-active border-l-2 border-[#00d2ff]'
                  : 'hover:bg-white/[0.03] border-l-2 border-transparent',
              ].join(' ')}
            >
              <span
                className={[
                  'text-xs font-mono font-bold w-7 flex-shrink-0 transition-colors',
                  i === activeStep ? 'text-[#00d2ff]' : 'text-white/25 group-hover:text-white/50',
                ].join(' ')}
              >
                {s.step}
              </span>
              <span
                className={[
                  'font-semibold text-sm uppercase tracking-wide transition-colors',
                  i === activeStep ? 'text-white' : 'text-white/40 group-hover:text-white/70',
                ].join(' ')}
              >
                {s.name}
              </span>
              <span
                className={[
                  'ml-auto text-xl transition-opacity',
                  i === activeStep ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
                ].join(' ')}
              >
                {s.icon}
              </span>
            </button>
          ))}
        </div>

        {/* Nav CTA */}
        <button
          onClick={goNext}
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#00d2ff] hover:text-white transition-colors group w-fit"
        >
          Siguiente: Servicios
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RIGHT — Step detail */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-[62%] px-8 md:px-12 lg:px-16 py-10 md:py-20">
        <div ref={detailRef} className="relative">
          {/* Big step number watermark */}
          <span
            className="absolute -top-8 right-0 font-black text-[120px] md:text-[160px] leading-none text-white/[0.04] select-none pointer-events-none"
            aria-hidden="true"
          >
            {step.step}
          </span>

          {/* Step icon */}
          <div className="text-5xl mb-5">{step.icon}</div>

          {/* Step name */}
          <h3 className="font-black uppercase text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            {step.name}
          </h3>

          {/* Description */}
          <p className="text-white/65 text-lg font-light leading-relaxed max-w-md mb-5">
            {step.description}
          </p>

          {/* Visual hint */}
          <p className="text-[#00d2ff]/60 text-sm italic border-l-2 border-[#00d2ff]/25 pl-4">
            {step.visual}
          </p>

          {/* Step progress dots */}
          <div className="flex items-center gap-2 mt-8">
            {METHOD_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                aria-label={`Step ${i + 1}`}
                className="transition-all duration-300 focus:outline-none rounded-full"
                style={{
                  width: i === activeStep ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === activeStep ? '#00d2ff' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
