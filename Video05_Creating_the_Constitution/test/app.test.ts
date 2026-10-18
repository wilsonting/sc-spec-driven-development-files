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
}

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
