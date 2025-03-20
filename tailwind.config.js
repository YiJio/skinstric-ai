/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roobert)'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#1A1B1C',
        primary: '#1A1B1C',
        button: {
          DEFAULT: '#1A1B1C',
          foreground: '#ffffff'
        }
      }
    }
  },
  plugins: []
}