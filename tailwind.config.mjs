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
        confessit: {
          "color-scheme": "light",
          primary: "#3c005a",
          "primary-content": "#ffffff",
          secondary: "#a4cbb4",
          "secondary-content": "#282425",
          accent: "#DC8850",
          "accent-content": "#282425",
          neutral: "#DBCA9A",
          "neutral-content": "#282425",
          "base-100": "#ece3ca",
          "base-200": "#e4d8b4",
          "base-300": "#DBCA9A",
          "base-content": "#282425",
          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "oklch(65.72% 0.199 27.33)",
        },
      },
      {
        confessitretro: {
          "color-scheme": "light",
          primary: "#a695ef",
          "primary-content": "#282425",
          secondary: "#a4cbb4",
          "secondary-content": "#282425",
          accent: "#DC8850",
          "accent-content": "#282425",
          neutral: "#DBCA9A",
          "neutral-content": "#282425",
          "base-100": "#ece3ca",
          "base-200": "#e4d8b4",
          "base-300": "#DBCA9A",
          "base-content": "#282425",
          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "oklch(65.72% 0.199 27.33)",
        },
      },
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
