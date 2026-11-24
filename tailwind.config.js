/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: '#0B3D2E', dark: '#072A20', light: '#14573F', mist: '#E3EBE4' },
        ivory: { DEFAULT: '#FBF6EA', dark: '#F3EBD8' },
        gold: { DEFAULT: '#C9A24D', light: '#E6CF93', dark: '#8A6A22' },
        sand: '#EADFC8',
        olive: { DEFAULT: '#5A6338', dark: '#3B4126' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        arabic: ['Amiri', '"Noto Naskh Arabic"', 'serif'],
        script: ['"Aref Ruqaa"', 'Amiri', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 0.8, 0.3, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
        bob: 'bob 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
