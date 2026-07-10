# Migrate to Paraglide JS (Drop astro-i18next + i18next) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `astro-i18next` + `i18next` + `react-i18next` with Paraglide JS — a compiler-based i18n library that eliminates all custom i18n infrastructure (init modules, backend plugins, language detection, page-generation scripts, `<Trans>` components) and unblocks the Node 22 upgrade.

**Architecture:** This is a static (SSG) Astro site. Paraglide compiles translation JSON into tree-shakable, type-safe message functions (`m["key"]()`) at build time via a Vite plugin — no runtime init, no backend loading, no language detection. Astro's native i18n routing + a 6-line middleware handles locale detection from the URL. Pages are restructured from flat files + generated locale copies into a `[locale]/` dynamic-route pattern with `getStaticPaths()`, eliminating the `astro-i18next generate` CLI and its dependency tree (the Node 22 blocker). The existing `public/locales/*/translation.json` files are kept in place and read by Paraglide's i18next plugin; only the 11 messages using i18next's indexed `<Trans>` markup (`<0>...</0>`) need a one-time format conversion to actual HTML tags (rendered via `set:html`).

**Tech Stack:** Astro 5 (static output, native i18n routing), `@inlang/paraglide-js` (Vite plugin + compiler), `@inlang/plugin-i18next` (reads existing i18next JSON format). Locales: `en` (default, no URL prefix), `es`, `it`, `de`, `pt-BR`. (`fr` exists in JSON but is excluded from active locales, matching current behavior.)

**Key design decisions:**

1. **Keep the i18next JSON plugin** — it handles nested keys (`about.title` → `m["about.title"]()`) and `{{variable}}` interpolation natively. No need to flatten or rewrite the JSON structure.
2. **Render markup messages with `set:html`** — the 26 messages containing HTML (`<b>`, `<strong>`, `<a>`, `<br>`, `<kbd>`) are rendered via `set:html={m["key"]()}` in Astro and `dangerouslySetInnerHTML` in React. This matches what `astro-i18next`'s `<Trans>` already did under the hood. The 11 messages using i18next's indexed format (`<0>...</0>`) need a one-time conversion to actual HTML tags in the JSON.
3. **`[locale]/` dynamic routes** — replaces the `astro-i18next generate` page-copy script. Root pages serve English (no prefix, preserving URLs); `[locale]/` pages serve other locales via `getStaticPaths()`. Shared page-content components avoid duplication.
4. **`prefixDefaultLocale: false`** — English URLs stay unchanged (`/about/` not `/en/about/`). Other locales keep their prefix (`/es/about/`).
5. **No `react-i18next` needed** — React islands call `m["key"]()` directly. No `useTranslation()` hook, no provider, no init. The `@inlang/paraglide-js-react` package is NOT needed since we render markup via `dangerouslySetInnerHTML` (not Paraglide's markup system).

---

## File Structure

**Create:**

- `project.inlang/settings.json` — Paraglide project config: `baseLocale: "en"`, `locales: ["en","es","it","de","pt-BR"]`, i18next plugin pointing at `./public/locales/{locale}/translation.json`.
- `src/middleware.ts` — Astro middleware: `setLocale(context.currentLocale)` before each page render. 6 lines.
- `src/i18n/paths.ts` — shared `localeStaticPaths()` helper for `[locale]` page `getStaticPaths()`. Returns non-default locales only.
- `src/components/ParaglideTrans.astro` — thin wrapper: `<Fragment set:html={m[key]()} />`. Replaces `<Trans>` in Astro pages. ~10 lines.
- `src/components/pages/HomePage.astro` — page body extracted from `index.astro`.
- `src/components/pages/AboutPage.astro` — page body extracted from `about.astro`.
- `src/components/pages/AboutConfessionPage.astro` — from `about-confession.astro`.
- `src/components/pages/AboutAndroidPage.astro` — from `about-confessit-android.astro`.
- `src/components/pages/PrayersPage.astro` — from `prayers.astro`.
- `src/components/pages/HelpPage.astro` — from `help.astro`.
- `src/pages/[locale]/index.astro` — `getStaticPaths` + `<Layout><HomePage /></Layout>`.
- `src/pages/[locale]/about.astro` — same pattern.
- `src/pages/[locale]/about-confession.astro`
- `src/pages/[locale]/about-confessit-android.astro`
- `src/pages/[locale]/prayers.astro`
- `src/pages/[locale]/help.astro`
- `scripts/convert-markup.mjs` — one-time script: reads `<Trans>` source blocks to build `<N>` → HTML tag mapping, then rewrites JSON in all locales.
- `test/convert-markup.test.mjs` — tests for the conversion script.

**Modify:**

- `astro.config.mjs` — add `paraglideVitePlugin`, set `output: "static"` (already is), add `routing: { prefixDefaultLocale: false }`.
- `package.json` — add `@inlang/paraglide-js`; remove `astro-i18next`, `i18next`, `react-i18next`. Remove `i18n:generate` script.
- `src/layouts/Layout.astro` — `i18next.language` → `getLocale()`; `localizePath()` → `localizeHref()`; inline hreflang + language selector (replacing `astro-i18next` components).
- `src/pages/index.astro` — becomes thin wrapper: `<Layout><HomePage /></Layout>`.
- `src/pages/about.astro` — becomes thin wrapper: `<Container><AboutPage /></Container>`.
- `src/pages/about-confession.astro`, `about-confessit-android.astro`, `prayers.astro`, `help.astro` — same pattern.
- `src/components/ConfessIt.jsx` — `t()` → `m["key"]()`; dynamic keys via `m[\`sins.${id}.text_past\`]()`; `i18next.language`→`getLocale()`.
- `src/components/ExamineList.jsx` — `t()` → `m["key"]()`; dynamic keys via `m[\`sins.${id}.text\`]()` etc.
- `src/components/SinsList.jsx` — `useTranslation()` removed; `t()` → `m["key"]()`; `i18next.language` → `getLocale()`.
- `src/components/Walkthrough.jsx` — `useTranslation()` removed; `t()` → `m["key"]()`; `<Trans>` → `dangerouslySetInnerHTML`; `i18next.language` → `getLocale()`.
- `src/components/WelcomeModal.jsx` — `useTranslation()` removed; `t()` → `m["key"]()`; `<Trans>` → `dangerouslySetInnerHTML`.
- `src/components/AddSinModal.jsx` — `t()` → `m["key"]()`.
- `src/components/SpeechBubble.jsx` — `t()` → `m["key"]()`.
- `public/locales/en/translation.json` — convert 11 indexed-`<N>` markup keys to actual HTML tags.
- `public/locales/es/translation.json` — same conversion (same tag structure, different text).
- `public/locales/de/translation.json` — same.
- `public/locales/it/translation.json` — same.
- `public/locales/pt-BR/translation.json` — same.

**Delete:**

- `astro-i18next.config.mjs`
- `i18next-scanner.config-en.cjs`
- `i18next-scanner.config-langs.cjs`
- `src/data/DummyTranslation.jsx` (existed only for i18next-scanner; Paraglide reads JSON directly)
- `src/pages/de/`, `src/pages/es/`, `src/pages/it/`, `src/pages/pt-BR/` (generated locale pages, if they exist from a prior `i18n:generate` run)

---

## Conventions

- **Locales:** `en` (default, no prefix), `es`, `it`, `de`, `pt-BR`. `fr` excluded (matches current behavior).
- **URL shape:** English = `/about/` (no prefix); other locales = `/es/about/`, `/de/prayers/`. `trailingSlash: "always"`.
- **Key lookup:** `t("navbar.prayers")` → `m["navbar.prayers"]()` (Paraglide preserves dotted nested keys via bracket notation).
- **Dynamic keys:** `t(\`sins.${id}.text\`)` → `m[\`sins.${id}.text\`]()`. Paraglide generates functions for every key in the JSON; dynamic lookup via bracket notation works.
- **Markup messages:** `m["key"]()` returns a string containing HTML. Render with `set:html` in Astro, `dangerouslySetInnerHTML` in React.
- **Verification:** `npm run build` (full SSG build), `npm run lint`, `npx astro check`. No test framework exists; we add `node --test` for the conversion script only.
- **The `src/paraglide/` directory** is generated by the Vite plugin at build time and should be added to `.gitignore`.

---

### Task 1: Install Paraglide and create project config

**Files:**

- Create: `project.inlang/settings.json`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install Paraglide**

Run: `npm install @inlang/paraglide-js`

This adds the Paraglide compiler + Vite plugin. It does NOT add `i18next` or `react-i18next` — those will be removed later.

- [ ] **Step 2: Create the Paraglide project config**

Create `project.inlang/settings.json`:

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "es", "it", "de", "pt-BR"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-i18next@latest/dist/index.js"
  ],
  "plugin.inlang.i18next": {
    "pathPattern": "./public/locales/{locale}/translation.json"
  }
}
```

This tells Paraglide to read the existing i18next JSON files (nested keys, `{{variable}}` interpolation) and compile them into typed message functions. The `pathPattern` points at the same `public/locales/` directory Astro already serves statically.

- [ ] **Step 3: Add generated paraglide dir to .gitignore**

Add to `.gitignore`:

```
# Paraglide generated files
src/paraglide/
```

- [ ] **Step 4: Commit**

```bash
git add project.inlang/ package.json package-lock.json .gitignore
git commit -m "feat(i18n): install Paraglide JS with i18next plugin for existing JSON"
```

---

### Task 2: Configure Astro — Vite plugin, middleware, i18n routing

**Files:**

- Modify: `astro.config.mjs`
- Create: `src/middleware.ts`

- [ ] **Step 1: Add Paraglide Vite plugin to astro.config.mjs**

Replace `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

