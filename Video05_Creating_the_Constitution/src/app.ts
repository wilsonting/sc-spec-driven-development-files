import { Hono } from "hono";
import { Home } from "./views/pages/Home.js";

export const app = new Hono();

app.get("/", (c) => c.html(Home()));

app.get("/health", (c) => c.json({ status: "ok" }));
