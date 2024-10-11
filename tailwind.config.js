/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          customBeige:'#F1ECE2',
          customWhite:'#F8F8F6',
          customBrown : '#CAA98B',
          customTan : '#D5CDBC',
          customMint : '#D1E0D6',
          customGreen : '#10302A',
          customSage : '#6B796A',
          customGrey : '#ECECE8'
  
        },
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
    ],
  } 