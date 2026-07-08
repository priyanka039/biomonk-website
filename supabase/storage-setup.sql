-- BioMonk Storage setup
-- Run AFTER schema.sql in Supabase SQL editor.
-- Creates the public "resources" bucket and upload/read policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resources',
  'resources',
  true,
  26214400, -- 25 MB
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'] (id) do update set
  public = true,
  file_size_limit = 26214400,
  allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

-- Public read (anyone can download via public URL)
create policy "Public read resources bucket"
on storage.objects for select
using (bucket_id = 'resources');

-- Service role uploads via API (bypasses RLS); authenticated admins optional:
create policy "Authenticated upload resources"
on storage.objects for insert
with check (
  bucket_id = 'resources'
  and auth.role() = 'authenticated'
);

create policy "Authenticated delete resources"
on storage.objects for delete
using (
  bucket_id = 'resources'
  and auth.role() = 'authenticated'
);

-- Folder structure (create on first upload; documented here for reference):
-- resources/notes/
-- resources/dpp/
-- resources/pyqs/
-- resources/mock-tests/
