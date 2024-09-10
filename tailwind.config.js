
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './components/**/*.{js,jsx,}',
    './app/**/*.{js,jsx,}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },

      colors: {
        'primary': '#138592',
        'secondary': '#439EA8',
        'tertiary': '#D1E4E5',
        'quaternary': '#0B818E',
      },

    },
  },
  plugins: [],
}

