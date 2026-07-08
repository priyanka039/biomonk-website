-- BioMonk CMS schema (Final v1)
-- Run in Supabase SQL editor. Create Storage bucket "resources" (public) separately.

-- ── Helpers ──────────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── Site settings (singleton) ──────────────────────────────────────────────
-- stats JSONB contract:
-- { "students": "10,000+", "years": "16+", "toppers": "23", "aiimsSelections": "6" }

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  lms_url text,
  neet_date date,
  mentor_seats_left int default 8,
  stats jsonb not null default '{"students":"10,000+","years":"16+","toppers":"23","aiimsSelections":"6"}'::jsonb,
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ── Contacts (whatsapp, email, phone, socials) ─────────────────────────────

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in (
    'whatsapp', 'email', 'phone', 'youtube', 'instagram', 'whatsapp_group'
  )),
  value text not null,
  label text,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contacts_type_idx on public.contacts (type);
create index if not exists contacts_sort_order_idx on public.contacts (sort_order);

create trigger contacts_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

-- ── Content sections (JSON CMS) ────────────────────────────────────────────

create table if not exists public.content_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  page text not null default 'home',
  payload jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  display_order int not null default 0,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists content_sections_key_idx on public.content_sections (key);

create trigger content_sections_updated_at
  before update on public.content_sections
  for each row execute function public.set_updated_at();

-- ── Resources (PDFs) ───────────────────────────────────────────────────────

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'notes',
  file_path text not null,
  file_size bigint,
  mime_type text default 'application/pdf',
  download_count int not null default 0,
  published boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_published_idx on public.resources (published);
create index if not exists resources_featured_idx on public.resources (featured);
create index if not exists resources_sort_order_idx on public.resources (sort_order);

create trigger resources_updated_at
  before update on public.resources
  for each row execute function public.set_updated_at();

-- ── Courses ────────────────────────────────────────────────────────────────

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  category_label text,
  badge text,
  tagline text,
  description text,
  price int not null default 0,
  sale_price int not null default 0,
  rating numeric(2,1) default 4.9,
  students int default 0,
  duration_label text,
  lesson_count int default 0,
  last_updated text,
  highlights jsonb default '[]'::jsonb,
  whats_included jsonb default '[]'::jsonb,
  curriculum jsonb default '[]'::jsonb,
  image_path text,
  published boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists courses_slug_idx on public.courses (slug);
create index if not exists courses_published_idx on public.courses (published);
create index if not exists courses_featured_idx on public.courses (featured);

create trigger courses_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- ── Toppers (results) ──────────────────────────────────────────────────────

create table if not exists public.toppers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year int not null,
  rank int not null,
  score int,
  max_score int default 720,
  quote text,
  mentored_since text,
  featured boolean not null default false,
  sort_order int not null default 0,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists toppers_year_idx on public.toppers (year);
create index if not exists toppers_featured_idx on public.toppers (featured);

create trigger toppers_updated_at
  before update on public.toppers
  for each row execute function public.set_updated_at();

-- ── FAQs ───────────────────────────────────────────────────────────────────

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'General',
  published boolean not null default true,
  sort_order int not null default 0,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_sort_order_idx on public.faqs (sort_order);
create index if not exists faqs_category_idx on public.faqs (category);
create index if not exists faqs_published_idx on public.faqs (published);

create trigger faqs_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

-- ── Announcements ──────────────────────────────────────────────────────────

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  priority int not null default 0,
  dismissible boolean not null default true,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists announcements_active_idx on public.announcements (active);
create index if not exists announcements_priority_idx on public.announcements (priority);

create trigger announcements_updated_at
  before update on public.announcements
  for each row execute function public.set_updated_at();

-- ── Leads ──────────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'general',
  name text,
  phone text,
  context text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at);

create table if not exists public.mentor_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  neet_score int,
  category text,
  state text,
  college_preferences text,
  questions text,
  session_type text,
  preferred_slot text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mentor_queries_created_at_idx on public.mentor_queries (created_at);

create table if not exists public.predictor_searches (
  id uuid primary key default gen_random_uuid(),
  score int,
  category text,
  state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists predictor_searches_created_at_idx on public.predictor_searches (created_at);

-- ── Row Level Security (public read on published content) ──────────────────

alter table public.site_settings enable row level security;
alter table public.contacts enable row level security;
alter table public.content_sections enable row level security;
alter table public.resources enable row level security;
alter table public.courses enable row level security;
alter table public.toppers enable row level security;
alter table public.faqs enable row level security;
alter table public.announcements enable row level security;

create policy "Public read site_settings" on public.site_settings for select using (true);
create policy "Public read published contacts" on public.contacts for select using (published = true);
create policy "Public read published sections" on public.content_sections for select using (published = true);
create policy "Public read published resources" on public.resources for select using (published = true);
create policy "Public read published courses" on public.courses for select using (published = true);
create policy "Public read toppers" on public.toppers for select using (true);
create policy "Public read published faqs" on public.faqs for select using (published = true);
create policy "Public read active announcements" on public.announcements for select using (active = true);

-- Leads: no public read (admin API uses service role)
alter table public.leads enable row level security;
alter table public.mentor_queries enable row level security;
alter table public.predictor_searches enable row level security;

-- Allow anonymous inserts on lead tables (public forms)
create policy "Public insert leads" on public.leads for insert with check (true);
create policy "Public insert mentor_queries" on public.mentor_queries for insert with check (true);
create policy "Public insert predictor_searches" on public.predictor_searches for insert with check (true);
