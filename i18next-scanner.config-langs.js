/**
 * i18next-scanner configuration for languages other than English
 * For languages other than English, keys should be populated with an empty value
 * not with the default value within `Trans` components for example
 * Only way to achieve this is a separate config for all other languages
 */

const fs = require("fs");
const chalk = require("chalk");

module.exports = {
  input: [
    "src/**/*.{js,jsx}",
    // Use ! to filter out files or directories
    "!src/**/*.test.{js,jsx}",
    "!**/node_modules/**",
  ],
  output: "./",
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    attr: false,
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx"],
      fallbackKey: function (ns, value) {
        return sha1(value);
      },
      // https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0
      supportBasicHtmlNodes: true, // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
      keepBasicHtmlNodesFor: [
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
        "githubicon",
      ], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.
      // https://github.com/acornjs/acorn/tree/master/acorn#interface
      acorn: {
        ecmaVersion: 2020,
        sourceType: "module", // defaults to 'module'
      },
    },
    lngs: ["es", "de", "it", "pt-BR"],
    defaultLng: "en",
    ns: ["translation"],
    defaultNs: "translation",
    defaultValue: () => {
      return "";
    },
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: ":",
    keySeparator: ".",
    pluralSeparator: "_",
    contextSeparator: "_",
    contextDefaultValues: [],
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
    metadata: {},
    allowDynamicKeys: false,
    compatibilityJSON: "v4",
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const content = fs.readFileSync(file.path, enc);
    let count = 0;
    let transCount = 0;

    const parser = this.parser;

    parser.parseFuncFromString(content, {}, (key, options) => {
      parser.set(key, options);
      ++count;
    });

    parser.parseTransFromString(content, {}, (key, options) => {
      parser.set(key, options);
      ++transCount;
    });

    if (count > 0 || transCount > 0) {
      console.log(
        `i18next-scanner: t() count=${chalk.cyan(
          count
        )}, Trans count=${chalk.cyan(transCount)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  },
};
