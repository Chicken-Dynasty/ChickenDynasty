module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'farm' : "url('../client/src/components/farmbg_opa.jpeg')",
        'farm2': "url('../client/src/components/farmbg.jpg')"
      },
      fontFamily:{
        alfa: "'Alfa Slab One', cursive"
      }
    },
  },
  plugins: [require("daisyui")],
}