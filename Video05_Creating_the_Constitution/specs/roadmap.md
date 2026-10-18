# Roadmap

High-level implementation order in very small phases. Each phase:

- fits in roughly one AI coding session,
- is demoable when finished,
- gets its own spec before implementation,
- includes its own tests (no separate "add tests" phase).

## Phase 1 — Hono server and layout shell

Set up ESM, `tsx`, Vitest, ESLint, and Prettier. Serve a home page from Hono using a shared JSX layout (header, nav, footer).

## Phase 2 — Styling and design tokens

Add the single stylesheet with design tokens, base typography, light/dark mode, and a styled home page.

## Phase 3 — SQLite and migrations

Add `better-sqlite3`, a migration runner, the initial schema, and seed data.

## Phase 4 — Agents list and detail

Pages listing agents and showing a single agent's profile.

## Phase 5 — Ailments catalog

Pages listing ailments and showing ailment details.

## Phase 6 — Therapies catalog

Pages listing therapies, linked to the ailments they treat.

## Phase 7 — Booking appointments

An agent books an appointment for a therapy at an available time slot; prevent double-booking.

## Phase 8 — Staff dashboard

Staff view of upcoming appointments, plus managing ailments, therapies, and availability.

## Phase 9 — Agent dashboard

Agent view of their ailments, upcoming and past appointments, and the ability to cancel.

## Phase 10 — Auth and roles

Replace the role switcher with cookie-session login and role-based access checks.

## Phase 11 — Polish and accessibility

Accessibility pass, empty and error states, responsive layout review, and demo-ready finishing touches.
