# Validation — Phase 2: Styling and design tokens

The phase is done and can be merged when every item below passes.

## Merge gate

- [ ] `npm run validate` passes (typecheck → lint → test → build, stopping at the first failure).

## Required tests

Route tests use `app.request()` (no network port). Stylesheet tests read `public/styles.css` as text.

### Pico (`test/app.test.ts`)

- [ ] `GET /pico.min.css` returns `200` with `Content-Type` `text/css`.
- [ ] The layout `<head>` links `/pico.min.css` before `/styles.css`.
- [ ] `<header>`, `<main>`, and `<footer>` each carry `class="container"`.

### App stylesheet (`test/styles.test.ts`)

- [ ] Every `--pico-*` declaration in `styles.css` is in the [allow-list](requirements.md#pico-overrides).
- [ ] A `min-width` media query exists (narrow-screen nav).
- [ ] A `container-type` declaration and an `@container` rule exist (card grid).
- [ ] If `styles.css` defines any color pair of its own, it reaches ≥ 4.5:1 in both themes.

### Home page (`test/app.test.ts`)

- [ ] `GET /` returns `200` HTML with the layout and a hero containing "AgentClinic" and the tagline.
- [ ] `GET /` contains four `<article>` cards — Agents, Ailments, Therapies, Appointments — each with its description and a "Coming soon" badge.
- [ ] The cards contain no links.

### Regression

- [ ] All Phase 1 tests (layout, nav links, `/styles.css`, viewport meta, `/health`, 404s) still pass, with the header/main/footer matcher updated for attributes.

## Manual check

Leave unchecked with a dated note if no browser is available — do not mark as done.

- [ ] At ~320px wide: home and 404 pages have no horizontal scrolling; logo stacks above the nav; nav links wrap; cards are one column.
- [ ] At tablet width (~768px): logo and nav share one row; cards are two columns.
- [ ] At desktop width: cards are four columns; content sits in Pico's centered container.
- [ ] Light and dark mode (OS setting or DevTools `prefers-color-scheme` emulation) both look right on home and 404 pages; text is readable in both.
- [ ] Tabbing shows a visible focus ring on every link.
- [ ] Browser console shows no errors; the network tab shows only same-origin requests (`/pico.min.css`, `/styles.css`) — no CDN or web fonts.

## Spec hygiene

- [ ] `@picocss/pico` v2 is a `dependency` in `package.json`; no other new runtime dependencies.
- [ ] `public/styles.css` holds only app-specific rules (nav wrap, card grid, badge) and no parallel token system.
- [ ] No client-side JavaScript, theme toggle, `data-theme`, web fonts, or CSS build step.
- [ ] Nothing from Phase 3+ (database, data pages, auth) or active-nav styling slipped in.
- [ ] `specs/tech-stack.md` Styling section names Pico; roadmap Phase 2 mentions Pico and is marked complete; `CHANGELOG.md` has Phase 2 entries.
