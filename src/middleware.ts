import { defineMiddleware } from "astro:middleware";
import { assertIsLocale, baseLocale, setLocale } from "./paraglide/runtime.js";

export const onRequest = defineMiddleware((context, next) => {
  setLocale(assertIsLocale(context.currentLocale ?? baseLocale), {
    reload: false,
  });
  return next();
});
