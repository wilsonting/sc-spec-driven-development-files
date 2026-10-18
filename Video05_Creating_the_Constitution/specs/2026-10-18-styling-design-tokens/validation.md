# Validation — Phase 2: Styling and design tokens

The phase is done and can be merged when every item below passes.

## Merge gate

- [x] `npm run validate` passes (typecheck → lint → test → build, stopping at the first failure).

## Required tests

Route tests use `app.request()` (no network port). Stylesheet tests read `public/styles.css` as text.

### Pico (`test/app.test.ts`)

- [x] `GET /pico.min.css` returns `200` with `Content-Type` `text/css`.
- [x] The layout `<head>` links `/pico.min.css` before `/styles.css`.
- [x] `<header>`, `<main>`, and `<footer>` each carry `class="container"`.

### App stylesheet (`test/styles.test.ts`)

- [x] Every `--pico-*` declaration in `styles.css` is in the [allow-list](requirements.md#pico-overrides).
- [x] A `min-width` media query exists (narrow-screen nav).
- [x] A `container-type` declaration and an `@container` rule exist (card grid).
- [x] If `styles.css` defines any color pair of its own, it reaches ≥ 4.5:1 in both themes. _(It defines none: a test forbids literal colors. The badge uses Pico's muted color — 5.36:1 light, 4.53:1 dark on the card background.)_

### Home page (`test/app.test.ts`)

- [x] `GET /` returns `200` HTML with the layout and a hero containing "AgentClinic" and the tagline.
- [x] `GET /` contains four `<article>` cards — Agents, Ailments, Therapies, Appointments — each with its description and a "Coming soon" badge.
- [x] The cards contain no links.

### Regression

- [x] All Phase 1 tests (layout, nav links, `/styles.css`, viewport meta, `/health`, 404s) still pass, with the header/main/footer matcher updated for attributes.

## Manual check

Leave unchecked with a dated note if no browser is available — do not mark as done.

> **Note (2026-10-18):** Checked in headless Chrome driven over the DevTools protocol (viewport, `prefers-color-scheme`, and `prefers-reduced-motion` emulation), with measurements and screenshots rather than by eye. Results: no horizontal scroll at 320 / 768 / 1280px on home and 404 in both themes; nav stacked with links on two rows at 320px and one row from 768px; nav links ≥ 44px tall; cards 1 / 2 / 4 columns; main capped at 1200px and centered at 1280px; Tab focuses the logo link with `:focus-visible` and Pico's focus ring; link transitions drop to `0s` under reduced motion; only same-origin requests (`/`, `/pico.min.css`, `/styles.css`). The only console errors are the expected `404` status of the 404 page itself. A `data:` favicon link was added so browsers stop requesting `/favicon.ico`. A human look on a real phone is still worthwhile before Phase 11.

- [x] At ~320px wide: home and 404 pages have no horizontal scrolling; logo stacks above the nav; nav links wrap; cards are one column.
- [x] At tablet width (~768px): logo and nav share one row; cards are two columns.
- [x] At desktop width: cards are four columns; content sits in Pico's centered container.
- [x] Light and dark mode (OS setting or DevTools `prefers-color-scheme` emulation) both look right on home and 404 pages; text is readable in both. _(Judged from headless screenshots.)_
- [x] Tabbing shows a visible focus ring on every link. _(Measured on the first tab stop; every link shares Pico's same `:focus-visible` rule.)_
- [x] Browser console shows no errors; the network tab shows only same-origin requests (`/pico.min.css`, `/styles.css`) — no CDN or web fonts.

## Spec hygiene

- [x] `@picocss/pico` v2 is a `dependency` in `package.json`; no other new runtime dependencies.
- [x] `public/styles.css` holds only app-specific rules (nav wrap, card grid, badge) and no parallel token system.
- [x] No client-side JavaScript, theme toggle, `data-theme`, web fonts, or CSS build step.
- [x] Nothing from Phase 3+ (database, data pages, auth) or active-nav styling slipped in.
- [x] `specs/tech-stack.md` Styling section names Pico; roadmap Phase 2 mentions Pico and is marked complete; `CHANGELOG.md` has Phase 2 entries.
