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
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Vibrant Indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        sats: {
          gold: '#f59e0b',
          emerald: '#10b981',
          coral: '#f43f5e',
          sky: '#0284c7',
          purple: '#8b5cf6',
          amber: '#d97706',
        }
      },
      fontFamily: {
        sans: ['"Lexend"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-short': 'bounceShort 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' },
          '50%': { opacity: '.8', boxShadow: '0 0 5px rgba(99, 102, 241, 0.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
