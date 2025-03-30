import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "https://confessit.app",
  output: "static",
  integrations: [
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: false,
    }),
    astroI18next(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["de", "en", "es", "it", "pt-BR"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