// https://astro.build/config
export default defineConfig({
  site: "https://confessit.app",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [react()],
  i18n: {
    defaultLocale: "en",
    locales: ["de", "en", "es", "it", "pt-BR"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        strategy: ["url", "globalVariable", "baseLocale"],
      }),
    ],
  },
});
```

Key changes from original:

- Removed `astroI18next()` integration.
- Added `paraglideVitePlugin` with `strategy: ["url", "globalVariable", "baseLocale"]` — the `globalVariable` strategy is required for SSG (stores locale in a global during build-time rendering).
- Added `routing: { prefixDefaultLocale: false }` (was implicit via astro-i18next's `showDefaultLocale: false`).

- [ ] **Step 2: Create middleware for SSG locale setting**

Create `src/middleware.ts`:

```typescript
import { defineMiddleware } from "astro:middleware";
import { assertIsLocale, baseLocale, setLocale } from "./paraglide/runtime.js";

export const onRequest = defineMiddleware((context, next) => {
  setLocale(assertIsLocale(context.currentLocale ?? baseLocale), {
    reload: false,
  });
  return next();
});
```

This runs before each page render (both during SSG build and on the client). `context.currentLocale` is set by Astro's native i18n from the URL path. `setLocale()` stores it in the global variable (for SSG) so all `m["key"]()` calls use the correct locale. `reload: false` because we're not in a client-side navigation context.

- [ ] **Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: dev server starts. Paraglide compiles the JSON and generates `src/paraglide/messages.js` + `src/paraglide/runtime.js`. You may see warnings about the `<0>...</0>` tags in messages being treated as literal text — that's expected and will be fixed in Task 3.

If the dev server fails, check:

- `project.inlang/settings.json` path is correct
- `@inlang/paraglide-js` is installed
- No TypeScript errors in `src/middleware.ts`

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/middleware.ts
git commit -m "feat(i18n): add Paraglide Vite plugin + SSG middleware to Astro config"
```

---

### Task 3: Write and run the markup conversion script

**Files:**

- Create: `scripts/convert-markup.mjs`
- Create: `test/convert-markup.test.mjs`
- Modify: `public/locales/en/translation.json` (and es, de, it, pt-BR)

The 11 messages using i18next's indexed `<Trans>` format (`<0>...</0>`) need to be converted to actual HTML tags in the JSON, because Paraglide's i18next plugin treats `<0>...</0>` as literal text. The conversion cross-references the `<Trans>` source blocks to determine which HTML tag each index maps to.

The 15 messages using named HTML tags (`<strong>`, `<b>`, `<br />`) already contain actual HTML and need NO conversion — they'll render correctly via `set:html`.

- [ ] **Step 1: Write the failing test**

Create `test/convert-markup.test.mjs`:

