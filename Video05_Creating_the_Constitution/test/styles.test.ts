import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Comments are stripped so commented-out rules can't pass or fail a check.
const css = readFileSync(
  new URL("../public/styles.css", import.meta.url),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

// Pico variables styles.css may override; keep in sync with the allow-list in
// specs/2026-10-18-styling-design-tokens/requirements.md#pico-overrides.
const allowedPicoOverrides: string[] = [];

const declarations = [...css.matchAll(/([\w-]+)\s*:\s*([^;{}]+);/g)].map(
  ([, property, value]) => ({ property, value: value.trim() }),
);

function rule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`(?:^|})\\s*${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? "";
}

describe("public/styles.css", () => {
  it("is mobile-first, with a min-width media query for wider screens", () => {
    expect(css).toMatch(/@media \(min-width: [\d.]+rem\)/);
    expect(css).not.toMatch(/@media \(max-width/);
  });

  it("declares no custom properties except allow-listed Pico overrides", () => {
    const custom = declarations
      .map((d) => d.property)
      .filter((p) => p.startsWith("--"));
    for (const name of custom) {
      expect(allowedPicoOverrides).toContain(name);
    }
  });

  it("defines no colors of its own, so Pico's palette sets all contrast", () => {
    for (const { property, value } of declarations) {
      expect(value, property).not.toMatch(/#[\da-f]{3,8}\b/i);
    }
    expect(css).not.toMatch(
      /\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch|color-mix|color)\(/i,
    );
    // Color-bearing properties may only use Pico variables and keywords.
    const colorProperty =
      /^(color|background(-color)?|border(-[\w-]+)?|outline(-color)?|fill|stroke|box-shadow|text-decoration(-color)?|caret-color|accent-color)$/;
    const allowedWords = new Set([
      "solid",
      "dashed",
      "dotted",
      "none",
      "inset",
      "inherit",
      "initial",
      "unset",
      "transparent",
      "currentcolor",
    ]);
    for (const { property, value } of declarations) {
      if (!colorProperty.test(property)) continue;
      const words = value
        .replace(/var\([^)]*\)/g, "")
        .replace(/calc\([^)]*\)/g, "")
        .match(/[a-z][a-z-]*/gi);
      for (const word of words ?? []) {
        expect(allowedWords, `${property}: ${value}`).toContain(
          word.toLowerCase(),
        );
      }
    }
  });

  it("loads no web fonts or other external resources", () => {
    expect(css).not.toMatch(/@font-face|@import|url\(/);
  });

  it("gives nav links touch targets of at least 44×44px", () => {
    const links = rule("header nav a");
    expect(links).toMatch(/min-height: 2\.75rem/);
    expect(links).toMatch(/min-width: 2\.75rem/);
  });

  it("wraps long words instead of widening the page", () => {
    expect(rule("body")).toMatch(/overflow-wrap: break-word/);
    expect(rule(".card-grid article")).toMatch(/overflow-wrap: anywhere/);
  });

  it("lays out the home cards with shrinkable columns in container queries", () => {
    expect(rule(".cards")).toMatch(/container-type: inline-size/);
    expect(rule(".card-grid")).toMatch(
      /grid-template-columns: minmax\(0, 1fr\)/,
    );
    expect(css).toMatch(
      /@container \(min-width: [\d.]+rem\)\s*\{\s*\.card-grid\s*\{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/,
    );
    expect(css).toMatch(
      /@container \(min-width: [\d.]+rem\)\s*\{\s*\.card-grid\s*\{\s*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/,
    );
  });

  it("sizes card headings to fit four cards in a row", () => {
    expect(rule(".card-grid h3")).toMatch(/font-size: 1\.25rem/);
  });

  it("pins each card's badge to the bottom so badges line up", () => {
    expect(rule(".card-grid article")).toMatch(/flex-direction: column/);
    expect(rule(".card-grid .badge")).toMatch(/margin-top: auto/);
  });
});
