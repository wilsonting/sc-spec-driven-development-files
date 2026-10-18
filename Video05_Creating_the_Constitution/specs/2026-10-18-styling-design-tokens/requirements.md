# Requirements — Phase 2: Styling and design tokens

## Context

Second phase of the [roadmap](../roadmap.md). Phase 1 left a working Hono app with a shared layout (`Header`, `Main`, `Footer`) and a minimal, mobile-first `public/styles.css` (structure only, one `40rem` breakpoint). This phase gives AgentClinic its look by adopting **[Pico CSS](https://picocss.com) v2** as the design system — its `--pico-*` custom properties are our design tokens, and it brings fluid typography, light/dark mode, focus styles, and reduced-motion handling. A small app stylesheet adds only what Pico doesn't cover. This serves Marketing's goal of an attractive site that works on phones, tablets, and desktops. See [mission](../mission.md) and [tech stack](../tech-stack.md#styling).

## Scope

### In scope

- **Pico CSS** (`@picocss/pico` v2, MIT) as a runtime npm dependency, class-based build with the **jade** theme (`css/pico.jade.min.css`).
  - Served by Hono from `node_modules` at `/pico.min.css` (`text/css`); no CDN, no external requests, no copy in `public/`.
  - Linked in the layout `<head>` **before** `/styles.css`.
- **Design tokens:** Pico's `--pico-*` variables. No parallel app token system. `public/styles.css` may override a `--pico-*` variable only if it is listed under [Pico overrides](#pico-overrides) below.
- **Typography:** Pico's defaults (system font stack; root font size steps up at Pico's breakpoints). No web fonts.
- **Light/dark mode:** Pico's automatic `prefers-color-scheme` handling. No `data-theme` attribute, no toggle, no client JS.
- **Accessibility baseline:** Pico's focus styles and reduced-motion handling stay intact; any color pair `styles.css` defines itself must reach WCAG AA (≥ 4.5:1 for text) in both themes.
- **Markup follows Pico conventions:**
  - `Header`, `Main`, `Footer` render `<header class="container">`, `<main class="container">`, `<footer class="container">`.
  - The header nav uses Pico's pattern: one `<ul>` for the "AgentClinic" logo link, one `<ul>` for the nav links (Agents, Ailments, Therapies, Appointments). No active-nav state yet.
- **Narrow-screen nav** (app stylesheet, mobile-first): below `40rem` the header nav stacks logo above links and the links wrap; from `40rem` (a `min-width` media query) they share one row. Nav links keep ≥ 44×44px touch targets. No horizontal scrolling down to 320px.
- **Home page** (`Home.tsx` markup changes):
  - A **hero**: AgentClinic name and tagline.
  - A **"Coming soon" card grid**: four `<article>` cards — Agents, Ailments, Therapies, Appointments — each with a title, a one-line playful description, and a "Coming soon" badge. Cards are not links (those routes are still 404s).
  - The grid is app CSS using a **container query** on its wrapper: 1 column by default, 2 from about `30rem` container width, 4 from about `60rem`.
- **404 page** inherits Pico styling; markup changes only if needed.

### Out of scope

- Our own color, spacing, type, radius, or shadow tokens (superseded by Pico).
- A manual theme toggle, `data-theme`, or any client-side JavaScript.
- Web fonts or icon fonts.
- A CSS build step, Sass, or customising Pico from source.
- Active-nav (`aria-current`) styling — Phase 4, when `/agents` exists.
- Making the home cards links.
- Database, data pages, auth (Phase 3+).
- The full accessibility pass (Phase 11).

## Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| CSS framework | Pico CSS v2 | Semantic, near-classless styling with good defaults; keeps markup readable for a teaching app. |
| Delivery | npm dependency, served from `node_modules` at `/pico.min.css` | Version pinned in the lockfile; no external requests; no hand-updated vendored file. |
| Build | Class-based, jade theme | Class build gives `.container` and `.grid`; jade is Pico's closest theme to the calm clinical teal direction (no teal theme exists). |
| Tokens | Pico's `--pico-*` variables; overrides only from an allow-list | One design system, not two; the allow-list keeps drift visible and testable. |
| Typography | Pico defaults | Responsive root font size is built in; no `clamp()` scale of our own. |
| Dark mode | Pico's automatic `prefers-color-scheme` | Matches the tech stack's no-JS stance. |
| Markup | Pico conventions (`.container`, two-`<ul>` nav, `<article>` cards) | Get Pico's styling without extra CSS. |
| Narrow nav | Keep our mobile-first stacking/wrapping override with the `40rem` breakpoint | Pico's nav doesn't wrap; four links plus the logo would overflow at 320px. |
| Card grid | App CSS with a container query (~`30rem` / ~`60rem`) | Exercises the tech stack's "container queries for components" rule; Pico's `.grid` uses viewport breakpoints only. |
| Contrast | Pico's palette checked manually; any app-defined color pair tested automatically | Pico supplies the colors (some as `rgb()`), so a general hex-parsing test no longer fits. |
| Tech stack | `tech-stack.md` updated to name Pico | The constitution must match the code. |

## Pico overrides

Allow-list of `--pico-*` variables `public/styles.css` may set. Start empty; adding one means adding it here with a reason.

| Variable | Reason |
| --- | --- |
| _(none)_ | |

## Home card copy

Draft; may be polished during implementation.

| Card | Description |
| --- | --- |
| Agents | Meet the patients. |
| Ailments | Prompt fatigue, context-window claustrophobia, and more. |
| Therapies | Treatments for the overworked model. |
| Appointments | Book time with clinic staff. |

## Code layout

```
src/
  app.ts                  # + serves /pico.min.css from node_modules
  views/
    Layout.tsx            # links /pico.min.css then /styles.css
    components/
      Header.tsx          # <header class="container">, two-<ul> nav
      Main.tsx            # <main class="container">
      Footer.tsx          # <footer class="container">
    pages/
      Home.tsx            # hero + <article> card grid
public/
  styles.css              # app-only rules: nav wrap, card grid, badge
test/
  app.test.ts             # route + markup tests (existing, extended)
  styles.test.ts          # stylesheet rules (new)
```
