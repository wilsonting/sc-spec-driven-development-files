# Validation — Phase 1: Hono server and layout shell

The phase is done and can be merged when every item below passes.

## Automated checks

All must pass locally:

- [ ] `npm run typecheck` — no type errors.
- [ ] `npm run lint` — no lint errors.
- [ ] `npm test` — all tests pass.
- [ ] `npm run build` — compiles to `dist/` without errors.

## Required tests

Tests use `app.request()` against the exported Hono app (no network port).

- [ ] `GET /` returns `200`, `Content-Type` HTML, and the body contains:
  - the header with "AgentClinic",
  - nav links to `/agents`, `/ailments`, `/therapies`, `/appointments`,
  - the footer,
  - the tagline.
- [ ] `GET /health` returns `200` with JSON body `{ "status": "ok" }`.
- [ ] An unknown route (e.g. `/does-not-exist`) and a planned route (e.g. `/agents`) return `404` with HTML that still includes the layout and a "not found" message.

## Manual check

- [ ] `npm run dev` starts the server and logs `http://localhost:3000`.
- [ ] Open `http://localhost:3000` in a modern browser: home page renders with header, nav, tagline, and footer.
- [ ] Click every nav link: each shows the 404 page inside the layout.
- [ ] Browser console shows no errors.
- [ ] `PORT=4000 npm run dev` serves on port 4000.

## Spec hygiene

- [ ] `specs/tech-stack.md` says Node 24 LTS.
- [ ] README has a "Getting started" section that works as written.
- [ ] Nothing out of scope (CSS, database, auth, CI) was added.
