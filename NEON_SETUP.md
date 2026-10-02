# Neon survey database setup

1. Create a PostgreSQL project in Neon and open its **Connect** dialog.
2. Copy the connection string for your database.
3. Copy `.env.example` to `.env.local` and replace the placeholder `DATABASE_URL` with that connection string. Keep `.env.local` private; it is ignored by Git.
4. Run `npm run db:setup` to apply [`database/schema.sql`](database/schema.sql), the age-band migration in [`database/migrations/2026-10-01-age-groups.sql`](database/migrations/2026-10-01-age-groups.sql), the built-in question seed in [`database/migrations/2026-10-01-seed-existing-questions.sql`](database/migrations/2026-10-01-seed-existing-questions.sql), and the CMS tables in [`database/migrations/2026-10-01-site-cms.sql`](database/migrations/2026-10-01-site-cms.sql). If applying SQL manually, run those files in that order. Existing pages, navbar links, and home hero defaults are seeded idempotently on the first site-content request.
5. Restart the Next.js dev server. The survey endpoint is `POST /api/survey` and accepts `{ "answers": { ...surveyFields } }`.
6. Set the same `DATABASE_URL` as a server-side environment variable in your deployment platform.

## Admin dashboard

1. Set `ADMIN_PASSWORD` to a unique password of at least 16 characters.
2. Generate `ADMIN_SESSION_SECRET` with `node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"` and add it to `.env.local` and your deployment environment.
3. Open `/admin`, sign in, and use search, province filters, paging, and CSV export. Admin sessions expire after eight hours and use an HTTP-only, SameSite=Strict cookie.

The admin API requires a valid signed session before it queries Neon. Keep the admin page behind HTTPS and, for internet-facing production deployments, consider adding your platform's IP allowlist or rate limiting.

The `/admin` dashboard includes a **Survey questions** section. It supports short text, long answers, number, email, date, yes/no, 1-to-5 rating, single choice, multiple choice, and dropdown questions. Prompts and choices are entered in English and Urdu; saved active questions appear in an additional step of the public survey. Archived questions remain available as historical response labels.

The **Website content** section edits bilingual page copy, page visibility and order, navbar labels/links/visibility, and homepage hero text and image URLs. Add a page under a URL path, then add a matching navbar item if it should appear in navigation. Hero images can use an existing `/public` path or an HTTPS URL.

The endpoint validates all submitted fields and stores the complete response in the `answers` JSONB column, with the respondent name, age band, province, city/village, consent, and submission time available as dedicated columns. The connection string is only read by the server and must never use a `NEXT_PUBLIC_` prefix.

Without `DATABASE_URL`, the endpoint returns a configuration error and does not show a false success state. The form continues to keep the user's draft in browser local storage until a database save succeeds.
