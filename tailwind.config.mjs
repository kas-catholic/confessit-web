/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				iconfess: {
					"primary": "#3c005a",
					"primary-content": "#ffffff",
					"secondary": "#f9f7fa",
					"accent": "#ff0000",
					"neutral": "#f0dacc",
					"base-100": "#ffffff"
				}
			}
		]
	}
}
