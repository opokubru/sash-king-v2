/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { nextui } = require('@nextui-org/react');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',

      screens: {
        xl: '1184px',
      },
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fill-300': 'repeat(auto-fill, minmax(300px, 1fr))',
        'auto-fill-220': 'repeat(auto-fill, minmax(220px, 1fr))',
        'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
        'auto-fill-150': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      fontFamily: {
        roboto: 'Roboto',
      },
      fontSize: {
        base: '16px',
        standard: '14px',
      },

      colors: {
        primary: '#FF5927', // SNEAKS red-orange
        'primary-dark': '#CC3000', // darker shade for hover states
        'primary-white': '#F5F5F5', // soft white for backgrounds
        'primary-black': '#000000', // true black for text/bg
        'secondary-yellow': '#FFD966', // highlight elements like sales
        'secondary-gray': '#B0B0B0', // for muted borders or secondary text
        background: 'rgba(197, 195, 195, 0.165)', // subtle bg from your brand
      },
    },
  },
  plugins: [nextui()],
};
