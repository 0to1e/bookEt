/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {colors:{
      primary:"#ffd60a",
      light_bg:"#FBFEFB",
      dark_bg:"#0D0A0B",
      error:"#D00000",
      suggestion:"#2E5EAA",
      success:"#2E933C",
      
    }},
  },
  plugins: [],
};
