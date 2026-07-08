-- BioMonk: what's already in your Supabase?
-- Run each block in SQL Editor. Safe on any project.

-- ── 1. All public tables ───────────────────────────────────────────────────
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;

-- ── 2. Approx row counts per table ───────────────────────────────────────────
select
  relname as table_name,
  n_live_tup as approx_rows
from pg_stat_user_tables
where schemaname = 'public'
order by relname;

-- ── 3. Storage buckets ─────────────────────────────────────────────────────
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
order by name;

-- ── 4. Auth users (for ADMIN_EMAILS) ───────────────────────────────────────
select id, email, created_at, last_sign_in_at
from auth.users
order by created_at;

-- ── 5. RLS policies on public tables ───────────────────────────────────────
select schemaname, tablename, policyname, cmd, qual
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
