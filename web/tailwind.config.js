const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'dark' : {
          400: '#666666'
        },
        'highlight': '#304CD1',
        'alt': 'rgba(48, 76, 209, 0.1)'
      }
    },
  },
  plugins: [],
};
