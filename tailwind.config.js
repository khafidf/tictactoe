/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#706FE51A",
				secondary: "#1E1F4B",
				"for-text": "#EAEEF3",
			},
		},
	},
	plugins: [],
};
