/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Color Emoji", "sans-serif"],
      },
    },
  },
};
