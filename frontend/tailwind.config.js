/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    extend: {
      colors: {
        // custom project color used as "bg-socialblue"
        socialblue: "#2563EB", // adjust hex to your brand color
      },
    },
  },
  plugins: [],
  
}
