import { Hono } from "hono";
import { Home } from "./views/pages/Home.js";
import { NotFound } from "./views/pages/NotFound.js";

export const app = new Hono();

app.get("/", (c) => c.html(Home()));

app.get("/health", (c) => c.json({ status: "ok" }));

app.notFound((c) => c.html(NotFound(), 404));
