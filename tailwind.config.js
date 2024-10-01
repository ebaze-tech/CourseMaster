/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./index.html",
    "./main.js",
    "./**/*.{html,js,jsx,ts,tsx}",
    "./src/**/**/**.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0E0913",
        brown: "#F3C777",
        red: "#DF0000",
        dark: "#000703",
        primary: "#CE9122",
        primaryAlt: "#983FB4",
      },
      fontFamily: {
        AfacacadFlux: ['"Afacad Flux"', "sans-serif"], // Ensure correct font declaration
        Roboto: ['"Roboto"', "sans-serif"], // Adding Roboto font as a fallback
      },
    },
  },
  plugins: [],
};
