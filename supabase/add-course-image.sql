-- Add course cover images (run once in Supabase SQL Editor)
alter table public.courses
  add column if not exists image_path text;

-- Allow JPEG/PNG/WebP in the resources bucket (course covers + PDFs)
update storage.buckets
set allowed_mime_types = array[
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp'
]
where id = 'resources';
