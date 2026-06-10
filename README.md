# Sponsoverse

Sponsoverse is a marketplace that bridges **event organizers** and **sponsors** looking for the right audience. Organizers list events and package sponsorship opportunities into tiers (Comet, Star, Nova, Galaxy); sponsors browse, filter, and express interest directly — no cold emails, no middlemen.

## Features

- **Role-based accounts** — sign up as an Organizer or a Sponsor with a tailored profile (org info vs. company/industry/budget).
- **Event management** — organizers create events with audience demographics and define up to four sponsorship tiers with pricing, perks, and sponsor caps.
- **Discovery feed** — sponsors browse published events and filter by category, location, audience size, and budget.
- **Inquiries** — sponsors express interest in a specific tier; organizers review and accept/reject from their dashboard.
- **Cosmic UI** — a navy/purple/cyan "orbital" theme with glassmorphism cards and gradient accents.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Base UI primitives)
- [Prisma ORM](https://www.prisma.io) + PostgreSQL ([Neon](https://neon.tech))
- [Auth.js (NextAuth v5)](https://authjs.dev) — credentials auth with JWT sessions and embedded roles

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — a PostgreSQL connection string (e.g. from a free [Neon](https://neon.tech) project)
   - `AUTH_SECRET` — generate one with `npx auth secret`
3. Apply the database schema:
   ```bash
   npx prisma migrate dev
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Roadmap

- In-app messaging between organizers and sponsors
- AI-driven sponsor match scoring (audience/budget/industry fit)
- Sponsorship deck upload + AI extraction of event details
- Analytics dashboard for organizers and sponsors
