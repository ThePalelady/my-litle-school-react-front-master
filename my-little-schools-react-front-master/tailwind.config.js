/** @type {import('tailwindcss').Config} */
const { blackA, green, mauve, violet } = require('@radix-ui/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
}
