# Neon survey database setup

1. Create a PostgreSQL project in Neon and open its **Connect** dialog.
2. Copy the connection string for your database.
3. Copy `.env.example` to `.env.local` and replace the placeholder `DATABASE_URL` with that connection string. Keep `.env.local` private; it is ignored by Git.
4. Run `npm run db:setup` to apply [`database/schema.sql`](database/schema.sql) and all database migrations, including the CMS and newspaper-gallery tables. If applying SQL manually to an existing database, also run [`database/migrations/2026-10-05-newspaper-gallery.sql`](database/migrations/2026-10-05-newspaper-gallery.sql). Existing pages, navbar links, and home hero defaults are seeded idempotently on the first site-content request.
5. Restart the Next.js dev server. The survey endpoint is `POST /api/survey` and accepts `{ "answers": { ...surveyFields } }`.
6. Set the same `DATABASE_URL` as a server-side environment variable in your deployment platform.

## Admin dashboard

1. Set `ADMIN_PASSWORD` to a unique password of at least 16 characters.
2. Generate `ADMIN_SESSION_SECRET` with `node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"` and add it to `.env.local` and your deployment environment.
3. Open `/admin`, sign in, and use search, province filters, paging, and CSV export. Admin sessions expire after eight hours and use an HTTP-only, SameSite=Strict cookie.

The admin API requires a valid signed session before it queries Neon. Keep the admin page behind HTTPS and, for internet-facing production deployments, consider adding your platform's IP allowlist or rate limiting.

The `/admin` dashboard includes a **Survey questions** section. It supports short text, long answers, number, email, date, yes/no, 1-to-5 rating, single choice, multiple choice, and dropdown questions. Prompts and choices are entered in English and Urdu; saved active questions appear in an additional step of the public survey. Archived questions remain available as historical response labels.

The **Website content** section edits bilingual page copy, page visibility and order, navbar labels/links/visibility, homepage hero text and image URLs, and newspaper-gallery uploads. Upload JPEG, PNG, or WebP newspaper scans up to 4 MB, set English and Urdu titles, and publish, unpublish, or remove each image. Uploaded gallery images are stored in Neon and open in a full-screen viewer on the homepage.

The endpoint validates all submitted fields and stores the complete response in the `answers` JSONB column, with the respondent name, age band, province, city/village, consent, and submission time available as dedicated columns. The connection string is only read by the server and must never use a `NEXT_PUBLIC_` prefix.

Without `DATABASE_URL`, the endpoint returns a configuration error and does not show a false success state. The form continues to keep the user's draft in browser local storage until a database save succeeds.
