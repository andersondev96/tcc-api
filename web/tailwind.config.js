/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {

    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        blue: {
          800: '#30398E',
          900: '#040721',
        },
        indigo: {
          200: '#7184EA',
          400: '#478AD8',
          600: '#547DE5',
          600: '#6B7EC2',
        },
        gray: {
          300: '#D9D9D9'
        }
      },


    screens: {
      'sm': {'min': '300px', 'max': '540px'},

      'md': {'max': '640px'},
      
    },
    },
  },
  plugins: [],
}
