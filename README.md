# Custom Business Software Website

A full-stack B2B software studio website. The React/Vite frontend preserves the original premium editorial landing page and sends contact enquiries to an Express REST API backed by PostgreSQL.

## Tech stack

- React 18 and React Router
- Vite
- Node.js and Express
- PostgreSQL with Prisma
- Plain CSS

## Project structure

```text
client/
  public/           Favicon, manifest, robots.txt and sitemap.xml
  src/components/   Shared layout, sections, SEO metadata and form
  src/pages/        Home, services, industries, about, contact and legal pages
  src/utils/        Optional analytics integration
server/
  src/controllers/ HTTP request handlers
  src/db/           Prisma client and PostgreSQL adapter
  src/middleware/   Input validation and admin authorization
  src/routes/       Express route definitions
  src/services/     Database queries and Resend notifications
  prisma/           Prisma schema and migrations
```

## Setup

1. Install Node.js 18+ and PostgreSQL.
2. Create a PostgreSQL database:

   ```bash
   createdb SaasDog
   ```

3. Copy `.env.example` to `.env`, update the server-only values, and set a long random `ADMIN_API_KEY`:

   ```bash
   cp .env.example .env
   ```

   Copy `client/.env.example` to `client/.env` for frontend settings. `VITE_*` values are public and must never contain secrets.

4. Install dependencies:

   ```bash
   npm install
   npm run install:all
   ```

5. Generate the Prisma client and apply the database migration:

   ```bash
   npm run prisma:generate --prefix server
   npm run prisma:migrate --prefix server -- --name init
   ```

   Use `npm run prisma:studio --prefix server` to inspect local data.

6. Start both applications:

   ```bash
   npm run dev
   ```

   The frontend runs at `http://localhost:5173` and the API at `http://localhost:4000`.

## Environment variables

Server variables belong in the root `.env` and are never exposed to the browser:

- `DATABASE_URL` — PostgreSQL connection string.
- `RESEND_API_KEY` — server-only Resend API key.
- `RESEND_FROM_EMAIL` — verified Resend sender in production.
- `LEAD_NOTIFICATION_EMAIL` — recipient for new lead notifications.
- `CLIENT_ORIGIN` — comma-separated allowed frontend origins.
- `ADMIN_API_KEY` — required for future/admin lead read and update endpoints.
- `PORT`, `NODE_ENV`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS` — runtime settings.

Frontend variables belong in `client/.env`:

- `VITE_API_URL` — public API base URL.
- `VITE_SITE_URL` — canonical production site URL used by metadata.
- `VITE_ANALYTICS_ID` — optional public Google Analytics 4 measurement ID. Leave blank to disable analytics.

## API

- `POST /api/leads` validates and stores a new enquiry.
- `GET /api/leads` returns leads for a future admin interface and requires the `x-admin-api-key` header.
- `GET /api/leads/:id` returns one lead and requires the `x-admin-api-key` header.
- `PATCH /api/leads/:id` updates a lead status (`new`, `contacted`, `meeting`, `proposal`, `won`, `lost`) and requires the `x-admin-api-key` header.
- `GET /api/health` checks API availability.

The public POST endpoint has a basic configurable rate limit. Prisma handles parameterized database access, and server errors are logged server-side without exposing database details to clients.

If `RESEND_API_KEY` and `LEAD_NOTIFICATION_EMAIL` are configured, a new lead also sends an HTML email notification through Resend. Set `RESEND_FROM_EMAIL` to a verified Resend sender in production; it defaults to `Valerian Labs <onboarding@resend.dev>` for development. Email delivery is optional for local development. Email failures are logged server-side and never undo a successfully saved lead.

## Production deployment

Build the client with `npm run build --prefix client`, then deploy the generated `client/dist` directory to a static host. Deploy the server to a Node-compatible host with a managed PostgreSQL database. Set `DATABASE_URL`, `CLIENT_ORIGIN`, `ADMIN_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`, `PORT`, and rate-limit variables in the host environment; do not commit `.env`. Configure the production frontend API URL with `VITE_API_URL` before building.

Before deployment, set `VITE_SITE_URL` to the real HTTPS domain. Update the placeholder domain in `client/public/sitemap.xml` and `client/public/robots.txt` to the same domain, then rebuild. The frontend includes route metadata, canonical URLs, Open Graph/Twitter tags, Organization JSON-LD, a manifest, favicon, sitemap and robots file.

The public lead endpoint uses JSON size limits, strict server-side validation, a honeypot-compatible abuse check, configurable rate limiting, explicit CORS, security headers and generic client-facing errors. Resend failures are logged server-side and do not undo a successfully saved lead.
