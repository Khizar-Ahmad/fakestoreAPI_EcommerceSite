/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {

      'super-extra-sm': '300px',
      'extra-sm': '450px',
     'sm': '600px',
  // => @media (min-width: 576px) { ... }
      'sm-md': '750px',
  'md': '850px',
  // => @media (min-width: 768px) { ... }
  'lg': '1000px',
  'lg-xl': '1200px',

  'xl': '1500px',
  // => @media (min-width: 1200px) { ... }
    }
    ,
    extend: {},
  },
  plugins: [],
}
