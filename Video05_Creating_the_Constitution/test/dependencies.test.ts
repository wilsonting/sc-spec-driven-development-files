import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { dependencies: Record<string, string> };

describe("package.json", () => {
  it("has only the runtime dependencies the tech stack names", () => {
    expect(Object.keys(pkg.dependencies).sort()).toEqual([
      "@hono/node-server",
      "@picocss/pico",
      "hono",
    ]);
    expect(pkg.dependencies["@picocss/pico"]).toMatch(/^\^2\./);
  });
});
