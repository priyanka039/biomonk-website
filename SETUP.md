# BioMonk — Your setup checklist

Everything in the codebase is implemented. Follow these steps to go live with the admin CMS.

---

## Part A — What’s already done (no action needed)

- FIITJEE removed from all public copy
- Full admin panel at `/admin` (login, dashboard, settings, contacts, resources, leads, sections, courses, toppers, FAQs, announcements)
- CMS layer with static fallbacks when Supabase is empty
- Download API with `download_count` tracking
- Public site wired to CMS (Footer, WhatsApp, Resources, Courses, Results, FAQs, announcements banner)
- `supabase/schema.sql` — all tables, indexes, RLS
- `supabase/storage-setup.sql` — bucket + policies
- `supabase/seed.sql` — optional starter settings/contacts

---

## Part B — Your steps (≈30 minutes)

### 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **New project** → pick a name (e.g. `biomonk`), region (Mumbai if most users are in India), set a DB password (save it)

### 2. Run the SQL scripts (in order)

In Supabase → **SQL Editor** → New query:

| Order | File | What it does |
|-------|------|--------------|
| 1 | `supabase/schema.sql` | All CMS tables + RLS |
| 2 | `supabase/storage-setup.sql` | Public `resources` bucket for PDFs |
| 3 | `supabase/seed.sql` | *(Optional)* Default settings + placeholder contacts |

Copy each file’s contents, paste, and click **Run**.

### 3. Create your admin user

1. Supabase → **Authentication** → **Users** → **Add user**
2. Email: your real admin email (e.g. `vicky@biomonk.in`)
3. Password: strong password (you’ll use this at `/admin/login`)
4. Check **Auto confirm user**

### 4. Set session expiry (~7 days)

1. Supabase → **Authentication** → **Settings** → **Sessions**
2. Set **Inactivity timeout** to **604800** seconds (7 days) or your preference

### 5. Copy API keys

Supabase → **Project Settings** → **API**:

| Key | Env variable |
|-----|--------------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

Never commit `service_role` or put it in client-side code.

### 6. Create `.env.local`

In the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your real values:

```env
NEXT_PUBLIC_SITE_URL=https://biomonk.in

NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/YOUR_LINK
NEXT_PUBLIC_LMS_URL=https://learn.biomonk.in
NEXT_PUBLIC_NEET_DATE=2027-05-02
NEXT_PUBLIC_MENTOR_SEATS=8

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

ADMIN_EMAILS=vicky@biomonk.in
```

`ADMIN_EMAILS` must match the email you created in step 3. Multiple admins: comma-separated, no spaces.

### 7. Test locally

```bash
npm install
npm run dev
```

| URL | Expected |
|-----|----------|
| http://localhost:3000 | Public site (works even before CMS is filled) |
| http://localhost:3000/admin/login | Admin login |
| After login → `/admin` | Dashboard with stats |

### 8. First admin tasks (after login)

1. **Settings** → update LMS URL, NEET date, mentor seats, stats
2. **Settings → Contacts** → replace placeholder WhatsApp, email, phone, YouTube, Instagram
3. **Resources** → upload your first PDF (notes / DPP / PYQ / mock test)
4. **Announcements** → add a banner if needed (dismissible toggle available)
5. Optionally add courses, toppers, FAQs via their admin pages (or keep static fallbacks until you’re ready)

### 9. Deploy (Vercel recommended)

1. Push repo to GitHub
2. [vercel.com](https://vercel.com) → Import project
3. Add the same env vars from `.env.local` in **Project Settings → Environment Variables**
4. Deploy
5. Set custom domain `biomonk.in` in Vercel → point DNS as instructed

### 10. Post-deploy smoke test

- [ ] Homepage loads, WhatsApp button uses your number
- [ ] Submit a test lead on Mentor Connect → appears in `/admin/leads`
- [ ] Upload a PDF → download from homepage increments count
- [ ] Log out and confirm `/admin` redirects to login

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Admin login says “not authorized” | Email must be in `ADMIN_EMAILS` env var (exact match, lowercase ok) |
| Admin login fails with invalid credentials | Reset password in Supabase Auth → Users |
| CMS shows static data only | Check `SUPABASE_SERVICE_ROLE_KEY` is set on server (Vercel env) |
| PDF upload fails | Run `storage-setup.sql`; bucket must be named `resources` |
| Downloads 404 | Resource must be `published`; `file_path` must exist in bucket |
| Leads not saving | Run `schema.sql`; check Vercel logs for Supabase errors |

---

## Optional later

- Migrate static courses/toppers/FAQs into CMS via admin UI or a one-off SQL import
- Replace `/public/vicky.png` and other assets with final photography
- Point `NEXT_PUBLIC_LMS_URL` to your real LMS when ready
