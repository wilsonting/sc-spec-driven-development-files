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
  expect(html).toMatch(/<header>[\s\S]*AgentClinic[\s\S]*<\/header>/);
  for (const href of navRoutes) {
    expect(html).toContain(`href="${href}"`);
  }
  expect(html).toMatch(/<footer>[\s\S]*<\/footer>/);
  expect(html).toContain('<link rel="stylesheet" href="/styles.css"/>');
}

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
    expect(html).toMatch(/coming soon/i);
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
