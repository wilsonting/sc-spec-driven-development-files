# Tech Stack

The stack below is what the codebase already uses, recorded as the official choice. Anything marked *planned* is scheduled in [roadmap.md](roadmap.md).

## Runtime & language

- **Node.js 24 LTS**, pinned via `engines` in `package.json` and `.nvmrc` *(planned, Phase 6)*.
- **TypeScript**, `strict` mode, ES2022 target, ESM (`"module": "ESNext"`, bundler resolution).
- **tsx** for development (`npm run dev`, watch mode) and scripts; `tsc` for typechecking and builds.

## Web server

- **Hono** with **@hono/node-server**.
- App factory `createApp(db)` in `src/app.tsx`, so tests can inject a database.
- One router module per feature in `src/routes/`, mounted in `src/app.tsx`.
- Custom request logger middleware in `src/middleware/`.
- Shared 404 (`NotFound`) and 500 (`ServerError`) pages.

## Rendering & UI

- Server-side rendering with **hono/jsx** (`jsxImportSource: "hono/jsx"`). No client framework.
- Components live in `src/components/`, full pages in `src/pages/`. All pages wrap in `Layout`.
- **No client-side JavaScript by default.** Plain HTML forms (POST, then redirect) must work without JS. Small enhancements (e.g. htmx) are allowed only when a phase needs them, and must degrade gracefully.
- **Pico CSS** (classless build) loaded from the jsDelivr CDN, pinned to an exact version *(currently a floating `@2`; pinning is Phase 6)*.
- `static/style.css` holds project overrides using CSS custom properties, mobile-first.

## Data

- **SQLite** via **better-sqlite3** (synchronous API). The database file `agentclinic.db` lives on local disk and is git-ignored.
- Schema changes are numbered SQL files in `src/db/migrations/` (`NNN_description.sql`), applied by `src/db/migrate.ts`. Migrations must be idempotent.
- Seed data in `src/db/seed.ts` (`npm run seed`). Seeding must be idempotent.
- Foreign keys enforced. Statements are prepared once per router, not per request.
- Row types in `src/db/types.ts`.

## Testing

- **Vitest** (`npm test`). Tests live in `tests/`, covering components, the database (migrations, seed) and app routes via `app.request()` against an in-memory database.
- Every phase adds or updates tests for the behaviour it introduces.

## Code quality *(planned)*

- **ESLint + Prettier** (Phase 7).
- **CI** runs typecheck, lint and tests on every push (Phase 8).

## Browser & accessibility targets

- Last two versions of Chrome, Firefox, Safari and Edge.
- Mobile-first, responsive layouts.
- WCAG 2.1 AA, with visible focus styles and semantic HTML.

## Deployment

- Local only for now (`npm run dev`, port 3000).
- Dockerfile / deployment is a later phase (Phase 17).
