/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "300px",
      // => @media (min-width: 576px) { ... }

      md: "400px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      transparent: "transparent",
      green: "#74aa50",
      blue: "#1b365d",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
