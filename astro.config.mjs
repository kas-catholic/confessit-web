import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    AstroPWA(),
    astroI18next(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
});
