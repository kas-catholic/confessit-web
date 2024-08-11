import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), AstroPWA()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"]
  }
});
