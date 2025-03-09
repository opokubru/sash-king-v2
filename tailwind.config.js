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
				primary: '#2479EA',
				"primary-text": "#284D39",
				secondary: '#0E069A',
				'secondary-light': '#619b7d1a',
				'primary-white': '#F5F5F5',
				'primary-black': '#1A1A1A',
				'secondary-black': '#575757',
				background: '#EDF2EE',
			},
		},
	},
	plugins: [nextui()],
};
