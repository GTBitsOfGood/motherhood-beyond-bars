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
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "#FFFFFF",
        "secondary-background": "#FAFBFC",
        "mbb-pink": "#B14378",
        "primary-text": "#000000",
        "secondary-text": "#1A1A1A",
        "light-gray": "#D9D9D9",
        "medium-gray": "#8C8C8C",
        "dark-gray": "#666666",
        "icon-gray": "#BFBFBF",
        "icon-light-gray": "#DFE3E8",
        "empty-gray": "#E3E3E3",
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
