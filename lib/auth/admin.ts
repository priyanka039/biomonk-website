import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { logger } from "@/lib/logger";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allowed = adminEmails();
  if (allowed.length === 0) return false;
  return allowed.includes(email.toLowerCase());
}

export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email || !isAdminEmail(user.email)) {
    if (error) logger.warn("admin session check failed", { error: error.message });
    return null;
  }

  return { supabase, user };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ ok: false, errors: ["Unauthorized"] }, { status: 401 });
  }
  return session;
}
