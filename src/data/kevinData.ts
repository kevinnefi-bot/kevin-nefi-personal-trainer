export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface PlanItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  period?: string;
  subtitle: string;
  features: string[];
  popular?: boolean;
  accent?: string;
}

export interface ValueItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const KEVIN_DATA = {
  name: "KEVIN NEFI",
  title: "PERSONAL TRAINER",
  age: 22,
  experienceYears: 2,
  primaryLocations: ["Makina 1", "Makina 2"],
  travelAvailable: true,
  phone: "+59176438793",
  phoneDisplay: "76438793",
  whatsappUrl: "https://wa.me/59176438793?text=Hola%20Kevin,%20quiero%20informaci%C3%B3n%20sobre%20tus%20planes%20de%20entrenamiento.",
  socials: {
    instagram: {
      handle: "@kev_innefi",
      url: "https://instagram.com/kev_innefi"
    },
    tiktok: {
      handle: "@Kev_innefi",
      url: "https://tiktok.com/@Kev_innefi"
    }
  },
  myProgress: {
    title: "YOUR PROGRESS. IN YOUR HANDS.",
    subtitle: "MYPROGRESS",
    statusBadge: "Functional Beta",
    appUrl: "https://myprogress-ashy.vercel.app/",
    description: "Espacio digital de seguimiento diseñado para estructurar y monitorear el proceso real de cada cliente: rutinas, nutrición, evolución y métricas claras.",
    features: [
      "Rutinas personalizadas estructuradas por semanas",
      "Guía nutricional alineada a tus objetivos",
      "Registro de pesos, repeticiones y evolución de fuerza",
      "Seguimiento directo y constante con Kevin"
    ]
  },
  hero: {
    headlinePrimary: "BUILD YOUR BEST VERSION",
    headlineSecondary: "ENTRENAMIENTO PERSONALIZADO. SEGUIMIENTO REAL. PROGRESO SOSTENIBLE.",
    cta: "INICIAR MI PROCESO"
  },
  philosophy: {
    mainQuote: "IT DOESN'T HAVE TO BE COMPLICATED.",
    subQuoteSpanish: "No tiene por qué ser complicado.",
    secondaryText: "Tu punto de partida no define tu resultado final. La decisión de continuar sí.",
    taglines: [
      "START WHERE YOU ARE",
      "BUILD FROM THERE",
      "PROGRESS OVER PERFECTION",
      "YOUR BODY. YOUR GOAL. YOUR PROGRESS."
    ]
  },
  method: [
    {
      step: "01",
      name: "EVALUACIÓN",
      description: "Entender de dónde partes: historial, lesiones, nivel actual y metas reales."
    },
    {
      step: "02",
      name: "PLANIFICACIÓN",
      description: "Diseñar una estrategia adaptada a tus tiempos, capacidades y disponibilidad."
    },
    {
      step: "03",
      name: "ENTRENAMIENTO",
      description: "Ejecutar la rutina con técnica sólida, intensidad correcta y seguridad."
    },
    {
      step: "04",
      name: "SEGUIMIENTO",
      description: "Monitorear la evolución constante y verificar el cumplimiento."
    },
    {
      step: "05",
      name: "AJUSTE",
      description: "Optimizar cargas, volumen y variables cuando el cuerpo se adapta."
    },
    {
      step: "06",
      name: "PROGRESO",
      description: "Mantener resultados a largo plazo con disciplina y consistencia."
    }
  ],
  services: [
    {
      number: "01",
      title: "EVALUACIÓN FÍSICA",
      description: "Análisis completo de tu condición inicial, movilidad y requerimientos específicos para construir una base sólida.",
      tag: "Diagnóstico"
    },
    {
      number: "02",
      title: "ENTRENAMIENTO PERSONALIZADO",
      description: "Rutinas guiadas en gimnasio (Makina 1, Makina 2 o a domicilio) enfocadas en hipertrofia, pérdida de grasa o condición física.",
      tag: "Fuerza & Estética"
    },
    {
      number: "03",
      title: "GUÍA NUTRICIONAL",
      description: "Orientación alimenticia práctica adaptada a tus objetivos diarios para potenciar tus entrenamientos sin dietas extremas.",
      tag: "Hábitos Sostenibles"
    },
    {
      number: "04",
      title: "SEGUIMIENTO PERSONAL",
      description: "Acompañamiento continuo y asesoría directa para mantener el compromiso, resolver dudas y asegurar consistencia.",
      tag: "Feedback 1 a 1"
    },
    {
      number: "05",
      title: "MYPROGRESS PLATFORM",
      description: "Acceso exclusivo a la app de control para ver tus planes, métricas de avance y evolución en tiempo real.",
      tag: "Tecnología Beta"
    }
  ] as ServiceItem[],
  values: [
    {
      title: "HONESTIDAD",
      subtitle: "Sin falsas promesas",
      description: "Resultados reales basados en esfuerzo sostenido. Sin atajos irreales ni soluciones mágicas.",
      iconName: "ShieldCheck"
    },
    {
      title: "DISCIPLINA",
      subtitle: "El motor principal",
      description: "Construir el hábito de entrenar incluso cuando la motivación no está presente.",
      iconName: "Zap"
    },
    {
      title: "CONSISTENCIA",
      subtitle: "El secreto del éxito",
      description: "Paso a paso, día a día. El progreso acumulado es el que transforma tu físico.",
      iconName: "TrendingUp"
    },
    {
      title: "COMPROMISO",
      subtitle: "Trabajo en equipo",
      description: "Tu esfuerzo en el gimnasio alineado con la guía profesional constante.",
      iconName: "Target"
    },
    {
      title: "RESPETO",
      subtitle: "Tu propio ritmo",
      description: "Cada proceso es único. Respetamos tu punto de inicio y tus metas personales.",
      iconName: "Heart"
    },
    {
      title: "PERSONALIZACIÓN",
      subtitle: "Diseñado para ti",
      description: "Sin plantillas genéricas. Todo plan se ajusta a tu estilo de vida y capacidad.",
      iconName: "Sliders"
    }
  ] as ValueItem[],
  plans: [
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
        "Guía nutricional adaptada a tu meta",
        "Seguimiento personalizado continuo",
        "Acceso a MyProgress (Beta)"
      ],
      popular: true,
      accent: "from-[#ff003c] to-[#990022]"
    },
    {
      id: "duo",
      name: "PLAN 2 PERSONAS",
      price: "800",
      currency: "Bs",
      period: "por mes",
      subtitle: "Entrena en pareja o con un amigo",
      features: [
        "Evaluación física para ambas personas",
        "Planes individualizados por objetivo",
        "Guía nutricional para cada integrante",
        "Seguimiento simultáneo y motivación",
        "Acceso a MyProgress para ambos"
      ],
      popular: false,
      accent: "from-[#ff0055] to-[#770022]"
    },
    {
      id: "trimestral",
      name: "PLAN 3 MESES",
      price: "1,200",
      currency: "Bs",
      period: "3 meses de proceso",
      subtitle: "Compromiso de mediano plazo",
      features: [
        "Evaluación física y reevaluaciones mensuales",
        "Planificación estratégica a 12 semanas",
        "Ajustes periódicos de cargas y volumen",
        "Guía de nutrición y evolución constante",
        "Acceso prioritario a MyProgress App"
      ],
      popular: false,
      accent: "from-[#ff2a00] to-[#aa0022]"
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
        "Enfoque en ejercicios compuestos de alto impacto",
        "Guía práctica de nutrición",
        "Seguimiento semanal de avance",
        "Acceso a la plataforma MyProgress"
      ],
      popular: false,
      accent: "from-[#cc0033] to-[#550011]"
    }
  ] as PlanItem[]
};
