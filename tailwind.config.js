/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EE',
        ink: '#1F1A17',
        chair: '#1F3A2B',
        'chair-light': '#2A4E3B',
        blade: '#C2410C',
        'blade-light': '#D9602C',
        gold: '#A7773B',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '14px',
        '3xl': '18px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(31, 26, 23, 0.08)',
        lift: '0 12px 40px rgba(31, 26, 23, 0.12)',
      },
    },
  },
  plugins: [],
};
