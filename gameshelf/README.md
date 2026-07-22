# GameShelf

A personal game backlog tracker that I made. You can search for games, add them to your library, and track what you're playing, backlogged, completed, or dropped.

**Live site:** [live link]

## Features

- Email/password authentication with hashed passwords and JWT sessions
- Full CRUD for a personal game library, scoped per user
- Live game search via the RAWG Video Games Database API, with cover art
- Status filtering (All, Backlog / Playing / Completed / Dropped)
- Protected routes: library data is only ever visible to its owner

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Auth:** NextAuth.js (Auth.js v5) with a Credentials provider
- **Database:** PostgreSQL (Supabase), accessed via Prisma ORM 7 with a driver adapter
- **Styling:** Used Tailwind CSS
- **External API:** RAWG Video Games Database
- **Hosting:** Vercel

## Getting started locally

```bash
git clone <repo-url>
cd gameshelf
npm install
```

Create a `.env` file with:

DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
RAWG_API_KEY=

Then:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

## What I learned building this

This project was my first time building real authentication from scratch using hashed passwords, JWT sessions, and server-side route protection. Also, this is my first time working with an external API and a production Postgres database. Along the way I worked through connection pooling vs. direct database connections, Prisma 7s driver adapter architecture, and deploying a Next.js app with a database to Vercel.

## What I'd add for production use

This project is deployed and fully functional, but a few things would need addressing before opening it up to real, untrusted public users:

- **Password reset flow** — no account recovery currently exists if a user forgets their password
- **Email verification** — sign up currently accepts any string as an email with no confirmation step
- **Rate limiting** on login/sign-up to prevent brute-force attempts
- **A custom domain and monitoring/uptime tracking** for genuine production reliability

I scoped these out deliberately to focus my time on the core engineering (auth architecture, database design, API integration) rather than production hardening for a demo project.
