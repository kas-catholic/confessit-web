import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";
import tseslintParser from "@typescript-eslint/parser";
/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["src/paraglide/"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...pluginReact.configs.flat.recommended,
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...pluginReact.configs.flat["jsx-runtime"],
  },
  ...pluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tseslintParser,
      },
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "react/prop-types": "off",
    },
  },
];
