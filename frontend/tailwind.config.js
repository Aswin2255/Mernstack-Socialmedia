/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}",
 ],
 theme: {
   extend: {
    colors:{
     socialbg:'#F5F7FB',
     socialblue:'#218DFA',
    },
    backgroundImage: {
      'hero-pattern': "url('https://image.slidesdocs.com/responsive-images/background/health-light-effect-white-abstract-medicine-abstract-medical-powerpoint-background_1e5280f88a__960_540.jpg')",
      
    }
   },
  
 },
 plugins: [],
}