```javascript
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const { convertMarkup } = await import("../scripts/convert-markup.mjs");

function makeTmpProject() {
  const root = mkdtempSync(join(tmpdir(), "markup-test-"));
  const locales = join(root, "public", "locales");
  const src = join(root, "src");
  mkdirSync(join(locales, "en"), { recursive: true });
  mkdirSync(join(locales, "es"), { recursive: true });
  mkdirSync(src, { recursive: true });
  return {
    root,
    locales,
    src,
    cleanup: () => rmSync(root, { recursive: true, force: true }),
  };
}

test("converts indexed <0> tags to actual HTML from Trans source", () => {
  const { root, locales, src, cleanup } = makeTmpProject();

  // Source file with a <Trans> block
  writeFileSync(
    join(src, "about.astro"),
    `<Trans i18nKey="about.this_website">\n  This web app (<a href="/">confessit.app</a>) works on computers, and it's based on the <a href="/about-confessit-android">ConfessIt Android App</a>.\n</Trans>`,
  );

  // JSON with indexed markup
  writeFileSync(
    join(locales, "en", "translation.json"),
    JSON.stringify({
      about: {
        this_website:
          "This web app (<0>confessit.app</0>) works on computers, and it's based on the <1>ConfessIt Android App</1>.",
      },
    }),
  );
  writeFileSync(
    join(locales, "es", "translation.json"),
    JSON.stringify({
      about: {
        this_website:
          "Esta aplicación web (<0>confessit.app</0>) funciona en computadoras, y está basada en <1>ConfessIt Android App</1>.",
      },
    }),
  );

  convertMarkup({
    srcDir: src,
    localesDir: locales,
    locales: ["en", "es"],
  });

  const en = JSON.parse(
    readFileSync(join(locales, "en", "translation.json"), "utf8"),
  );
  const es = JSON.parse(
    readFileSync(join(locales, "es", "translation.json"), "utf8"),
  );

  assert.equal(
    en.about.this_website,
    'This web app (<a href="/">confessit.app</a>) works on computers, and it\'s based on the <a href="/about-confessit-android">ConfessIt Android App</a>.',
  );
  assert.equal(
    es.about.this_website,
    'Esta aplicación web (<a href="/">confessit.app</a>) funciona en computadoras, y está basada en <a href="/about-confessit-android">ConfessIt Android App</a>.',
  );
  cleanup();
});

test("leaves named HTML tags (<strong>, <b>, <br />) unchanged", () => {
  const { root, locales, src, cleanup } = makeTmpProject();

  writeFileSync(
    join(src, "help.astro"),
    `<Trans i18nKey="help.step_1">In the <strong>Examine</strong> tab</Trans>`,
  );

  writeFileSync(
    join(locales, "en", "translation.json"),
    JSON.stringify({ help: { step_1: "In the <strong>Examine</strong> tab" } }),
  );

  convertMarkup({
    srcDir: src,
    localesDir: locales,
    locales: ["en"],
  });

  const en = JSON.parse(
    readFileSync(join(locales, "en", "translation.json"), "utf8"),
  );
  assert.equal(en.help.step_1, "In the <strong>Examine</strong> tab");
  cleanup();
});

test("handles <kbd> with class attribute", () => {
  const { root, locales, src, cleanup } = makeTmpProject();

  writeFileSync(
    join(src, "WelcomeModal.jsx"),
    `<Trans t={t} i18nKey="welcome.body">tap the <kbd className="kbd kbd-sm">+</kbd> button</Trans>`,
  );

  writeFileSync(
    join(locales, "en", "translation.json"),
    JSON.stringify({ welcome: { body: "tap the <5>+</5> button" } }),
  );

  convertMarkup({
    srcDir: src,
    localesDir: locales,
    locales: ["en"],
  });

  const en = JSON.parse(
    readFileSync(join(locales, "en", "translation.json"), "utf8"),
  );
  assert.equal(
    en.welcome.body,
    'tap the <kbd class="kbd kbd-sm">+</kbd> button',
  );
  cleanup();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/convert-markup.test.mjs`
Expected: FAIL — `Cannot find module '../scripts/convert-markup.mjs'`.

- [ ] **Step 3: Write the conversion script**

Create `scripts/convert-markup.mjs`:

```javascript
#!/usr/bin/env node
/**
 * One-time script: converts i18next <Trans> indexed markup (<0>...</0>) to
 * actual HTML tags in translation JSON files. Cross-references <Trans> blocks
 * in source files to determine which HTML tag each index maps to.
 *
 * Named HTML tags (<strong>, <b>, <br />) are left unchanged — they already
 * contain actual HTML that renders correctly via set:html.
 *
 * Usage: node scripts/convert-markup.mjs
 * Or programmatically: import { convertMarkup } from "./scripts/convert-markup.mjs"
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";

/**
 * Parse a <Trans> block to build an index-to-HTML-tag mapping.
 * Returns a Map<number, { open: string, close: string }>
 */
function parseTransBlock(content, i18nKey) {
  // Find the <Trans i18nKey="..."> block
  const transRe = new RegExp(
    `<Trans[^>]*i18nKey=["']${escapeRegex(i18nKey)}["'][^>]*>([\\s\\S]*?)</Trans>`,
    "i",
  );
  const match = content.match(transRe);
  if (!match) return null;

  const inner = match[1];
  const mapping = new Map();
  let index = 0;

  // Match all JSX elements: <tag ...> or <tag ... />
  // Also handle className -> class conversion for HTML compatibility
  const elementRe = /<([A-Za-z][A-Za-z0-9]*)((?:\s+[^>]*?)?)\s*(\/?)>/g;
  let elMatch;
  while ((elMatch = elementRe.exec(inner)) !== null) {
    const tag = elMatch[1];
    let attrs = elMatch[2] || "";
    const selfClosing = elMatch[3] === "/";

    // Convert React className to HTML class
    attrs = attrs.replace(/\bclassName=/g, "class=");

    if (selfClosing) {
      mapping.set(index, { open: `<${tag}${attrs} />`, close: "" });
    } else {
      mapping.set(index, { open: `<${tag}${attrs}>`, close: `</${tag}>` });
    }
    index++;
  }

  return mapping;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Walk all .astro and .jsx files in srcDir, find <Trans> blocks,
 * and build a key-to-mapping lookup.
 */
function buildMappingFromSource(srcDir) {
  const keyMappings = new Map(); // i18nKey -> Map<index, {open, close}>

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(astro|jsx)$/.test(entry.name)) {
        const content = readFileSync(full, "utf8");
        // Find all i18nKey values
        const keyRe = /<Trans[^>]*i18nKey=["']([^"']+)["']/g;
        let keyMatch;
        while ((keyMatch = keyRe.exec(content)) !== null) {
          const key = keyMatch[1];
          const mapping = parseTransBlock(content, key);
          if (mapping && mapping.size > 0) {
            keyMappings.set(key, mapping);
          }
        }
      }
    }
  }

  walk(srcDir);
  return keyMappings;
}

/**
 * Convert a single JSON value: replace <N>...</N> with actual HTML tags.
 */
function convertValue(value, mapping) {
  if (typeof value !== "string") return value;
  if (!/<\d+>/.test(value)) return value; // no indexed markup

  let result = value;
  for (const [index, { open, close }] of mapping) {
    // Replace <N> with opening tag
    result = result.replaceAll(`<${index}>`, open);
    // Replace </N> with closing tag (if not self-closing)
    if (close) {
      result = result.replaceAll(`</${index}>`, close);
    }
  }
  return result;
}

/**
 * Recursively walk a JSON object and convert all string values.
 */
