/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        graySidebarBg: "#121729",
        grayNavbarBg: "#666666",
        grayOpaque: "#7c859e20",
        greenBg:"#56b890",
        greenOpaque: "#56b89020",
        blueBg: "#0965C1"
      }
    },
    
  },
  plugins: [],
}
