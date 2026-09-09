/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#486581',
          600: '#334E68',
          700: '#1E293B',
          800: '#0F172A',
          850: '#0D1527',
          900: '#0B132B',
          950: '#070C1E',
        },
        gov: {
          blue: '#1D4ED8',
          dark: '#0F172A',
          cyan: '#06B6D4',
          teal: '#14B8A6',
          gold: '#D97706',
          emerald: '#10B981',
          slate: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'cyan-glow-lg': '0 0 35px -2px rgba(6, 182, 212, 0.45)',
        'blue-glow': '0 0 20px -3px rgba(29, 78, 216, 0.35)',
        'command-card': '0 4px 20px -2px rgba(7, 12, 30, 0.08)',
        'command-card-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-slow': 'orbit 25s linear infinite',
        'orbit-reverse': 'orbitRev 35s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'data-stream': 'dataStream 12s linear infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.35s ease-out forwards',
        'typewriter-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitRev: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
