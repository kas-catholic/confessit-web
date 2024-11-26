/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      "retro",
      "valentine",
      "lemonade",
      "nord",
      "night",
      "dracula",
      "dim",
      {
        iconfess: {
          primary: "#3c005a",
          "primary-content": "#ffffff",
          secondary: "#f9f7fa",
          accent: "#ff0000",
          neutral: "#f0dacc",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
