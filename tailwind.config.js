/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: '0fr 1fr 0fr',
      },
    },
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('daisyui'), require('postcss-import')],
}
