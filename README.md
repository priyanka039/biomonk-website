# BioMonk — NEET Biology Marketing Site

Premium, mobile-first marketing site for **BioMonk**, the NEET Biology coaching brand by Vicky Vaswani. Built with Next.js (App Router) + TypeScript + Tailwind CSS v4.

## What's inside

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, why-us, free vs pro, courses, predictor band, hall of fame, story, mentor teaser, FAQ |
| `/courses`, `/courses/[slug]` | Course listing + detail (curriculum, faculty, reviews). "Request Access" routes to Vicky Sir — no payment gateway |
| `/free-tools/neet-predictor` | Full NEET College Predictor (200+ colleges) ported from the original HTML, restyled to brand. No login required |
| `/mentor-connect` | Counselling service cards, pricing, and an application form |
| `/results` | Hall of Fame with year filter + stats |
| `/about` | Vicky Sir's story and career timeline |
| `/dashboard` | Showcase of the student dashboard that links out to the existing external LMS |
| `/api/lead` | Unified lead capture (enrollment / general / mentor / predictor) |

## Conversion model

There is **no payment gateway**. Every "buy/enroll" action opens a short interest form that:
1. Posts to `/api/lead` (persisted to Supabase if configured), and
2. Funnels the user to **WhatsApp** to connect directly with Vicky Sir.

A sticky, pulsing WhatsApp button is present on every page.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Environment variables

See [`.env.example`](.env.example). The site runs with **no env vars set** — lead forms degrade gracefully to WhatsApp. Set these to go live:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your number (digits only, e.g. `9198…`)
- `NEXT_PUBLIC_WHATSAPP_GROUP_LINK` — community invite link
- `NEXT_PUBLIC_LMS_URL` — the existing LMS the dashboard links to
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — optional, to persist leads

### Optional Supabase tables

If you connect Supabase, create these tables (the API no-ops without them):

- `leads` (`type`, `name`, `phone`, `context`)
- `mentor_queries` (per the columns in `app/api/lead/route.ts`)
- `predictor_searches` (`score`, `category`, `state`)

## Editing content

- Courses: `lib/data/courses.ts`
- Toppers / results: `lib/data/results.ts`
- FAQs: `lib/data/faq.ts`
- College cutoffs: `lib/data/colleges.ts` (auto-generated from `reference/neet-predictor.html` via `scripts/extract-colleges.mjs`)
- Brand config (links, stats): `lib/site.ts`

Replace the `VV` portrait placeholders with real images under `public/images/`.
