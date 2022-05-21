module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'farm2' : "url('../client/src/components/farm_bg.jpg')",
        'farm': "url('../client/src/components/farmbg.jpg')"
      },
      fontFamily:{
        alfa: "'Alfa Slab One', cursive"
      }
    },
  },
  plugins: [require("daisyui")],
}