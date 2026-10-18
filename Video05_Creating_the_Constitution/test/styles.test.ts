import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("public/styles.css", "utf8");

// Pico variables styles.css may override; keep in sync with the allow-list in
// specs/2026-10-18-styling-design-tokens/requirements.md.
const allowedPicoOverrides: string[] = [];

describe("public/styles.css", () => {
  it("is mobile-first, with a min-width media query for wider screens", () => {
    expect(css).toMatch(/@media \(min-width: [\d.]+rem\)/);
    expect(css).not.toMatch(/@media \(max-width/);
  });

  it("only overrides allow-listed Pico variables", () => {
    const overrides = [...css.matchAll(/(--pico-[\w-]+)\s*:/g)].map(
      (m) => m[1],
    );
    for (const name of overrides) {
      expect(allowedPicoOverrides).toContain(name);
    }
  });

  it("defines no colors of its own, so Pico's palette sets all contrast", () => {
    expect(css).not.toMatch(/#[\da-f]{3,8}\b/i);
    expect(css).not.toMatch(/\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(/i);
  });

  it("gives nav links touch targets of at least 44px", () => {
    expect(css).toMatch(/nav a\s*\{[^}]*min-height: 2\.75rem/);
  });

  it("lays out the home cards with a container query", () => {
    expect(css).toMatch(/container-type: inline-size/);
    expect(css).toMatch(/@container \(min-width: 30rem\)/);
    expect(css).toMatch(/@container \(min-width: 60rem\)/);
  });
});
