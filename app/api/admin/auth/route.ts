import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { isAdminEmail } from "@/lib/auth/admin";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON"] },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const { email, password } = parsed.data;

  if (!isAdminEmail(email)) {
    logger.warn("admin login rejected", { email });
    return NextResponse.json(
      { ok: false, errors: ["This email is not authorized as admin"] },
      { status: 403 }
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Supabase not configured"] },
      { status: 503 }
    );
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    logger.warn("admin login failed", { email, error: error.message });
    return NextResponse.json(
      { ok: false, errors: ["Invalid email or password"] },
      { status: 401 }
    );
  }

  logger.info("admin login success", { email });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
