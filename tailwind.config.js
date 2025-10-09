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
        primary: '#CE9819', // Vibrant red-orange from logo
        'primary-dark': '#B72400', // Hover/focus variant
        'primary-white': '#FFFFFF', // Pure white
        'primary-black': '#000000', // Strong black text/background
        'accent-yellow': '#FFD966', // Highlights and sales
        'gray-muted': '#9CA3AF', // Secondary text (gray-400)
        'bg-muted': '#F7F7F7', // Section or card backgrounds
        'secondary-yellow': '#FFD966', // highlight elements like sales
        'secondary-gray': '#B0B0B0',
        danger: '#FF4D4F', // Error/out-of-stock indicators
        background: 'rgba(197, 195, 195, 0.165)', // subtle bg from your brand
      },
    },
  },
  plugins: [nextui()],
};
