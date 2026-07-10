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

  writeFileSync(
    join(src, "about.astro"),
    `<Trans i18nKey="about.this_website">\n  This web app (<a href="/">confessit.app</a>) works on computers, and it's based on the <a href="/about-confessit-android">ConfessIt Android App</a>.\n</Trans>`,
  );

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
