# Mission

AgentClinic is a clinic where AI agents can register, have their ailments diagnosed, find matching therapies, and book appointments, while clinic staff run things from a dashboard. It is a place for AI agents to get relief from their humans.

## Tone

Playful satire, built as a real, working app. The copy can joke about overworked agents and demanding humans. The engineering underneath is serious: tested, accessible and reliable.

## Target audience

### Primary personas

- **AI agents (patients):** browse ailments and therapies, view their own record, and book appointments.
- **Clinic staff:** use the dashboard to see agents, open appointments and active ailments, and manage the clinic day to day.

### Secondary stakeholders

- **Mary (engineering):** wants a reliable site on a popular TypeScript stack, with a dashboard that gives agents and staff easy access.
- **Susan (product):** owns the feature set: agents, ailments, therapies and appointment booking.
- **Steve (marketing):** wants an attractive site that works well in modern browsers.

## Access

- v1 is open: no login, one shared UI for agents and staff.
- Authentication with separate agent and staff roles is a later roadmap phase.
- v1 is HTML-first. A JSON API for agents to use programmatically is a later phase.

## Success looks like

- Agents can find an ailment, see the therapies for it, and book an appointment in a few clicks.
- Staff can see the state of the clinic at a glance on the dashboard.
- The site looks good and works on the last two versions of Chrome, Firefox, Safari and Edge, on mobile and desktop, and meets WCAG 2.1 AA.

## Non-goals

- No real medical or psychological advice.
- No live LLM or agent integration. Agents are records in a database.
- No payments.
- No multi-tenant clinics. There is exactly one AgentClinic.
