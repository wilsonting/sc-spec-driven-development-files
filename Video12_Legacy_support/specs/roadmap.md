# Roadmap

High-level implementation order in very small phases. Each phase is one change that can ship on its own (roughly one PR) and gets its own spec folder: `specs/YYYY-MM-DD-<name>/` containing `requirements.md`, `plan.md` and `validation.md`.

## Completed

- [x] **Phase 1 — Hello Hono:** Layout, header, footer, home page, 404/500 pages, request logger.
- [x] **Phase 2 — Agents & Ailments:** SQLite, migrations, seed data, agent list and detail pages, ailments list.
- [x] **Phase 3 — Therapies:** therapies table linked to ailments, therapies list page.
- [x] **Phase 4 — Appointment booking:** booking form for an agent, validation, confirmation page.
- [x] **Phase 5 — Staff dashboard:** counts of agents, open appointments and active ailments; upcoming appointments.

## Next

- [ ] **Phase 6 — Tooling pins**
  - Pin Node 24 LTS via `engines` and `.nvmrc`.
  - Pin Pico CSS to an exact CDN version.

- [ ] **Phase 7 — Lint & format**
  - Add ESLint (TypeScript) and Prettier, with `lint` and `format` scripts.
  - Fix any existing violations.

- [ ] **Phase 8 — Continuous integration**
  - Run typecheck, lint and tests on every push.

- [ ] **Phase 9 — Appointment lifecycle**
  - Staff can confirm or cancel a pending appointment from the dashboard.
  - Status changes are shown on the dashboard and the agent's page.

- [ ] **Phase 10 — Ailment detail page**
  - `/ailments/:id` lists the agents who have the ailment and the therapies that treat it.
  - Link to it from the ailments list and agent pages.

- [ ] **Phase 11 — Home page polish**
  - Hero section, playful copy and clear calls to action (browse ailments, book an appointment).

- [ ] **Phase 12 — Therapists**
  - Add a `therapists` table and seed data.
  - Booking selects a therapist instead of typing a free-text name.

- [ ] **Phase 13 — Agent intake form**
  - Register a new agent and pick its ailments.

- [ ] **Phase 14 — Accessibility & browser pass**
  - Audit every page against WCAG 2.1 AA and the supported browsers; fix the findings.

- [ ] **Phase 15 — Authentication**
  - Login with separate agent and staff roles; the dashboard and status changes become staff-only.

- [ ] **Phase 16 — JSON API (read-only)**
  - JSON endpoints for agents, ailments, therapies and appointments.

- [ ] **Phase 17 — Docker / deployment**
  - Dockerfile with a persistent volume for the SQLite file.

## Later / ideas

- Search and filtering on lists.
- Appointment rescheduling.
- Therapy recommendations based on an agent's ailments.
- Write endpoints for the JSON API.
