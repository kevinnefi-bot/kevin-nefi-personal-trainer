/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#070709',
          card: '#0e0e12',
          cardBorder: '#1c1c24',
          crimson: '#ff003c',
          crimsonDark: '#990022',
          crimsonGlow: 'rgba(255, 0, 60, 0.4)',
          steel: '#2a2b36',
          silver: '#a1a1b5',
          textMuted: '#71717a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syncopate', 'sans-serif']
      },
      boxShadow: {
        'crimson-glow': '0 0 35px rgba(255, 0, 60, 0.35)',
        'crimson-strong': '0 0 50px rgba(255, 0, 60, 0.6)'
      }
    },
  },
  plugins: [],
}
