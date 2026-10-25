/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,cjs,mjs,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main_blue: "#2f7beb",
        light_blue: "#EFF8FF",
      },
      maxWidth: {
        'custom': '1470px',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '996px',
      'xl': '1124px',
      '2xl': '1536px',
      '3xl': '1842px',
      'custom': '1470px',
    },
  },
  plugins: [

  ],
}