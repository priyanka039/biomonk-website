# BioMonk — NEET Biology Marketing Site

Premium, mobile-first marketing site for **BioMonk**, the NEET Biology coaching brand by Vicky Vaswani. Built with Next.js (App Router) + TypeScript + Tailwind CSS v4 + Supabase CMS.

## What's inside

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, why-us, free vs pro, courses, predictor band, hall of fame, story, mentor teaser, FAQ |
| `/courses`, `/courses/[slug]` | Course listing + detail. "Request Access" routes to Vicky Sir — no payment gateway |
| `/free-tools/neet-predictor` | Full NEET College Predictor (200+ colleges) |
| `/mentor-connect` | Counselling service cards, pricing, and application form |
| `/results` | Hall of Fame with year filter + stats |
| `/about` | Vicky Sir's story and career timeline |
| `/dashboard` | Showcase of the student dashboard that links out to the external LMS |
| `/admin` | Supabase-authenticated CMS (settings, contacts, resources, leads, sections, courses, toppers, FAQs, announcements) |
| `/api/lead` | Unified lead capture (enrollment / general / mentor / predictor) |
| `/api/download/[id]` | Resource download — increments `download_count`, redirects to Storage |

## Project structure

```
app/
  (public)/          # Marketing pages
  admin/             # Admin login + CMS panel
  api/               # Public + admin API routes
components/
  landing/           # Homepage sections
  admin/             # Admin shell, nav, toasts
lib/
  cms/               # CMS getters (DB → static fallback → empty UI)
  storage.ts         # getPublicFileUrl(), upload helpers
  logger.ts          # Structured logging wrapper
  site.ts            # Static defaults when CMS is empty
  data/              # Static fallbacks (courses, results, faq, colleges)
supabase/
  schema.sql         # Full database schema (run in Supabase SQL editor)
middleware.ts        # Protects /admin/* and /api/admin/*
```

## How the CMS works

1. **Public reads** go through `lib/cms/` — try Supabase first, fall back to `lib/site.ts` / `lib/data/*`, never crash on bad data.
2. **Admin writes** go through `/api/admin/*` — middleware + `ADMIN_EMAILS` allowlist + Zod validation.
3. **Resources** store `file_path` only; public URLs from `getPublicFileUrl()`. Downloads via `/api/download/[id]` so `download_count` is accurate.
4. **Contacts** live in the `contacts` table — Navbar, Footer, and WhatsApp CTAs read from CMS with env/static fallbacks.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin/login

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required for | What breaks if missing |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | CMS + admin | Site runs on static fallbacks; admin returns 503 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Admin auth sessions | Cannot log in to admin |
| `SUPABASE_SERVICE_ROLE_KEY` | CMS reads/writes | CMS returns static data only |
| `ADMIN_EMAILS` | Admin access | No one can access `/admin` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | CTAs (fallback) | Uses placeholder number |
| `NEXT_PUBLIC_LMS_URL` | Dashboard links | Uses default learn.biomonk.in |

## Deployment checklist

1. Run `supabase/schema.sql` in the Supabase SQL editor
2. Create a public Storage bucket named `resources` with folders: `resources/notes`, `resources/dpp`, `resources/pyqs`, `resources/mock-tests`
3. Create an admin user in Supabase Auth; set session expiry to ~7 days
4. Set all env vars in your hosting provider
5. Log in at `/admin` → Site Settings + Contacts → upload first resources

## Database schema

All tables use UUID primary keys, `created_at` / `updated_at`, and `updated_by` (FK to `auth.users`) on mutable CMS tables. See [`supabase/schema.sql`](supabase/schema.sql) for:

- `site_settings` (singleton — LMS URL, NEET date, mentor seats, stats JSONB)
- `contacts` (WhatsApp, email, phone, social links)
- `content_sections` (homepage section payloads as JSONB)
- `resources`, `courses`, `toppers`, `faqs`, `announcements`
- `leads`, `mentor_queries`, `predictor_searches`

## Adding a new homepage section

1. Add a key to `SECTION_KEYS` in `lib/cms/keys.ts`
2. Seed a row in `content_sections` (or create via `/admin/sections/[key]`)
3. Wire `getSection(SECTION_KEYS.YOUR_KEY)` in the component with a static fallback
4. Build an admin form in `/admin/sections/[key]` (JSON editor included)

## Static fallbacks

Until the CMS is populated, content comes from:

- Courses: `lib/data/courses.ts`
- Toppers / results: `lib/data/results.ts`
- FAQs: `lib/data/faq.ts`
- College cutoffs: `lib/data/colleges.ts`
- Brand config: `lib/site.ts`

Replace the `VV` portrait placeholders with real images under `public/images/`.
