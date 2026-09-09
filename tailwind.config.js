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
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#173427',
          800: '#10241B',
          850: '#091610',
          900: '#050E0A',
          950: '#020604',
        },
        'white-blue': {
          50: '#F8FAFC',
          100: '#F0F9FF',
          200: '#E0F2FE',
          300: '#BAE6FD',
          400: '#7DD3FC',
          500: '#38BDF8',
          600: '#0284C7',
        },
        gov: {
          blue: '#1D4ED8',
          dark: '#030805',
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
        'green-glow': '0 0 25px -2px rgba(16, 185, 129, 0.32)',
        'green-glow-lg': '0 0 45px -2px rgba(16, 185, 129, 0.48)',
        'white-blue-glow': '0 0 25px -2px rgba(59, 130, 246, 0.25)',
        'white-blue-glow-lg': '0 0 45px -2px rgba(59, 130, 246, 0.4)',
        'blue-glow': '0 0 20px -3px rgba(29, 78, 216, 0.35)',
        'command-card': '0 4px 20px -2px rgba(37, 99, 235, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'command-card-dark': '0 4px 28px -2px rgba(0, 0, 0, 0.82), 0 0 16px -2px rgba(16, 185, 129, 0.1)',
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
