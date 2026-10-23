/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#050811', panel: '#0a101c', gold: '#d4af37' },
      boxShadow: { glow: '0 0 35px rgba(212, 175, 55, .17)' },
      fontFamily: { display: ['Space Grotesk', 'sans-serif'] },
    },
  },
  plugins: [],
};
