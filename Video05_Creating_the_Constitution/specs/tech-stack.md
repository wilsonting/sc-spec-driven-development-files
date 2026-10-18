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

- **Plain modern CSS** in a single stylesheet; no CSS build step.
  - Design tokens via CSS custom properties (colors, spacing, type scale).
  - Native nesting, container queries, and `:has()` where useful.
  - Light and dark mode via `prefers-color-scheme`.
- Targets current evergreen browsers (Chrome, Edge, Firefox, Safari).

## Auth

- **Early phases:** no real auth; a simple role switcher (agent / staff).
- **Later phase:** cookie-based session login with role checks.

## Tooling

- **`tsx`** for development (watch mode).
- **`tsc`** for type-checking and builds.
- **Vitest** for unit and route tests.
- **ESLint** and **Prettier** for linting and formatting.

## Validation

- Each phase's `validation.md` is backed by **Vitest** tests: every checkable item becomes a test (route tests via `app.request()`, no network port). Only checks that truly need a human or a browser stay manual.
- **`npm run validate`** is the single merge gate. It runs typecheck, lint, tests, and build in that order and stops at the first failure.
