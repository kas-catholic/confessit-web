import { locales, baseLocale } from "../paraglide/runtime.js";

export function localeStaticPaths() {
  return locales
    .filter((locale) => locale !== baseLocale)
    .map((locale) => ({
      params: { locale },
    }));
}
