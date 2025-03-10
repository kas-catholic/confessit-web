import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [react(), AstroPWA(), astroI18next()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
