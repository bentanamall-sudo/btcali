/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 30px rgba(59,130,246,0.35)",
      },
    },
  },
  plugins: [],
};
