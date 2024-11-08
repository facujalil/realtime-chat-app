/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "980px" },
      xl: { max: "1280px" },
      "2xl": { max: "1536px" },
    },
    fontFamily: {
      mulish: ["Mulish", "sans-serif"],
    },
    backgroundImage: {
      "custom-gradient-75deg":
        "linear-gradient(75deg, rgb(20,22,28) 50%, rgb(41,43,54) 100%);",
      "custom-gradient-180deg":
        "linear-gradient(180deg, rgb(41,43,54) 35%, rgb(62,64,75) 100%);",
    },
    extend: {},
  },
  plugins: [],
};
