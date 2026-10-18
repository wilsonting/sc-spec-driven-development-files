# Plan — Phase 2: Styling and design tokens

See [requirements](requirements.md) for scope and [validation](validation.md) for the merge gate. Work test-first: each group starts with failing Vitest tests wherever the rule can be checked as text or markup.

## 1. Install and serve Pico

1. Install `@picocss/pico` (v2) as a dependency.
2. Write failing tests: `GET /pico.min.css` → `200` with `text/css`; the layout `<head>` links `/pico.min.css` before `/styles.css`.
3. In `src/app.ts`, serve `node_modules/@picocss/pico/css/pico.jade.min.css` at `/pico.min.css`.
4. Link it in `Layout.tsx` ahead of `/styles.css`.

## 2. Layout markup to Pico conventions

1. Update the Phase 1 layout test to match `<header`, `<main`, `<footer` with attributes, and add expectations for `class="container"` on each.
2. Update `Header.tsx` (two-`<ul>` nav: logo, then links), `Main.tsx`, and `Footer.tsx`.
3. All Phase 1 tests keep passing.

## 3. App stylesheet

1. Create `test/styles.test.ts` reading `public/styles.css` as text. Write failing tests: a `min-width` media query exists; any `--pico-*` declaration is in the [allow-list](requirements.md#pico-overrides) (currently empty).
2. Replace the Phase 1 structural rules in `public/styles.css` with app-only rules, in comment-headed sections (layout, components, pages). Drop rules Pico now covers (box-sizing, body, header/main/footer padding).
3. Narrow-screen nav: stacked and wrapping below `40rem`, one row from `40rem`; nav links ≥ 44px touch targets.

## 4. Home page: hero and cards

1. Write failing tests: in `test/app.test.ts`, `GET /` has a hero with the name and tagline, and four `<article>` cards (Agents, Ailments, Therapies, Appointments) each with its description and a "Coming soon" badge; cards contain no links. In `test/styles.test.ts`, `styles.css` has a `container-type` declaration and an `@container` rule.
2. Update `src/views/pages/Home.tsx` (copy from [requirements](requirements.md#home-card-copy)).
3. Add card-grid CSS: 1 column by default, 2 from ~`30rem`, 4 from ~`60rem` container width. Style the badge using Pico variables (no new colors; if a new color is unavoidable, add it to the allow-list and a contrast test).

## 5. 404 page

1. Check the 404 page under Pico; adjust `NotFound.tsx` only if needed.
2. Existing 404 tests keep passing.

## 6. Constitution update

1. Update the Styling section of `specs/tech-stack.md`: Pico CSS v2 (jade, from npm, served from `node_modules`) plus one small app stylesheet; no CSS build step. Keep the responsive, container-query, and no-client-JS rules.
2. Update the roadmap's Phase 2 description to mention Pico.

## 7. Manual responsive and theme check

1. Run `npm run dev`; check home and 404 pages at ~320px, tablet, and desktop widths, in light and dark mode (OS setting or DevTools emulation).
2. Record results in [validation](validation.md); leave items unchecked with a dated note if no browser is available.

## 8. Review fixes

Found by a three-perspective review (spec fidelity, code and tests, UX/accessibility) after the first implementation. Test-first as before.

1. Resolve the Pico and `public/` paths from the module (`import.meta.resolve`, `import.meta.url`); test serving after `process.chdir()` elsewhere.
2. Long words: restore `body { overflow-wrap: break-word }` (dropped in error), use `minmax(0, 1fr)` columns and `overflow-wrap: anywhere` on cards.
3. Card grid thresholds to `26rem` / `48rem`; card headings `1.25rem`; badge pinned to the card bottom; badge text `--pico-color`, border `--pico-muted-color`.
4. Nav: align the stacked links list with the logo; item padding so stacked 44px targets don't overlap; add `min-width: 2.75rem`; drop the unused `logo` class.
5. Rename the section heading to "What’s on the way".
6. Harden tests: strip CSS comments; no custom properties beyond the allow-list; literal colors including named colors and `color-mix()`/`hwb()`; no web fonts or `@import`; served Pico equals the jade file; two-`<ul>` nav; no `<script>`, `data-theme`, or external links in rendered HTML; runtime dependency list; module-relative CSS path in `styles.test.ts`.
7. Re-run the browser checks adding 1024px, long words, and 200% text size.

## 9. Wrap-up

1. Run `npm run validate`.
2. Mark Phase 2 "✅ Complete" in `specs/roadmap.md`.
3. Add Phase 2 entries to `CHANGELOG.md`.
