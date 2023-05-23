import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  // i18next-http-backend
  // Loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "de", "es", "it"],
    // allow an empty value to count as invalid
    // https://www.i18next.com/principles/fallback#missing-values-for-existing-keys
    returnEmptyString: false,
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: [
        "br",
        "strong",
        "i",
        "p",
        "vatican",
        "github",
        "mass",
        "osc",
        "website",
        "app",
        "a",
        "kbd",
        "code",
        "footer",
      ],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
