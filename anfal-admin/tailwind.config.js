/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { accent: '#C6FF00', dark: '#0A2E12' },
      },
    },
  },
  plugins: [],
}