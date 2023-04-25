module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				note: 'note 0.5s ease-in forwards',
			},
			keyframes: {
				note: {
					'0%': { transform: 'translate(2rem, -7rem) scale(0.5)' },
					'100%': { transform: 'translateY(0, 0) scale(1)' },
				},
			},
		},
	},
	plugins: [require('daisyui')],
};
