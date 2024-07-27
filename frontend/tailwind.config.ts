/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors used in the projects
      colors: {
        primary: "dodgerblue",
        secondary: "EF863E",
      },
      borderRadius: {
        custom: "92px 180px 0px 190px",
      },
    },
  },
  plugins: [],
};
