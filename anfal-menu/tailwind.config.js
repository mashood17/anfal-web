/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#0A2E12',
          DEFAULT: '#0A2E12',
          light:   '#0F3D18',
          accent:  '#C6FF00',
        },
        surface: {
          DEFAULT: '#0D3615',
          muted:   '#102E17',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}