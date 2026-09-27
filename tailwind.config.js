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
          dark: '#050608',
          card: '#0a0d14',
          cardBorder: '#161c28',
          blue: '#0066ff',
          electric: '#00d2ff',
          violet: '#8b5cf6',
          purple: '#7928ca',
          glowBlue: 'rgba(0, 102, 255, 0.4)',
          glowPurple: 'rgba(121, 40, 202, 0.4)',
          steel: '#1e2430',
          silver: '#94a3b8',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syncopate', 'sans-serif']
      },
      boxShadow: {
        'blue-glow': '0 0 35px rgba(0, 102, 255, 0.35)',
        'purple-glow': '0 0 35px rgba(121, 40, 202, 0.35)',
        'electric-strong': '0 0 50px rgba(0, 210, 255, 0.5)'
      }
    },
  },
  plugins: [],
}
