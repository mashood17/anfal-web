/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:   '#0A2E12',
          mid:    '#0D3615',
          accent: '#C6FF00',
        },
        text: {
          primary: '#F5F2EC',
          muted:   '#A8B8A0',
          faint:   '#6B8F6E',
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