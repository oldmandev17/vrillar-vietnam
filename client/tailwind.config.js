/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          red: "#E10600",
          gray: "#4e5d78",
        },
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
