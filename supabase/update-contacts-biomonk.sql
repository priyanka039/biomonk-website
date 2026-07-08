-- Update seed contacts with BioMonk real details.
-- Run in Supabase SQL Editor after seed.sql.

update public.contacts set value = '918860826298', label = 'WhatsApp'
where type = 'whatsapp';

update public.contacts set value = 'biomonkclasses@gmail.com', label = 'Email'
where type = 'email';

update public.contacts set value = '+91 88608 26298', label = 'Phone'
where type = 'phone';
