# Deploy BioMonk website

Deploy the **marketing site + admin panel** to **one** host only. You do **not** need the same env vars on both Vercel and Render unless you run two copies of this repo (not recommended).

| What | Where |
|------|--------|
| This Next.js site (`biomonk-website`) | **Vercel** (recommended) or Render |
| LMS (`learn.biomonk.in`) | Already separate — keep as-is |
| Database + files | **Supabase** (already set up) |

---

## Recommended: Vercel only

### 1. Push code to GitHub
```bash
git add .
git commit -m "BioMonk CMS ready for deploy"
git push origin main
```

### 2. Import on Vercel
1. [vercel.com](https://vercel.com) → **Add New → Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. **Do not deploy yet** — add env vars first

### 3. Environment variables (Vercel → Settings → Environment Variables)

Add **all** of these for **Production**, **Preview**, and **Development**:

| Variable | Example / notes |
|----------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | `https://biomonk.in` |
| `NEXT_PUBLIC_APP_URL` | `https://biomonk.in` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://uwndpcqvpbwhjucavicz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` **server only** |
| `ADMIN_EMAILS` | `biomonkclasses@gmail.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `918860826298` |
| `NEXT_PUBLIC_WHATSAPP_GROUP_LINK` | your group link (optional) |
| `NEXT_PUBLIC_LMS_URL` | `https://learn.biomonk.in` |
| `NEXT_PUBLIC_NEET_DATE` | `2027-05-02` |
| `NEXT_PUBLIC_MENTOR_SEATS` | `8` |

Copy values from your local `.env.local`.

### 4. Deploy
Click **Deploy**. First build ~2–3 min.

### 5. Custom domain
Vercel → Project → **Domains** → add `biomonk.in` and `www.biomonk.in`  
Update DNS at your registrar (Vercel shows exact records).

### 6. Supabase auth redirect (for admin login on production)
Supabase → **Authentication → URL Configuration**:
- **Site URL:** `https://biomonk.in`
- **Redirect URLs:** add `https://biomonk.in/**` and `http://localhost:3000/**`

---

## Alternative: Render (if you prefer)

1. [render.com](https://render.com) → **New → Web Service**
2. Connect GitHub repo
3. **Environment:** Node
4. **Build command:** `npm install && npm run build`
5. **Start command:** `npm start`
6. Add the **same env vars** as the Vercel table above
7. Deploy

Use **either** Vercel **or** Render for this repo — not both for production.

---

## Do NOT duplicate on Vercel + Render

| Mistake | Why it's bad |
|---------|----------------|
| Same site on Vercel and Render | Two URLs, confused DNS, double maintenance |
| Env only on one platform | Other deploy won't have CMS/admin |
| `service_role` in client code | Security risk — only in server env |

---

## Post-deploy checklist

- [ ] https://biomonk.in loads
- [ ] WhatsApp button uses `8860826298`
- [ ] https://biomonk.in/admin/login works
- [ ] Upload PDF in admin → appears on homepage with **Notes / DPP / PYQs** tag
- [ ] Download link works
- [ ] Submit mentor form → row in `/admin/leads`

---

## Edit homepage resources section text

**Admin → Sections → `resources_header`**  
JSON example:
```json
{
  "title": "Start with our free study material",
  "subtitle": "Hand-picked notes, DPPs and PYQs — no sign-up required."
}
```

## Upload study material (admin)

**Admin → Resources**
1. Title: chapter name
2. Description: one bullet per line (shows in preview cards)
3. Category: **Notes**, **DPP**, **PYQs**, or **Mock Test** → colored tag on site
4. Upload PDF → **Create resource**
5. Toggle **Featured** for main grid; all published appear in “Look inside” carousel
