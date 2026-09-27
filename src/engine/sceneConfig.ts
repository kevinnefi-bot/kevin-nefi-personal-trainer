export interface SceneConfig {
  id: number;
  slug: string;
  label: string;
  sublabel: string;
  transition: 'plate-wipe' | 'blue-burst' | 'character-wipe' | 'particle-dissolve' | 'phone-portal' | 'light-sweep';
  accentColor: string;
}

export const TOTAL_SCENES = 9;

export const SCENES: SceneConfig[] = [
  { id: 0, slug: 'meet',       label: '01 MEET KEVIN',   sublabel: 'Quién soy',                    transition: 'character-wipe',    accentColor: '#00d2ff' },
  { id: 1, slug: 'story',      label: '02 MI HISTORIA',  sublabel: 'Cómo llegué aquí',             transition: 'plate-wipe',        accentColor: '#00d2ff' },
  { id: 2, slug: 'problem',    label: '03 EL PROBLEMA',  sublabel: '¿No sabes por dónde empezar?', transition: 'particle-dissolve', accentColor: '#8b5cf6' },
  { id: 3, slug: 'method',     label: '04 MI MÉTODO',    sublabel: 'Cómo trabajamos',              transition: 'plate-wipe',        accentColor: '#00d2ff' },
  { id: 4, slug: 'services',   label: '05 SERVICIOS',    sublabel: 'En qué puedo ayudarte',        transition: 'blue-burst',        accentColor: '#8b5cf6' },
  { id: 5, slug: 'myprogress', label: '06 MYPROGRESS',   sublabel: 'Tu progreso, en tus manos',    transition: 'phone-portal',      accentColor: '#00d2ff' },
  { id: 6, slug: 'values',     label: '07 MI FILOSOFÍA', sublabel: 'Por qué entrenar conmigo',     transition: 'blue-burst',        accentColor: '#8b5cf6' },
  { id: 7, slug: 'plans',      label: '08 PLANES',       sublabel: 'Cómo quieres empezar',         transition: 'light-sweep',       accentColor: '#00d2ff' },
  { id: 8, slug: 'final',      label: '09 EMPEZAR',      sublabel: 'Listo para comenzar',          transition: 'character-wipe',    accentColor: '#8b5cf6' },
];
