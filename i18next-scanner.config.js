const fs = require("fs");
const chalk = require("chalk");
const Parser = require("i18next-scanner").Parser;

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
    func: false,
    trans: false,
    lngs: ["en", "es", "de", "it", "pt-BR"],
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
    const transParser = new Parser({
      defaultValue: (lng, ns, key) => {
        if (lng === "en") {
          return key;
        } else {
          return "";
        }
      },
      lngs: ["en", "es", "de", "it", "pt-BR"],
      resource: {
        loadPath: "public/locales/{{lng}}/{{ns}}.json",
        savePath: "public/locales/{{lng}}/{{ns}}.json",
        jsonIndent: 2,
        lineEnding: "\n",
      },
      keySeparator: ".",
    });
    const content = fs.readFileSync(file.path, enc);
    let count = 0;
    let transCount = 0;

    parser.parseFuncFromString(
      content,
      {
        list: ["i18next.t", "i18n.t", "t"],
        extensions: [".js", ".jsx"],
      },
      (key, options) => {
        parser.set(key, options);
        ++count;
      }
    );

    let keysObj = {};

    transParser.parseTransFromString(
      content,
      {
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
          "footer",
          "githubicon",
        ], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

        // https://github.com/acornjs/acorn/tree/master/acorn#interface
        acorn: {
          ecmaVersion: 2020,
          sourceType: "module", // defaults to 'module'
        },
      },
      (key, options) => {
        //if(false === key in keysObj) {
        keysObj[key] = options;
        parser.set(key, options);
        ++transCount;
        //}
      }
    );

    if (count > 0 || transCount > 0) {
      console.log(
        `i18next-scanner: t() count=${chalk.cyan(
          count
        )}, Trans count=${chalk.cyan(transCount)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
      if (transCount > 0) {
        console.log(
          `file=${chalk.yellow(JSON.stringify(file.relative))}, ${chalk.cyan(
            JSON.stringify(keysObj)
          )}`
        );
      }
    }

    done();
  },
};
