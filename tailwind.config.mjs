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
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        confessit: {
          "color-scheme": "light",
          primary: "#3c005a",
          "primary-content": "#ffffff",
          secondary: "#a4cbb4",
          "secondary-content": "#282425",
          accent: "#cb5365",
          "accent-content": "#282425",
          neutral: "#f0dacc",
          "neutral-content": "#282425",
          "base-100": "#fff9f2",
          "base-200": "#f0dacc",
          "base-300": "#dcbda9",
          "base-content": "#282425",
          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "oklch(65.72% 0.199 27.33)",
        },
      },
    ],
  },
};
