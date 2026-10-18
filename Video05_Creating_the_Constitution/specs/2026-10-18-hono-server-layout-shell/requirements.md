# Requirements — Phase 1: Hono server and layout shell

## Context

First phase of the [roadmap](../roadmap.md). The repo currently holds only a TypeScript starter (`src/index.ts` logs a message, CommonJS output). This phase lays the foundation every later phase builds on: tooling, a running Hono server, and a shared server-rendered layout. See [mission](../mission.md) and [tech stack](../tech-stack.md).

## Scope

### In scope

- **Tooling:** ESM modules, strict `tsconfig.json` with Hono JSX, `tsx`, Vitest, ESLint, Prettier.
- **Node version:** target Node 24 LTS (`engines`, `.nvmrc`); `tech-stack.md` updated to match.
- **npm scripts:** `dev` (tsx watch), `build` (tsc), `start` (node dist), `test` (vitest run), `lint`, `format`, `typecheck`.
- **Hono app** on `@hono/node-server`, listening on `PORT` (default `3000`). No `.env` library.
- **Layout shell** (`hono/jsx`): a main `Layout` component composed of three subcomponents — `Header` ("AgentClinic" logo text and nav), `Main` (page content), and `Footer`.
  - Nav links to future routes: Agents (`/agents`), Ailments (`/ailments`), Therapies (`/therapies`), Appointments (`/appointments`).
- **Stylesheet:** a single static `public/styles.css`, served at `/styles.css` and linked from the layout `<head>`. Minimal layout rules only.
- **Home page** (`GET /`): AgentClinic name, a one-line tagline, and a "coming soon" placeholder section.
- **404 page:** any unknown route (including the future nav routes) renders a "not found" page inside the layout with status 404.
- **Health check** (`GET /health`): returns `200` with JSON `{ "status": "ok" }`.
- **README:** "Getting started" section (install, dev, test).

### Out of scope

- Design tokens, typography, light/dark mode, and visual styling beyond basic layout (Phase 2).
- Database, models, seed data (Phase 3+).
- Real content for agents, ailments, therapies, appointments.
- Auth or role switching.
- CI (GitHub Actions).

## Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Styling | One static stylesheet with minimal layout rules | Wires up stylesheet serving now; Phase 2 fills in tokens and theming. |
| Layout structure | `Layout` composes `Header`, `Main`, `Footer` | Each region can evolve independently in later phases. |
| Nav targets | Link to planned routes, fall through to 404 | Shows the product shape in demos; exercises the 404 handler. |
| App vs server split | `src/app.ts` exports the Hono app; `src/server.ts` starts it | Tests call `app.request()` without binding a port. |
| Config | `PORT` env var, default `3000` | Simplest thing that works; no extra dependency. |
| Node | 24 LTS | Node 22 is in maintenance; 24 is active LTS. |
| CI | None this phase | Not in the constitution; local checks are the merge gate. |

## Code layout

```
src/
  app.ts              # builds and exports the Hono app (routes, static CSS, 404 handler)
  server.ts           # reads PORT, starts @hono/node-server
  views/
    Layout.tsx        # document shell; composes Header, Main, Footer
    components/
      Header.tsx
      Main.tsx
      Footer.tsx
    pages/
      Home.tsx
      NotFound.tsx
public/
  styles.css          # served at /styles.css
test/
  app.test.ts
```

The starter `src/index.ts` is removed.
