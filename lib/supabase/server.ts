import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a server-side Supabase client using the service-role key, or `null`
 * when env vars are not configured. Callers MUST handle the null case so the
 * site keeps working (degrading to WhatsApp) before keys are added.
 *
 * NOTE: the service-role key must never be imported into client components.
 */
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const supabaseConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
