# Plan — Phase 1: Hono server and layout shell

See [requirements](requirements.md) for scope and [validation](validation.md) for the merge gate. Work test-first where applicable.

## 1. Tooling

1. Set `"type": "module"` in `package.json`; add `"engines": { "node": ">=24" }` and `.nvmrc` (`24`).
2. Update `tsconfig.json`: ESM (`module`/`moduleResolution`: `NodeNext`), modern `target`, `strict`, `jsx: "react-jsx"`, `jsxImportSource: "hono/jsx"`, `outDir: "dist"`.
3. Install dev dependencies: `tsx`, `eslint` + `typescript-eslint`, `prettier`.
4. Add ESLint (flat config) and Prettier config.
5. Add npm scripts: `dev`, `build`, `start`, `test`, `lint`, `format`, `typecheck`.
6. Update `specs/tech-stack.md` from Node 22 LTS to Node 24 LTS.

## 2. Testing setup

1. Install `vitest`.
2. Add a minimal Vitest config (if needed) and a placeholder test to confirm `npm test` runs.

## 3. Hono app, server entry, and health check

1. Install `hono` and `@hono/node-server`.
2. Write a failing test: `GET /health` → `200`, `{ "status": "ok" }`.
3. Create `src/app.ts` exporting the Hono app with `/health`.
4. Create `src/server.ts` that serves the app on `PORT` (default `3000`) and logs the URL.
5. Remove `src/index.ts`; point `main`/`start` at `dist/server.js`.

## 4. Layout and home page

1. Write failing tests: `GET /` → `200`, HTML contains header, nav (Agents, Ailments, Therapies, Appointments links), footer, and the tagline.
2. Create `src/views/Layout.tsx` (doctype, `<html lang="en">`, meta charset/viewport, `<title>`, header, nav, `<main>`, footer).
3. Create `src/views/pages/Home.tsx` with name, tagline, and "coming soon" section.
4. Wire `GET /` in `src/app.ts`.

## 5. 404 page

1. Write a failing test: `GET /agents` (and an arbitrary path) → `404`, HTML still includes the layout and a "not found" message.
2. Create `src/views/pages/NotFound.tsx`.
3. Register Hono's `notFound` handler to render it.

## 6. Layout subcomponents

1. Split `src/views/Layout.tsx` into three subcomponents, each in its own file under `src/views/components/`:
   - `Header.tsx` — "AgentClinic" logo link and nav.
   - `Main.tsx` — `<main>` wrapper for page content.
   - `Footer.tsx` — site footer.
2. `Layout.tsx` keeps the document shell (doctype, `<html>`, `<head>`) and imports and composes `Header`, `Main`, and `Footer`; no subcomponent is defined inline in `Layout.tsx`.
3. Existing layout tests keep passing unchanged.

## 7. Stylesheet

1. Write failing tests: `GET /styles.css` → `200` with `text/css`; layout HTML contains `<link rel="stylesheet" href="/styles.css">`.
2. Create `public/styles.css` with minimal layout rules (header / main / footer structure only; design tokens and theming wait for Phase 2).
3. Import `serveStatic` from `@hono/node-server/serve-static` in `src/app.ts` and serve `/styles.css` from `public/`.
4. Link the stylesheet in the `<head>` of `Layout.tsx`.

## 8. README

1. Add a "Getting started" section: prerequisites (Node 24+), `npm install`, `npm run dev`, `npm test`.
2. Run the full [validation](validation.md) checklist.
