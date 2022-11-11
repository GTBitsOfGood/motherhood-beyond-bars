const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modals/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      opensans: ["Open Sans", "sans-serif"],
    },
    extend: {},
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          100: "#BFBFBF",
          400: "#666666",
        },
        highlight: "#304CD1",
        alt: "rgba(48, 76, 209, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
