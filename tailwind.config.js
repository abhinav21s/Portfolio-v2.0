/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#050505',
        'card-dark': '#111111',
        'card-darker': '#0D0D0D',
        'primary-teal': '#22D3EE',
        'primary-cyan': '#14B8A6',
        'accent-amber': '#F59E0B',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'invalid-red': '#EF4444',
        'valid-green': '#14B8A6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-path': 'glowPath 1.5s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' },
        },
        glowPath: {
          '0%': { 
            filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.5))',
            opacity: '0.7'
          },
          '100%': { 
            filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 1))',
            opacity: '1'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
