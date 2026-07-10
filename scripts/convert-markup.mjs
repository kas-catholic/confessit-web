#!/usr/bin/env node
/**
 * One-time script: converts i18next <Trans> indexed markup (<0>...</0>) to
 * actual HTML tags in translation JSON files. Cross-references <Trans> blocks
 * in source files to determine which HTML tag each index maps to.
 *
 * Named HTML tags (<strong>, <b>, <br />) are left unchanged — they already
 * contain actual HTML that renders correctly via set:html.
 *
 * i18next's <Trans> numbers only the attribute-bearing elements (elements with
 * attributes like <a href="..."> or <kbd className="..."> get indexed; bare
 * pass-through tags like <strong>/<b>/<br /> are kept as literal HTML). The
 * index value itself spans all children (text + elements), so it is not a
 * simple sequential count of elements. Therefore we pair the indexed tags
 * found in the JSON (sorted by index) positionally with the attribute-bearing
 * elements found in the <Trans> source block (in document order).
 *
 * Usage: node scripts/convert-markup.mjs
 * Or programmatically: import { convertMarkup } from "./scripts/convert-markup.mjs"
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Parse a <Trans> block to build an ordered list of attribute-bearing HTML
 * elements (the ones i18next indexes). Bare tags (no attributes) are skipped
 * because i18next passes them through as literal HTML in the JSON.
 * Returns Element[] where Element = { open: string, close: string }
 */
function parseTransBlock(content, i18nKey) {
  const transRe = new RegExp(
    `<Trans[^>]*i18nKey=["']${escapeRegex(i18nKey)}["'][^>]*>([\\s\\S]*?)</Trans>`,
    "i",
  );
  const match = content.match(transRe);
  if (!match) return null;

  const inner = match[1];
  const elements = [];

  const elementRe = /<([A-Za-z][A-Za-z0-9]*)((?:\s+[^>]*?)?)\s*(\/?)>/g;
  let elMatch;
  while ((elMatch = elementRe.exec(inner)) !== null) {
    const tag = elMatch[1];
    let attrs = (elMatch[2] || "").trim();
    const selfClosing = elMatch[3] === "/";

    // Bare HTML elements (no attributes) are passed through by i18next as
    // literal HTML and are NOT indexed — skip them.
    if (attrs === "") continue;

    // Convert React className to HTML class for set:html compatibility.
    attrs = attrs.replace(/\bclassName=/g, "class=");

    if (selfClosing) {
      elements.push({ open: `<${tag} ${attrs} />`, close: "" });
    } else {
      elements.push({ open: `<${tag} ${attrs}>`, close: `</${tag}>` });
    }
  }

  return elements;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Walk all .astro and .jsx files in srcDir, find <Trans> blocks, and build a
 * key-to-elements lookup.
 */
function buildMappingFromSource(srcDir) {
  const keyMappings = new Map(); // i18nKey -> Element[]

  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(astro|jsx)$/.test(entry.name)) {
        const content = readFileSync(full, "utf8");
        const keyRe = /<Trans[^>]*i18nKey=["']([^"']+)["']/g;
        let keyMatch;
        while ((keyMatch = keyRe.exec(content)) !== null) {
          const key = keyMatch[1];
          if (keyMappings.has(key)) continue;
          const elements = parseTransBlock(content, key);
          if (elements && elements.length > 0) {
            keyMappings.set(key, elements);
          }
        }
      }
    }
  }

  walk(srcDir);
  return keyMappings;
}

/**
 * Convert a single JSON value: replace <N>...</N> with actual HTML tags by
 * pairing the indexed tags (sorted by N) with the source elements in order.
 */
function convertValue(value, elements) {
  if (typeof value !== "string") return value;
  if (!/<\d+>/.test(value)) return value;
  if (elements.length === 0) return value;

  // Collect distinct indexed open tags, sorted ascending by index.
  const indexRe = /<(\d+)>/g;
  const nums = [];
  let m;
  while ((m = indexRe.exec(value)) !== null) {
    const n = Number(m[1]);
    if (!nums.includes(n)) nums.push(n);
  }
  nums.sort((a, b) => a - b);

  let result = value;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const el = elements[i];
    if (!el) {
      console.warn(
        `  warning: index <${n}> has no matching source element; leaving as-is`,
      );
      break;
    }
    result = result.replaceAll(`<${n}>`, el.open);
    if (el.close) {
      result = result.replaceAll(`</${n}>`, el.close);
    }
  }
  return result;
}

/**
 * Main conversion function.
 * @param {Object} opts
 * @param {string} opts.srcDir - source directory to scan for <Trans> blocks
 * @param {string} opts.localesDir - public/locales directory
 * @param {string[]} opts.locales - locale codes to convert
 */
export function convertMarkup({ srcDir, localesDir, locales }) {
  const keyMappings = buildMappingFromSource(srcDir);

  if (keyMappings.size === 0) {
    console.log("No <Trans> blocks with indexed markup found.");
    return;
  }

  console.log(`Found ${keyMappings.size} keys with indexed markup to convert.`);

  for (const locale of locales) {
    const jsonPath = join(localesDir, locale, "translation.json");
    let content;
    try {
      content = JSON.parse(readFileSync(jsonPath, "utf8"));
    } catch (e) {
      console.warn(`Skipping ${locale}: ${e.message}`);
      continue;
    }

    let changed = 0;
    for (const [key, elements] of keyMappings) {
      const parts = key.split(".");
      let target = content;
      for (let i = 0; i < parts.length - 1; i++) {
        if (target[parts[i]]) target = target[parts[i]];
        else {
          target = null;
          break;
        }
      }
      if (target && target[parts[parts.length - 1]]) {
        const lastKey = parts[parts.length - 1];
        const original = target[lastKey];
        const converted = convertValue(original, elements);
        if (converted !== original) {
          target[lastKey] = converted;
          changed++;
        }
      }
    }

    if (changed > 0) {
      writeFileSync(jsonPath, JSON.stringify(content, null, 2) + "\n");
      console.log(`  ${locale}: converted ${changed} keys`);
    } else {
      console.log(`  ${locale}: no changes needed`);
    }
  }
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  convertMarkup({
    srcDir: resolve("src"),
    localesDir: resolve("public", "locales"),
    locales: ["en", "es", "de", "it", "pt-BR"],
  });
}
