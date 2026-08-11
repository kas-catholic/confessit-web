import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { ignores: ["src/paraglide/"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "react/prop-types": "off", // Disable the react/prop-types rule
    },
  },
];
