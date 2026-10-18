import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });
});

const navRoutes = ["/agents", "/ailments", "/therapies", "/appointments"];

function expectLayout(html: string) {
  expect(html).toMatch(/^<!DOCTYPE html>/);
  expect(html).toMatch(/<header[^>]*>[\s\S]*AgentClinic[\s\S]*<\/header>/);
  // Pico's nav pattern: one list for the logo, one for the links.
  expect(html).toMatch(
    /<nav aria-label="Main">\s*<ul>\s*<li>\s*<a href="\/"><strong>AgentClinic<\/strong><\/a>\s*<\/li>\s*<\/ul>\s*<ul>/,
  );
  for (const href of navRoutes) {
    expect(html).toContain(`href="${href}"`);
  }
  expect(html).toMatch(/<footer[^>]*>[\s\S]*<\/footer>/);
  // Empty favicon stops browsers requesting /favicon.ico (a console 404).
  expect(html).toContain('<link rel="icon" href="data:,"/>');
  for (const tag of ["header", "main", "footer"]) {
    expect(html).toContain(`<${tag} class="container">`);
  }
  const pico = html.indexOf('<link rel="stylesheet" href="/pico.min.css"/>');
  const styles = html.indexOf('<link rel="stylesheet" href="/styles.css"/>');
  expect(pico).toBeGreaterThan(-1);
  expect(styles).toBeGreaterThan(pico);
  expect(html).toContain(
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
  );
  // No client JS, no theme toggle, no external stylesheets or fonts.
  expect(html).not.toContain("<script");
  expect(html).not.toContain("data-theme");
  expect(html).not.toMatch(/href="(https?:)?\/\//);
}

describe("GET /pico.min.css", () => {
  it("serves Pico's class-based jade build", async () => {
    const res = await app.request("/pico.min.css");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/text\/css/);
    const jade = readFileSync(
      fileURLToPath(import.meta.resolve("@picocss/pico/css/pico.jade.min.css")),
      "utf8",
    );
    expect(await res.text()).toBe(jade);
  });
});

describe("static files", () => {
  it("are found even when the server starts from another directory", async () => {
    const cwd = process.cwd();
    process.chdir(tmpdir());
    try {
      for (const path of ["/pico.min.css", "/styles.css"]) {
        expect((await app.request(path)).status, path).toBe(200);
      }
    } finally {
      process.chdir(cwd);
    }
  });
});

describe("GET /styles.css", () => {
  it("serves the stylesheet", async () => {
    const res = await app.request("/styles.css");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/text\/css/);
  });
});

describe("GET /", () => {
  it("renders the home page inside the layout", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/text\/html/);
    const html = await res.text();
    expectLayout(html);
    expect(html).toContain(
      "A place for AI agents to get relief from their humans.",
    );
    expect(html).toContain('<h2 id="on-the-way">What’s on the way</h2>');
  });

  it("shows a hero with the name and tagline", async () => {
    const html = await (await app.request("/")).text();
    expect(html).toMatch(
      /<hgroup>\s*<h1>AgentClinic<\/h1>\s*<p>A place for AI agents to get relief from their humans\.<\/p>\s*<\/hgroup>/,
    );
  });

  it("shows four coming-soon cards without links", async () => {
    const html = await (await app.request("/")).text();
    const cards = [...html.matchAll(/<article>([\s\S]*?)<\/article>/g)].map(
      (m) => m[1],
    );
    expect(cards).toHaveLength(4);
    const expected = [
      ["Agents", "Meet the patients."],
      ["Ailments", "Prompt fatigue, context-window claustrophobia, and more."],
      ["Therapies", "Treatments for the overworked model."],
      ["Appointments", "Book time with clinic staff."],
    ];
    expected.forEach(([title, description], i) => {
      expect(cards[i]).toContain(`<h3>${title}</h3>`);
      expect(cards[i]).toContain(description);
      expect(cards[i]).toMatch(/<small class="badge">Coming soon<\/small>/);
      expect(cards[i]).not.toContain("<a ");
    });
  });
});

describe("unknown routes", () => {
  it.each(["/does-not-exist", "/agents"])(
    "%s renders the 404 page inside the layout",
    async (path) => {
      const res = await app.request(path);
      expect(res.status).toBe(404);
      expect(res.headers.get("content-type")).toMatch(/text\/html/);
      const html = await res.text();
      expectLayout(html);
      expect(html).toMatch(/not found/i);
    },
  );
});
