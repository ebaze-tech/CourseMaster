/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./index.html",
    "./main.jsx",
    "./src/**/**/*.{js,ts,jsx,tsx}",
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
        Roboto: ['"Roboto"', "sans-serif"],
        Outfit: ['"Outfit"', "sans-serif"],
        RobotSlab: ["Roboto Slab", "sans-serif"], // Adding Roboto font as a fallback
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
