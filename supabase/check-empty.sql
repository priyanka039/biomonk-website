-- Single check: run THIS ONE alone in SQL Editor.
-- If every count is 0, your DB is empty and safe to run schema.sql fresh.

select
  (select count(*) from information_schema.tables where table_schema = 'public') as public_tables,
  (select count(*) from storage.buckets) as storage_buckets,
  (select count(*) from auth.users) as auth_users;