function convertObject(obj, mapping) {
  if (typeof obj === "string") return convertValue(obj, mapping);
  if (obj === null || typeof obj !== "object") return obj;
  const result = Array.isArray(obj) ? [] : {};
  for (const key of Object.keys(obj)) {
    result[key] = convertObject(obj[key], mapping);
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
    for (const [key, mapping] of keyMappings) {
      // Navigate to the nested key
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
        const converted = convertValue(original, mapping);
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

// CLI entrypoint
const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(process.argv[1]);
if (isMain) {
  convertMarkup({
    srcDir: resolve("src"),
    localesDir: resolve("public", "locales"),
    locales: ["en", "es", "de", "it", "pt-BR"],
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/convert-markup.test.mjs`
Expected: PASS — all 3 tests pass.

- [ ] **Step 5: Run the conversion on real data**

First, back up the current JSON:

```bash
cp -r public/locales public/locales.bak
```

Run: `node scripts/convert-markup.mjs`
Expected: output like "Found 11 keys with indexed markup to convert." followed by per-locale conversion counts. Each of `en`, `es`, `de`, `it`, `pt-BR` should show ~11 converted keys.

- [ ] **Step 6: Verify the conversion results**

Check that indexed tags were replaced with actual HTML:

```bash
node -e "const o=require('./public/locales/en/translation.json'); console.log(o.about.this_website); console.log(); console.log(o.welcome.body)"
```

Expected: `<0>...</0>` tags replaced with `<a href="...">...</a>` and `<kbd class="...">...</kbd>`. Named tags like `<strong>`, `<b>`, `<br />` should be unchanged.

If any key still has `<N>` tags, the script didn't find the matching `<Trans>` block — check the source file and the i18nKey spelling.

- [ ] **Step 7: Remove the backup**

Once verified:

```bash
rm -rf public/locales.bak
```

- [ ] **Step 8: Commit**

```bash
git add scripts/convert-markup.mjs test/convert-markup.test.mjs public/locales/
git commit -m "feat(i18n): convert i18next indexed markup to HTML tags in translation JSON"
```

---

### Task 4: Restructure pages — shared content components + [locale] routes

**Files:**

- Create: `src/i18n/paths.ts`
- Create: `src/components/pages/HomePage.astro`
- Create: `src/components/pages/AboutPage.astro`
- Create: `src/components/pages/AboutConfessionPage.astro`
- Create: `src/components/pages/AboutAndroidPage.astro`
- Create: `src/components/pages/PrayersPage.astro`
- Create: `src/components/pages/HelpPage.astro`
- Create: `src/pages/[locale]/index.astro`
- Create: `src/pages/[locale]/about.astro`
- Create: `src/pages/[locale]/about-confession.astro`
- Create: `src/pages/[locale]/about-confessit-android.astro`
- Create: `src/pages/[locale]/prayers.astro`
- Create: `src/pages/[locale]/help.astro`

This task extracts page bodies into shared components and creates `[locale]/` route files. The shared components contain the actual page content (with `t()` → `m["key"]()` conversions done in Task 5). The root pages and `[locale]` pages are thin wrappers that render the shared component inside the appropriate layout. The middleware (Task 2) handles locale detection — the shared component doesn't need to know which locale is active.

- [ ] **Step 1: Create the shared getStaticPaths helper**

Create `src/i18n/paths.ts`:

```typescript
import { locales, defaultLocale } from "../paraglide/runtime.js";

export function localeStaticPaths() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({
      params: { locale },
    }));
}
```

This returns only non-default locales because English is served by the root pages (no `/en/` prefix).

- [ ] **Step 2: Extract page bodies into shared components**

For each page, create a shared component in `src/components/pages/` that contains the page body (everything between the layout tags). At this point, copy the content as-is — the `t()` → `m["key"]()` conversion happens in Task 5.

For `HomePage.astro` — extract the body of `index.astro` (the `<main>` with the `<ConfessIt>` island):

```astro
---
import ConfessIt from "@components/ConfessIt.jsx";
---

<main class="flex-1 overflow-hidden">
  <ConfessIt client:only="react" />
</main>
```

For `AboutPage.astro` — extract the body of `about.astro` (the `<div class="prose">` with all content). Copy everything between `<Container title={...}>` and `</Container>`. At this stage, keep the existing `t()` calls — they'll be converted in Task 5.

For `AboutConfessionPage.astro` — extract from `about-confession.astro`.
For `AboutAndroidPage.astro` — extract from `about-confessit-android.astro`.
For `PrayersPage.astro` — extract from `prayers.astro`.
For `HelpPage.astro` — extract from `help.astro`.

Each component should be self-contained: import what it needs, render its content, no `<Layout>` or `<Container>` wrapper (the parent page provides that).

- [ ] **Step 3: Create [locale]/ route pages**

Each `[locale]/` page is a thin wrapper: `getStaticPaths` + layout + shared component.

`src/pages/[locale]/index.astro`:

```astro
---
import Layout from "@layouts/Layout.astro";
import HomePage from "@components/pages/HomePage.astro";
import { localeStaticPaths } from "@i18n/paths";

export const getStaticPaths = localeStaticPaths;
---

<Layout title="ConfessIt" bodyClass="h-[100dvh] overflow-hidden flex flex-col">
  <HomePage />
</Layout>
```

`src/pages/[locale]/about.astro`:

```astro
---
import Container from "@layouts/Container.astro";
import AboutPage from "@components/pages/AboutPage.astro";
import { localeStaticPaths } from "@i18n/paths";

export const getStaticPaths = localeStaticPaths;
---

<Container title="About ConfessIt">
  <AboutPage />
</Container>
```

Create the remaining 4 `[locale]/` pages following the same pattern (`about-confession.astro`, `about-confessit-android.astro`, `prayers.astro`, `help.astro`), using the appropriate layout wrapper and shared component.

- [ ] **Step 4: Simplify root pages to thin wrappers**

`src/pages/index.astro`:

```astro
---
import Layout from "@layouts/Layout.astro";
import HomePage from "@components/pages/HomePage.astro";
---

<Layout title="ConfessIt" bodyClass="h-[100dvh] overflow-hidden flex flex-col">
  <HomePage />
</Layout>
```

`src/pages/about.astro`:

```astro
---
import Container from "@layouts/Container.astro";
import AboutPage from "@components/pages/AboutPage.astro";
---

<Container title="About ConfessIt">
  <AboutPage />
</Container>
```

Do the same for `about-confession.astro`, `about-confessit-android.astro`, `prayers.astro`, `help.astro`. Each root page becomes a 5-line wrapper that imports the shared component and wraps it in the layout. Remove all `import { t, changeLanguage } from "i18next"` and `import { Trans } from "astro-i18next/components"` from the root pages — those imports move to the shared components.

- [ ] **Step 5: Delete old generated locale page directories**

If `src/pages/de/`, `src/pages/es/`, `src/pages/it/`, `src/pages/pt-BR/` exist (from a prior `npm run i18n:generate`), delete them:

```bash
rm -rf src/pages/de src/pages/es src/pages/it src/pages/pt-BR
```

These are replaced by the `[locale]/` dynamic route.

- [ ] **Step 6: Verify dev server serves all locales**

Run: `npm run dev`

Check in a browser:

- `http://localhost:4321/` — English homepage (should still work, though text may be broken since shared components still use `t()`)
- `http://localhost:4321/es/` — Spanish homepage route exists (may 404 or error since `t()` isn't initialized — that's OK, will be fixed in Task 5)
- `http://localhost:4321/de/prayers/` — German prayers route exists

The key verification is that the routes exist and are served. Content will be broken until Task 5 converts the call sites.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/paths.ts src/components/pages/ src/pages/
git commit -m "refactor(i18n): extract page content into shared components + create [locale] routes"
```

---

### Task 5: Create ParaglideTrans component and convert Astro call sites

**Files:**

- Create: `src/components/ParaglideTrans.astro`
- Modify: `src/components/pages/HomePage.astro`
- Modify: `src/components/pages/AboutPage.astro`
- Modify: `src/components/pages/AboutConfessionPage.astro`
- Modify: `src/components/pages/AboutAndroidPage.astro`
- Modify: `src/components/pages/PrayersPage.astro`
- Modify: `src/components/pages/HelpPage.astro`

This is the bulk call-site conversion for Astro pages. The transformation rules:

- `t("key")` → `m["key"]()`
- `t("key", "default")` → `m["key"]()` (default value dropped — English JSON is the default)
- `t("key", { variable: "value" })` → `m["key"]({ variable: "value" })`
- `<Trans i18nKey="key">...</Trans>` → `<ParaglideTrans key="key" />` (renders via `set:html`)
- `import { t } from "i18next"` → `import { m } from "../paraglide/messages.js"` (adjust path as needed)

- [ ] **Step 1: Create the ParaglideTrans component**

Create `src/components/ParaglideTrans.astro`:

```astro
---
import { m } from "../paraglide/messages.js";

export interface Props {
  key: string;
}
const { key } = Astro.props;
---

<Fragment set:html={m[key]()} />
```

This is a direct replacement for `<Trans i18nKey="key">...</Trans>`. The translation JSON (after Task 3's conversion) contains actual HTML tags, so `set:html` renders them correctly.

- [ ] **Step 2: Convert each shared page component**

For each of the 6 shared page components in `src/components/pages/`:

1. Change `import { t, changeLanguage } from "i18next"` to `import { m } from "../../paraglide/messages.js"`. Remove `changeLanguage` entirely (middleware handles locale).
2. Change `import { Trans } from "astro-i18next/components"` to `import ParaglideTrans from "@components/ParaglideTrans.astro"`.
3. Replace all `t("key")` calls with `m["key"]()`.
4. Replace all `t("key", "default value")` calls with `m["key"]()` (drop the default).
5. Replace all `t("key", { variable: val })` calls with `m["key"]({ variable: val })`.
6. Replace all `<Trans i18nKey="key">...</Trans>` with `<ParaglideTrans key="key" />` (drop the children — the HTML is in the JSON).

**Example — `AboutPage.astro` before:**

```astro
---
import { t, changeLanguage } from "i18next";
import { Trans } from "astro-i18next/components";
import { Picture } from "astro:assets";
import mockupImage from "@images/mockup.png";

changeLanguage("en");
---

<div class="prose lg:prose-lg mx-auto max-w-[48rem]">
  <h1>{t("about.about_confessit", "About ConfessIt")}</h1>
  <p>
    <Trans i18nKey="about.about_confessit_text"><b>ConfessIt</b> is...</Trans>
  </p>
  ...
</div>
```

**After:**

```astro
---
import { m } from "../../paraglide/messages.js";
import ParaglideTrans from "@components/ParaglideTrans.astro";
import { Picture } from "astro:assets";
import mockupImage from "@images/mockup.png";
---

<div class="prose lg:prose-lg mx-auto max-w-[48rem]">
  <h1>{m["about.about_confessit"]()}</h1>
  <p><ParaglideTrans key="about.about_confessit_text" /></p>
  ...
</div>
```

Apply this transformation to all 6 page components. The `DummyTranslation.jsx` patterns (like `t("commandments.1.description", "long text")`) are NOT in the page components — they're in `src/data/DummyTranslation.jsx` which will be deleted in Task 8.

- [ ] **Step 3: Verify dev server renders pages**

Run: `npm run dev`

Check:

- `http://localhost:4321/` — English homepage renders (the `<ConfessIt>` island may still be broken — fixed in Task 6)
- `http://localhost:4321/about/` — English about page renders with formatted text (bold, links, etc.)
- `http://localhost:4321/es/about/` — Spanish about page renders in Spanish
- `http://localhost:4321/de/prayers/` — German prayers page renders with `<br />` line breaks

If `m["key"]` is undefined for any key, check that the key exists in `public/locales/en/translation.json` and that the Paraglide compiler generated it (check `src/paraglide/messages.js`).

- [ ] **Step 4: Commit**

```bash
git add src/components/ParaglideTrans.astro src/components/pages/
git commit -m "feat(i18n): convert Astro page call sites from t()/Trans to Paraglide m[]/ParaglideTrans"
```

---

### Task 6: Convert React island call sites

**Files:**

- Modify: `src/components/ConfessIt.jsx`
- Modify: `src/components/ExamineList.jsx`
- Modify: `src/components/SinsList.jsx`
- Modify: `src/components/Walkthrough.jsx`
- Modify: `src/components/WelcomeModal.jsx`
- Modify: `src/components/AddSinModal.jsx`
- Modify: `src/components/SpeechBubble.jsx`

Transformation rules for React components:

- `import { t } from "i18next"` → `import { m } from "../paraglide/messages.js"`
- `import i18next from "i18next"` → `import { getLocale } from "../paraglide/runtime.js"`
- `import { useTranslation } from "react-i18next"` → REMOVE (not needed)
- `import { Trans, useTranslation } from "react-i18next"` → REMOVE both
- `const { t } = useTranslation()` → REMOVE (use `m` directly)
- `t("key")` → `m["key"]()`
- `t("key", "default")` → `m["key"]()`
- `t("key", { variable: val })` → `m["key"]({ variable: val })`
- `t(\`sins.${id}.text\`)` → `m[\`sins.${id}.text\`]()`
- `i18next.language` → `getLocale()`
- `<Trans t={t} i18nKey="key">...</Trans>` → `<span dangerouslySetInnerHTML={{ __html: m["key"]() }} />`

- [ ] **Step 1: Convert simple components (AddSinModal, SpeechBubble, ExamineList, ConfessIt)**

**`src/components/SpeechBubble.jsx`** — change `import { t } from "i18next"` to `import { m } from "../paraglide/messages.js"`, and `t("priestbubble.priest", "Priest")` to `m["priestbubble.priest"]()`.

**`src/components/AddSinModal.jsx`** — same import change. Replace all `t("key", "default")` with `m["key"]()`.

**`src/components/ExamineList.jsx`** — change import. Replace:

- `t(\`sins.${sin.sin_id}.text\`)` → `m[\`sins.${sin.sin_id}.text\`]()`
- `t(\`commandments.${c.commandment_id}.title\`)` → `m[\`commandments.${c.commandment_id}.title\`]()`
- `t(\`commandments.${c.commandment_id}.text\`)` → `m[\`commandments.${c.commandment_id}.text\`]()`

These are dynamic keys — Paraglide generates a function for every key in the JSON, and bracket notation (`m["sins.1.text"]()`) looks them up at runtime. This is the documented pattern for data-driven keys.

**`src/components/ConfessIt.jsx`** — change import. Replace:

- `t(\`sins.${id}.text_past\`)` → `m[\`sins.${id}.text_past\`]()`
- `t("examine_list.examine", "Examine")` → `m["examine_list.examine"]()`
- `t("sins_list.review", "Review")` → `m["sins_list.review"]()`
- `t("walkthrough.walkthrough", "Walkthrough")` → `m["walkthrough.walkthrough"]()`
- `t("addbutton.add-custom-sin")` → `m["addbutton.add-custom-sin"]()`

- [ ] **Step 2: Convert useTranslation components (SinsList, Walkthrough)**

**`src/components/SinsList.jsx`**:

Remove `import i18next from "i18next"` and `import { useTranslation } from "react-i18next"`. Add `import { m } from "../paraglide/messages.js"` and `import { getLocale } from "../paraglide/runtime.js"`. Remove `const { t } = useTranslation()`. Replace `i18next.language` with `getLocale()`. Replace all `t("key", { defaultValue: "...", date: ... })` with `m["key"]({ date: ... })`.

Specifically:

```jsx
// Before:
const { t } = useTranslation();
const locale = i18next.language;
t("sins_list.last_confession_on", {
  defaultValue: "Your last confession was on {{date}}.",
  date: lastConfessionDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
});

// After:
const locale = getLocale();
m["sins_list.last_confession_on"]({
  date: lastConfessionDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
});
```

**`src/components/Walkthrough.jsx`**:

Remove `import i18next from "i18next"` and `import { useTranslation, Trans } from "react-i18next"`. Add `import { m } from "../paraglide/messages.js"` and `import { getLocale } from "../paraglide/runtime.js"`. Remove `const { t } = useTranslation()`. Replace `i18next.language` with `getLocale()`.

For the `<Trans>` block:

```jsx
// Before:
<Trans t={t} i18nKey="prayers.act_of_contrition_text">
  My God,<br />...
</Trans>

// After:
<span dangerouslySetInnerHTML={{ __html: m["prayers.act_of_contrition_text"]() }} />
```

Replace all `t("key", "default")` and `t("key", { defaultValue: "...", ... })` with `m["key"]({...})` (dropping `defaultValue`).

For the interpolation:

```jsx
// Before:
t("walkthrough.bless_me_father", {
  defaultValue:
    "Bless me father, for I have sinned. It has been {{timeSinceLastConfession}} since my last confession, and these are my sins:",
  timeSinceLastConfession: getTimeSinceLastConfession(),
});

// After:
m["walkthrough.bless_me_father"]({
  timeSinceLastConfession: getTimeSinceLastConfession(),
});
```

- [ ] **Step 3: Convert WelcomeModal.jsx**

Remove `import { Trans, useTranslation } from "react-i18next"`. Add `import { m } from "../paraglide/messages.js"`. Remove `const { t } = useTranslation()`.

For the `<Trans>` block:

```jsx
// Before:
<Trans t={t} i18nKey="welcome.body">
  is a tool to help Roman Catholics walk through an examination of conscience...
  <strong>Yes</strong>... <kbd className="kbd kbd-sm">+</kbd>...
</Trans>

// After:
<span dangerouslySetInnerHTML={{ __html: m["welcome.body"]() }} />
```

Replace `t("welcome.title", "Welcome!")` with `m["welcome.title"]()` and `t("welcome.ok", "OK")` with `m["welcome.ok"]()`.

- [ ] **Step 4: Verify dev server renders the React island**

Run: `npm run dev`

Check `http://localhost:4321/`:

- The ConfessIt app (Examine/Review/Walkthrough tabs) should render with English text
- The Welcome modal should show formatted text (bold, kbd elements)
- The Walkthrough tab should show the Act of Contrition prayer with line breaks

Check `http://localhost:4321/es/`:

- The ConfessIt app should render with Spanish text
- The `getLocale()` calls should return `"es"`

If the island shows `undefined` or key strings, check that `src/paraglide/messages.js` was generated and the import path is correct.

- [ ] **Step 5: Commit**

```bash
git add src/components/ConfessIt.jsx src/components/ExamineList.jsx src/components/SinsList.jsx src/components/Walkthrough.jsx src/components/WelcomeModal.jsx src/components/AddSinModal.jsx src/components/SpeechBubble.jsx
git commit -m "feat(i18n): convert React island call sites from i18next/react-i18next to Paraglide"
```

---

### Task 7: Update Layout.astro

**Files:**

- Modify: `src/layouts/Layout.astro`

`Layout.astro` currently imports from `astro-i18next` and `i18next`. Replace with Paraglide runtime functions. The `<html lang>`, nav links, hreflang tags, and language selector all need updating.

- [ ] **Step 1: Update imports and html lang**

Replace the top of `src/layouts/Layout.astro`:

```astro
---
import { m } from "../paraglide/messages.js";
import {
  getLocale,
  localizeHref,
  locales,
  defaultLocale,
} from "../paraglide/runtime.js";
import { TrashIcon, PlusIcon } from "@heroicons/react/16/solid";

import "@styles/base.css";
interface Props {
  title: string;
  bodyClass?: string;
}

const { title, bodyClass = "" } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
const currentLocale = getLocale();
---
```

Changes:

- `import i18next, { t } from "i18next"` → `import { m } from "../paraglide/messages.js"`
- `import { localizePath } from "astro-i18next"` → `localizeHref` from Paraglide runtime
- `import { HeadHrefLangs, LanguageSelector } from "astro-i18next/components"` → removed (inlined below)
- `i18next.language` → `getLocale()`
- `localizePath("/path")` → `localizeHref("/path")`
- `t("key")` → `m["key"]()`

- [ ] **Step 2: Replace all t() and localizePath() calls in the template**

In the navbar, replace every `t("navbar.prayers")` with `m["navbar.prayers"]()`, etc. Replace every `localizePath("/prayers")` with `localizeHref("/prayers")`.

The `localizeHref` function from Paraglide returns the locale-prefixed URL for the current locale — same behavior as `localizePath` from astro-i18next.

- [ ] **Step 3: Replace HeadHrefLangs with inline hreflang links**

Replace `<HeadHrefLangs />` with:

```astro
{
  locales.map((lng) => (
    <link
      rel="alternate"
      hreflang={lng}
      href={localizeHref(Astro.url.pathname, { locale: lng })}
    />
  ))
}
```

This emits one `<link rel="alternate">` per supported locale, pointing to the locale-prefixed version of the current page. Same behavior as `astro-i18next`'s `HeadHrefLangs`.

- [ ] **Step 4: Replace LanguageSelector with inline select**

Replace the two `<LanguageSelector>` usages with a small inline `<select>`. The `LanguageSelector` from `astro-i18next` used `locale-emoji` and `iso-639-1` — we keep those deps for the same UX.

Add these imports at the top of the frontmatter:

```astro
import localeEmoji from "locale-emoji"; import ISO6391 from "iso-639-1";
```

Then replace each `<LanguageSelector ... />` with:

```astro
<select
  onchange="location = this.value;"
  showFlag={true}
  class="select select-sm text-xs select-bordered mt-8 py-1 w-42 font-noto"
>
  {
    locales.map((lng) => {
      const flag = localeEmoji(lng) ? localeEmoji(lng) + " " : "";
      const nativeName =
        lng === "pt-BR" ? "Português" : ISO6391.getNativeName(lng) || lng;
      return (
        <option
          value={localizeHref(Astro.url.pathname, { locale: lng })}
          selected={lng === currentLocale}
        >
          {flag + nativeName}
        </option>
      );
    })
  }
</select>
```

Use the appropriate `class` for each of the two locations (the mobile dropdown vs. the desktop navbar). The `languageMapping={{ "pt-BR": "Português" }}` is inlined as the `pt-BR` special case.

- [ ] **Step 5: Update the meta description**

Replace `t("about.about_confessit_text").replace(...)` with `m["about.about_confessit_text"]().replace(/<\/?\d+>/g, "")`. Actually, after Task 3's conversion, the JSON no longer has `<N>` tags — it has actual HTML tags. So the regex should strip all HTML: `.replace(/<[^>]+>/g, "")`.

- [ ] **Step 6: Verify layout renders**

Run: `npm run dev`

Check:

- `http://localhost:4321/` — navbar renders, language selector shows 5 locales with flags, nav links point to `/prayers/`, `/about/` (no `/en/` prefix)
- `http://localhost:4321/es/` — nav links point to `/es/prayers/`, `/es/about/`, language selector shows Spanish as selected
- View page source — `<html lang="es">` on the Spanish page, `<html lang="en">` on English
- `<link rel="alternate" hreflang="en" ...>` and 4 others in `<head>`

- [ ] **Step 7: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(i18n): update Layout.astro to use Paraglide runtime (getLocale, localizeHref, inline hreflang/lang-selector)"
```

---

### Task 8: Remove old packages, configs, and generated files

**Files:**

- Modify: `package.json`
- Delete: `astro-i18next.config.mjs`
- Delete: `i18next-scanner.config-en.cjs`
- Delete: `i18next-scanner.config-langs.cjs`
- Delete: `src/data/DummyTranslation.jsx`

- [ ] **Step 1: Remove old i18n packages**

```bash
npm uninstall astro-i18next i18next react-i18next
```

This removes the three old i18n packages. `astro-i18next` is the Node 22 blocker. `i18next` and `react-i18next` are no longer used (all call sites now use Paraglide).

- [ ] **Step 2: Remove old config files**

```bash
git rm astro-i18next.config.mjs i18next-scanner.config-en.cjs i18next-scanner.config-langs.cjs src/data/DummyTranslation.jsx
```

- `astro-i18next.config.mjs` — replaced by `project.inlang/settings.json` + native Astro i18n config.
- `i18next-scanner.config-*.cjs` — Paraglide reads JSON directly; no source-code scanning needed.
- `DummyTranslation.jsx` — existed only so i18next-scanner would pick up dynamic keys (`sins.${id}.text`). Paraglide compiles all keys from the JSON directly.

- [ ] **Step 3: Remove the i18n:generate script from package.json**

In `package.json`, remove the `"i18n:generate": "astro-i18next generate"` line from `scripts`. The page generation is now handled by Astro's `[locale]/` dynamic routes — no script needed.

- [ ] **Step 4: Add locale-emoji and iso-639-1 as direct deps**

These were transitive deps of `astro-i18next` and are now used directly in `Layout.astro`:

```bash
npm install locale-emoji iso-639-1
```

- [ ] **Step 5: Verify no remaining i18next/astro-i18next imports**

Run: `grep -rn "from.*i18next\|from.*astro-i18next" src/ --include="*.astro" --include="*.jsx" --include="*.js" --include="*.ts"`
Expected: no matches. Every import should be from `../paraglide/messages.js` or `../paraglide/runtime.js`.

If any remain, convert them.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(i18n): remove astro-i18next, i18next, react-i18next + old scanner configs and DummyTranslation"
```

---

### Task 9: Verify build on Node 22 + manual testing

**Files:** (none — verification only)

This is the final verification. The entire point of the migration is to unblock Node 22.

- [ ] **Step 1: Run the full build on current Node**

Run: `npm run build`
Expected: build completes with no errors. Output in `dist/` should include:

- `dist/index.html` (English homepage)
- `dist/about/index.html`, `dist/prayers/index.html`, etc. (English pages)
- `dist/es/index.html`, `dist/es/about/index.html`, etc. (Spanish pages)
- `dist/de/`, `dist/it/`, `dist/pt-BR/` directories with all pages
- `dist/locales/{en,es,it,de,pt-BR}/translation.json` (copied from public/)

If the build fails, read the error and fix. Common issues:

- Missing `locale-emoji` or `iso-639-1` types — add `src/types/locale-emoji.d.ts` with `declare module "locale-emoji";`
- Paraglide compiler errors for keys with special characters — check `project.inlang/settings.json` config
- Import path errors — check that `src/paraglide/messages.js` and `src/paraglide/runtime.js` exist (generated by the Vite plugin)

- [ ] **Step 2: Run lint and typecheck**

Run: `npm run lint && npx astro check`
Expected: both pass. Fix any issues.

- [ ] **Step 3: Preview and spot-check pages**

Run: `npm run preview`

Open these URLs in a browser and verify translations render correctly:

- `http://localhost:4321/` — English homepage, `<html lang="en">`, nav links without `/en/` prefix
- `http://localhost:4321/about/` — English about page, `<ParaglideTrans>` blocks render with `<b>`, `<a>`, `<strong>` tags
- `http://localhost:4321/es/` — Spanish homepage, `<html lang="es">`, React island renders Spanish text
- `http://localhost:4321/de/prayers/` — German prayers page, `<br />` line breaks render
- `http://localhost:4321/pt-BR/about/` — Portuguese about page, links and formatting intact
- `http://localhost:4321/es/about-confessit-android/` — Spanish Android about page

Check the `<head>`: should contain 5 `<link rel="alternate" hreflang="...">` tags.
Check the language selector: lists 5 locales with flags, switching navigates to the correct locale URL.

- [ ] **Step 4: Verify the React island hydrates with correct locale**

On `http://localhost:4321/es/`:

- The ConfessIt island (Examine tab) should show Spanish commandment titles and sin text
- The Review tab should show Spanish button labels
- The Walkthrough tab should show the Act of Contrition in Spanish with line breaks

This confirms `getLocale()` returns `"es"` in the client-side hydrated React island.

- [ ] **Step 5: Switch to Node 22 and rebuild**

```bash
nvm use 22  # or install Node 22 if needed
rm -rf node_modules package-lock.json
npm install
npm run build
```

Expected: install and build both succeed on Node 22. This is the primary success criterion — the build that was broken by `astro-i18next` on Node 22 now works.

- [ ] **Step 6: Run tests on Node 22**

Run: `node --test test/convert-markup.test.mjs`
Expected: all tests pass.

- [ ] **Step 7: Update .nvmrc**

```bash
echo "22" > .nvmrc
```

- [ ] **Step 8: Commit**

```bash
git add .nvmrc
git commit -m "chore: bump required node version to 22 (unblocked by Paraglide migration)"
```

- [ ] **Step 9: Final grep for any remaining old-i18n references**

Run: `grep -ri "astro-i18next\|astroI18next\|i18next-scanner\|react-i18next\|useTranslation\|changeLanguage" --include="*.{md,mjs,js,ts,astro,json,jsx}" .` (excluding `node_modules`, `dist`, `.git`).
Expected: no matches in source code. Historical references in git log are fine.

If any remain in docs (README, CONTRIBUTING), update them.

---

## Self-Review

**1. Spec coverage:**

- Remove `astro-i18next` (Node 22 blocker): Task 8 removes it. ✓
- Remove `i18next` + `react-i18next`: Task 8 removes them. ✓
- Replace with Paraglide JS: Tasks 1-2 set it up. ✓
- Keep existing translation JSON: JSON files stay at `public/locales/`; only 11 markup keys converted (Task 3). ✓
- Support static site (SSG): Task 2 configures `output: "static"` + `strategy: ["url", "globalVariable", "baseLocale"]` + middleware. ✓
- Preserve URL structure (English no prefix, others prefixed): Task 2 sets `prefixDefaultLocale: false`; Task 4 uses `[locale]` routes for non-default only. ✓
- React island i18n: Task 6 converts all `.jsx` components to use `m["key"]()` directly — no `useTranslation()`, no provider, no init. ✓
- Dynamic keys (`sins.${id}.text`): Task 6 uses `m[\`sins.${id}.text\`]()` bracket notation. ✓
- Markup/`<Trans>` blocks: Task 3 converts JSON; Task 5 creates `ParaglideTrans.astro` for Astro; Task 6 uses `dangerouslySetInnerHTML` for React. ✓
- Node 22 compatibility: Task 9 Step 5 is the explicit Node 22 build verification. ✓

**2. Placeholder scan:** No "TBD", "TODO", "implement later", "Similar to Task N", or "add appropriate error handling". All code blocks contain complete code. Where a transformation is described as a pattern (e.g., "replace all `t("key")` with `m["key"]()`"), the pattern is concrete and the example shows the exact before/after.

**3. Type consistency:**

- `m["key"]()` — used consistently across Tasks 5, 6, 7. Paraglide generates these from the i18next plugin (nested keys preserved via bracket notation per Basics docs). ✓
- `getLocale()` — imported from `../paraglide/runtime.js` in Tasks 6 (SinsList, Walkthrough) and 7 (Layout). ✓
- `localizeHref(path)` / `localizeHref(path, { locale: lng })` — used in Task 7 (Layout nav + hreflang + language selector). ✓
- `localeStaticPaths()` — defined Task 4, used in all 6 `[locale]` pages. ✓
- `ParaglideTrans` component — defined Task 5, used in page components. Props: `{ key: string }`. ✓
- `convertMarkup({ srcDir, localesDir, locales })` — defined Task 3, used in CLI entrypoint. ✓

**4. Ordering correctness:**

- Task 2 (middleware + Vite plugin) must come before Task 5/6 (call-site conversion) because the `src/paraglide/` generated files don't exist until the Vite plugin runs. ✓
- Task 3 (markup conversion) must come before Task 5 (`ParaglideTrans`) because `set:html` needs actual HTML tags, not `<0>...</0>` indexed tags. ✓
- Task 4 (page restructuring) should come before Task 5 (call-site conversion) because the conversion targets the shared page components, not the old root pages. ✓
- Task 8 (remove old packages) must come after Tasks 5-7 (all call sites converted) because removing `i18next` before converting imports would break the build. ✓
- Task 9 (Node 22 verification) is last. ✓

**5. Potential issues identified during review:**

- **`locale-emoji` has no TypeScript types.** May need `declare module "locale-emoji"` in a `.d.ts` file. Noted in Task 9 Step 1.
- **Paraglide `messages.js` import path** varies by file location. Files in `src/components/` use `../paraglide/messages.js`; files in `src/components/pages/` use `../../paraglide/messages.js`; files in `src/layouts/` use `../paraglide/messages.js`. Each task notes the correct relative path.
- **`localizeHref` with `{ locale }` option** — the second argument form is documented in Paraglide's i18n-routing docs. If it doesn't work as expected, fall back to constructing the URL manually: `/${lng}${Astro.url.pathname}` for non-default locales.
- **`fr` locale** — intentionally excluded from `project.inlang/settings.json` locales array. The `fr/translation.json` file remains in `public/locales/` but Paraglide won't compile it. This matches current behavior (`fr` was never in the active locales).
