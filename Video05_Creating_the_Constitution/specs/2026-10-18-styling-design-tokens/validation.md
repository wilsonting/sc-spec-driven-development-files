# Validation — Phase 2: Styling and design tokens

The phase is done and can be merged when every item below passes.

## Merge gate

- [x] `npm run validate` passes (typecheck → lint → test → build, stopping at the first failure).

## Required tests

Route tests use `app.request()` (no network port). Stylesheet tests read `public/styles.css` as text, with comments stripped.

### Pico and layout (`test/app.test.ts`)

- [x] `GET /pico.min.css` returns `200` with `Content-Type` `text/css`, and the body is exactly the class-based jade build (`@picocss/pico/css/pico.jade.min.css`).
- [x] `/pico.min.css` and `/styles.css` still return `200` when the working directory is elsewhere.
- [x] The layout `<head>` links `/pico.min.css` before `/styles.css`, and has the empty `data:` favicon link.
- [x] `<header>`, `<main>`, and `<footer>` each carry `class="container"`; the nav uses two `<ul>`s (logo, then links).
- [x] Rendered pages contain no `<script>`, no `data-theme`, and no external (`http(s)://` or `//`) links.

### App stylesheet (`test/styles.test.ts`)

- [x] No custom properties except allow-listed `--pico-*` overrides ([allow-list](requirements.md#pico-overrides), currently empty).
- [x] No literal colors: no hex values, no color functions (`rgb()`, `hsl()`, `hwb()`, `oklch()`, `color-mix()`, …), and color-bearing properties use only Pico variables and keywords (catches named colors like `white`).
- [x] No `@font-face`, `@import`, or `url()`.
- [x] A `min-width` media query exists and no `max-width` one (mobile-first).
- [x] Nav links have `min-height` and `min-width` of `2.75rem` (44px).
- [x] `body` has `overflow-wrap: break-word`; cards have `overflow-wrap: anywhere`.
- [x] `.cards` is an inline-size container; `.card-grid` uses `minmax(0, 1fr)` columns and `@container` rules for 2 and 4 columns.
- [x] Card headings are sized down; badges are pinned to the card bottom.

### Home page (`test/app.test.ts`)

- [x] `GET /` returns `200` HTML with the layout, a hero `hgroup` with "AgentClinic" and the tagline, and the "What’s on the way" section heading.
- [x] `GET /` contains four `<article>` cards — Agents, Ailments, Therapies, Appointments — each with its description and a "Coming soon" badge, and no links.

### Dependencies (`test/dependencies.test.ts`)

- [x] Runtime dependencies are exactly `hono`, `@hono/node-server`, and `@picocss/pico` (v2).

### Regression

- [x] All Phase 1 tests (layout, nav links, `/styles.css`, viewport meta, `/health`, 404s) still pass, with the header/main/footer matcher updated for attributes.

## Manual check

Leave unchecked with a dated note if no browser is available — do not mark as done.

> **Note (2026-10-18, after review fixes):** Checked in headless Chrome driven over the DevTools protocol (viewport, `prefers-color-scheme`, `prefers-reduced-motion`, and browser font-size emulation), with measurements plus screenshots. Horizontal scroll measured as `scrollWidth > clientWidth`. Long-word runs inject a 45-character word into the `h1` and a card. A human look on a real phone is still worthwhile before Phase 11.

- [x] At 320px: home and 404 have no horizontal scrolling — also with long words and with 200% browser text size; logo stacks above the nav with logo and link text left-aligned; links wrap; stacked tap targets don't overlap; cards are one column.
- [x] At 768px: logo and nav share one row; cards are two columns.
- [x] At 1024px and 1280px: cards are four columns with badges on one line; no card heading breaks mid-word; content sits in Pico's centered container (950px / 1200px). With 200% text at 1280px, cards correctly drop to two columns.
- [x] Light and dark mode both render correctly on home and 404 _(judged from screenshots)_; badge text measures 11.1:1 (light) / 10.1:1 (dark), its border 5.4:1 / 4.5:1.
- [x] Keyboard focus shows a visible ring _(measured on the first tab stop: `:focus-visible` with Pico's box-shadow ring; every link shares Pico's same rule)_.
- [x] With reduced motion emulated, link transitions drop to `0s`.
- [x] Browser console shows no errors other than the expected `404` status of the 404 page itself; network shows only same-origin requests (`/`, `/pico.min.css`, `/styles.css`) — no CDN, web fonts, or `/favicon.ico`.

## Spec hygiene

- [x] `public/styles.css` holds only app-specific rules (word wrap, nav, card grid, badge) _(enforced in part by the tests above)_.
- [x] No client-side JavaScript, theme toggle, web fonts, or CSS build step _(tested above; no build step by inspection of `package.json` scripts)_.
- [x] Nothing from Phase 3+ (database, data pages, auth) or active-nav styling slipped in _(by inspection of `git diff main..HEAD`)_.
- [x] `specs/tech-stack.md` Styling section names Pico and points at the allow-list file; roadmap Phase 2 mentions Pico and is marked complete; `CHANGELOG.md` has Phase 2 entries.
