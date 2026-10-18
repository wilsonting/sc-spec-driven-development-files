# Tech Stack

## Overview

AgentClinic is a single server-rendered TypeScript application. The server renders HTML; the browser gets minimal client-side JavaScript. One process, one database file, no separate API or SPA.

## Runtime and language

- **Node.js 24 LTS**
- **TypeScript** (strict mode)
- **ESM** modules (migrate the starter `tsconfig.json` off CommonJS)
- **npm** for package management

## Web framework

- **[Hono](https://hono.dev)** on Node (`@hono/node-server`)
  - TypeScript-first, small, fast, and easy to test via `app.request()`.
  - Built-in **JSX** (`hono/jsx`) for server-rendered HTML templates and layouts.
  - Small, sprinkled client JS only where it clearly improves UX.

## Data

- **SQLite** via **`better-sqlite3`**
  - Zero-setup, single-file database — ideal for demos and courses.
  - Plain SQL; no ORM.
  - Simple, ordered SQL migration files applied at startup.
  - Seed data so every demo starts with agents, ailments, and therapies.

## Styling

- **[Pico CSS](https://picocss.com) v2** (class-based build, jade theme) as the design system; no CSS build step.
  - Installed from npm (`@picocss/pico`) and served by Hono from `node_modules` at `/pico.min.css`; no CDN.
  - Pico's `--pico-*` custom properties are the design tokens; overrides only from an allow-list kept in the phase spec.
  - Light and dark mode via Pico's automatic `prefers-color-scheme` handling; no theme toggle.
- **One small app stylesheet** (`public/styles.css`, loaded after Pico) for what Pico doesn't cover.
  - Uses Pico variables, never literal colors.
  - Native nesting, container queries, and `:has()` where useful.
- **Responsive, mobile-first layout.**
  - Every page includes `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  - Base styles target narrow screens; wider layouts are added with `min-width` media queries (page level) and container queries (components).
  - Fluid sizing (`rem`, `%`, `clamp()`, flex/grid with wrapping) instead of fixed pixel widths; no horizontal scrolling down to 320px.
  - Wide content (tables, long lists) reflows or scrolls within its own container, never the page.
  - Touch targets at least 44×44px.
- Targets current evergreen browsers (Chrome, Edge, Firefox, Safari) on desktop and mobile.

## Auth

- **Early phases:** no real auth; a simple role switcher (agent / staff).
- **Later phase:** cookie-based session login with role checks.

## Tooling

- **`tsx`** for development (watch mode).
- **`tsc`** for type-checking and builds.
- **Vitest** for unit and route tests.
- **ESLint** and **Prettier** for linting and formatting.

## Validation

- Each phase's `validation.md` includes responsive checks for the pages it adds or changes (Vitest for markup and stylesheet rules; a manual check at a narrow ~320px and a desktop viewport).
- Each phase's `validation.md` is backed by **Vitest** tests: every checkable item becomes a test (route tests via `app.request()`, no network port). Only checks that truly need a human or a browser stay manual.
- **`npm run validate`** is the single merge gate. It runs typecheck, lint, tests, and build in that order and stops at the first failure.
