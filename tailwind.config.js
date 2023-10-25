/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily: {
      playfair: ["Playfair Display", "serif"],
      poppins: ["Poppins", "serif"],
    },
    extend: {
      colors: {
        primary: "#38bdf8",
        secondary: "#94a3b8",
      },
    },
  },
  plugins: [],
};
