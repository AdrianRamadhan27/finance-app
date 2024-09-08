/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Poppins', 'sans-serif'],  // Add Poppins font here
      },
    },
  },
  plugins: [],
}

