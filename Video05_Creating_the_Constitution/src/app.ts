import { fileURLToPath } from "node:url";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { Home } from "./views/pages/Home.js";
import { NotFound } from "./views/pages/NotFound.js";

// Resolved from this module, not the working directory, so the server finds
// its files wherever it is started from (src/ under tsx, dist/ in production).
const picoCss = fileURLToPath(
  import.meta.resolve("@picocss/pico/css/pico.jade.min.css"),
);
const publicDir = fileURLToPath(new URL("../public", import.meta.url));

export const app = new Hono();

app.get("/pico.min.css", serveStatic({ path: picoCss }));
app.get("/styles.css", serveStatic({ root: publicDir }));

app.get("/", (c) => c.html(Home()));

app.get("/health", (c) => c.json({ status: "ok" }));

app.notFound((c) => c.html(NotFound(), 404));
