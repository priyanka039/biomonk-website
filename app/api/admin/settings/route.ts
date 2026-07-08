import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const settingsSchema = z.object({
  lms_url: z.string().url("Invalid LMS URL").optional().or(z.literal("")),
  neet_date: z.string().optional(),
  mentor_seats_left: z.number().int().min(0).optional(),
  stats: z
    .object({
      students: z.string(),
      years: z.string(),
      toppers: z.string(),
      aiimsSelections: z.string(),
    })
    .optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] });
  }

  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  const { user } = auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON"] }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id, version, stats")
    .limit(1)
    .maybeSingle();

  const payload = {
    lms_url: parsed.data.lms_url || null,
    neet_date: parsed.data.neet_date || null,
    mentor_seats_left: parsed.data.mentor_seats_left,
    stats: parsed.data.stats,
    version:
      parsed.data.stats && JSON.stringify(parsed.data.stats) !== JSON.stringify(existing?.stats)
        ? (existing?.version ?? 1) + 1
        : existing?.version ?? 1,
    updated_at: new Date().toISOString(),
  };

  let result;
  if (existing?.id) {
    result = await supabase
      .from("site_settings")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase.from("site_settings").insert(payload).select().single();
  }

  if (result.error) {
    return NextResponse.json({ ok: false, errors: [result.error.message] }, { status: 500 });
  }

  logger.info("settings updated", { userId: user.id });
  return NextResponse.json({ ok: true, data: result.data });
}
