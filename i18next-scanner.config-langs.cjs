/**
 * i18next-scanner configuration for languages other than English
 * for which keys should be populated with an empty value
 * not with the default value within `Trans` components for example
 * Only way to achieve this is a separate config for all other languages
 */

const chalk = require("chalk");
const path = require("path");
const HTML = require("html-parse-stringify");

module.exports = {
  input: [
    "src/**/*.{js,jsx,astro}",
    // Use ! to filter out files or directories
    "!src/**/*.test.{js,jsx,astro}",
    "!**/node_modules/**",
  ],
  output: "./",
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    attr: false,
    func: false,
    trans: false,
    lngs: ["es", "de", "it", "pt-BR", "fr"],
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
  transform: function (file, enc, done) {
    "use strict";
    const parser = this.parser;
    const currentTime = new Date().toLocaleTimeString();
    const temp_content = file.contents.toString(enc);

    let count = 0;
    let transCount = 0;

    if (path.extname(file.path) === ".astro") {
      // Remove Astro frontmatter (anything between `---` fences)
      const frontMatterStripped = temp_content
        .replace(/^---[\s\S]*?---/, "")
        .trim();
      console.log(
        `${currentTime} i18next-scanner: Parsing Astro file ${file.relative}...`,
      );
      //console.log(`${currentTime} i18next-scanner: file contents stripped of Astro frontmatter: ${frontMatterStripped}`);
      parser.parseFuncFromString(
        frontMatterStripped,
        {
          list: ["i18next.t", "i18n.t", "t"],
          extensions: [".js", ".jsx", ".astro"],
        },
        (key, options) => {
          parser.set(key, options);
          ++count;
        },
      );
      const extractText = (nodes) => {
        nodes.forEach((node) => {
          if (node.type === "tag" && node.name === "Trans") {
            const content = HTML.stringify([node]);
            //console.log(`${currentTime} i18next-scanner: Parsing Trans in ${file.path}...`, content);
            parser.parseTransFromString(
              content,
              {
                component: "Trans",
                i18nKey: "i18nKey",
                defaultsKey: "defaults",
                extensions: [".js", ".jsx", ".astro"],
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
                ], // Which nodes are allowed to be kept in translations during defaultValue generation of the Trans component.
                // https://github.com/acornjs/acorn/tree/master/acorn#interface
                acorn: {
                  ecmaVersion: 2020,
                  sourceType: "module",
                },
              },
              (key, options) => {
                parser.set(key, options);
                ++transCount;
              },
            );
          } else if (node.children) {
            extractText(node.children);
          }
        });
      };
      try {
        const ast = HTML.parse(frontMatterStripped);
        //console.log(`${currentTime} i18next-scanner: Parsing HTML in ${file.path}...`);
        extractText(ast);
      } catch (err) {
        console.log(
          `${currentTime} i18next-scanner: Error parsing HTML in ${file.path}: ${err.message}`,
        );
      }
    } else {
      console.log(
        `${currentTime} i18next-scanner: Parsing js or jsx file ${file.relative}...`,
      );
      parser.parseFuncFromString(
        temp_content,
        {
          list: ["i18next.t", "i18n.t", "t"],
          extensions: [".js", ".jsx", ".astro"],
        },
        (key, options) => {
          parser.set(key, options);
          ++count;
        },
      );
      parser.parseTransFromString(
        temp_content,
        {
          component: "Trans",
          i18nKey: "i18nKey",
          defaultsKey: "defaults",
          extensions: [".js", ".jsx", ".astro"],
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
        (key, options) => {
          parser.set(key, options);
          ++transCount;
        },
      );
    }

    if (count > 0 || transCount > 0) {
      console.log(
        `i18next-scanner: t() count=${chalk.cyan(
          count,
        )}, Trans count=${chalk.cyan(transCount)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
