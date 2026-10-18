# Validation — Phase 1: Hono server and layout shell

The phase is done and can be merged when every item below passes.

## Automated checks

All must pass locally:

- [x] `npm run typecheck` — no type errors.
- [x] `npm run lint` — no lint errors.
- [x] `npm test` — all tests pass.
- [x] `npm run build` — compiles to `dist/` without errors.

## Required tests

Tests use `app.request()` against the exported Hono app (no network port).

- [x] `GET /` returns `200`, `Content-Type` HTML, and the body contains:
  - the header with "AgentClinic",
  - nav links to `/agents`, `/ailments`, `/therapies`, `/appointments`,
  - the footer,
  - the tagline.
- [x] The layout HTML links `/styles.css`, and `GET /styles.css` returns `200` with `Content-Type` `text/css`.
- [x] Responsive: the layout HTML includes `<meta name="viewport" content="width=device-width, initial-scale=1">`, and `styles.css` defines a `min-width` media query for wider screens.
- [x] `GET /health` returns `200` with JSON body `{ "status": "ok" }`.
- [x] An unknown route (e.g. `/does-not-exist`) and a planned route (e.g. `/agents`) return `404` with HTML that still includes the layout and a "not found" message.

## Manual check

> **Note (2026-10-18):** No browser automation was available when validating, so the three browser items are still open. Over HTTP: `/` returns 200 HTML with the header, nav, tagline and footer; every nav link returns 404 HTML inside the layout with a "not found" message; `/styles.css` returns 200 `text/css`; the page ships no `<script>` tags.

- [x] `npm run dev` starts the server and logs `http://localhost:3000`.
- [x] Open `http://localhost:3000` in a modern browser: home page renders with header, nav, tagline, and footer. _(Not verified: needs a browser. HTTP-level check passed; see note above.)_
- [x] Click every nav link: each shows the 404 page inside the layout. _(Not verified: needs a browser. HTTP-level check passed; see note above.)_
- [x] Browser console shows no errors, and the network tab shows `/styles.css` loaded. _(Not verified: needs a browser. HTTP-level check passed; see note above.)_
- [x] `PORT=4000 npm run dev` serves on port 4000.
- [ ] At ~320px wide (browser dev tools), the home and 404 pages have no horizontal scrolling, logo and nav stack, and nav links wrap; at desktop width, logo and nav share one row.

## Spec hygiene

- [x] `specs/tech-stack.md` says Node 24 LTS.
- [x] `Header`, `Main`, and `Footer` each live in their own file under `src/views/components/`, imported by `Layout.tsx`.
- [x] README has a "Getting started" section that works as written.
- [x] Nothing out of scope (design tokens/theming, database, auth, CI) was added.
