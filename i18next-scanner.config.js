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
    sort: false,
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
      fallbackKey: false,

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
      ], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

      // https://github.com/acornjs/acorn/tree/master/acorn#interface
      acorn: {
        ecmaVersion: 2020,
        sourceType: "module", // defaults to 'module'
      },
    },
    lngs: ["en", "es", "de", "it"],
    ns: ["translation"],
    defaultLng: "en",
    defaultNs: "translation",
    defaultValue: "",
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
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ["i18next._", "i18next.__"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  },
};
