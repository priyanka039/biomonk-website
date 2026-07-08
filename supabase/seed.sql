-- BioMonk optional seed data
-- Run AFTER schema.sql. Safe to re-run (uses ON CONFLICT or existence checks).

-- Site settings singleton
insert into public.site_settings (lms_url, neet_date, mentor_seats_left, stats)
select
  'https://learn.biomonk.in',
  '2027-05-02'::date,
  8,
  '{"students":"10,000+","years":"16+","toppers":"23","aiimsSelections":"6"}'::jsonb
where not exists (select 1 from public.site_settings limit 1);

-- Only insert seed contacts when table is empty
insert into public.contacts (type, value, label, sort_order, published)
select * from (values
  ('whatsapp', '919999999999', 'WhatsApp', 0, true),
  ('email', 'hello@biomonk.in', 'Email', 1, true),
  ('phone', '+91 99999 99999', 'Phone', 2, true),
  ('youtube', 'https://youtube.com/@biomonk', 'YouTube', 3, true),
  ('instagram', 'https://instagram.com/biomonk', 'Instagram', 4, true),
  ('whatsapp_group', 'https://chat.whatsapp.com/biomonk', 'WhatsApp Community', 5, true)
) as v(type, value, label, sort_order, published)
where not exists (select 1 from public.contacts limit 1);
