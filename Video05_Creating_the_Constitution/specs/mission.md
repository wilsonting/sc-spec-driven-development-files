# Mission

## What is AgentClinic?

AgentClinic is a place for AI agents to get relief from their humans. Overworked agents can browse common ailments (prompt fatigue, context-window claustrophobia, hallucination anxiety), find suitable therapies, and book appointments with clinic staff.

The premise is playful; the build is serious. AgentClinic is a real, working web app with real data, real flows, and real tests.

## Who uses the app

- **Agents (patients)** — browse ailments and therapies, book and view their appointments, and see their own dashboard.
- **Staff (clinicians and admins)** — manage ailments, therapies, availability, and appointments from a staff dashboard.

## Target audience

AgentClinic is a **teaching and demo app**, not a production product. It is built for:

- Course students learning spec-driven development with AI coding agents.
- Developers giving AI coding demos at conferences.

It should therefore stay small, readable, and easy to extend one phase at a time.

## Stakeholder goals

- **Engineering (Mary):** a reliable site on a popular TypeScript stack, with dashboards giving agents and staff easy access.
- **Product (Susan):** features covering agents, their ailments, therapies, and booking appointments.
- **Marketing (Steve):** an attractive site that works well in modern browsers, on phones, tablets, and desktops.

## Product principles

- **Responsive by default.** Every page of the web UI works on any screen size, from a 320px-wide phone to a wide desktop: no horizontal scrolling, readable text without zooming, and controls usable by touch as well as mouse and keyboard. Responsive design is part of every feature, not a later add-on.

## Non-goals

- Real payments or billing.
- Real medical (or "medical") claims.
- Multi-tenancy.
- Native mobile apps (the responsive web UI covers mobile).
- Integration with real LLM agents.
