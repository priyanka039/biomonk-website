import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";
import { SECTION_KEYS } from "@/lib/cms/keys";

const sectionSchema = z.object({
  label: z.string().optional(),
  page: z.string().optional(),
  payload: z.record(z.string(), z.unknown()),
  published: z.boolean().optional(),
  display_order: z.number().int().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const { key } = await params;
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("content_sections")
    .select("*")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  return NextResponse.json({ ok: true, data });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  const { user } = auth;

  const { key } = await params;
  const validKeys = Object.values(SECTION_KEYS);
  if (!validKeys.includes(key as (typeof validKeys)[number])) {
    return NextResponse.json({ ok: false, errors: ["Invalid section key"] }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON"] }, { status: 400 });
  }

  const parsed = sectionSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data: existing } = await supabase
    .from("content_sections")
    .select("id")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from("content_sections")
      .update({ ...parsed.data, updated_by: user.id })
      .eq("key", key)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
    }
    return NextResponse.json({ ok: true, data });
  }

  const { data, error } = await supabase
    .from("content_sections")
    .insert({
      key,
      label: parsed.data.label ?? key,
      page: parsed.data.page ?? "home",
      ...parsed.data,
      updated_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  return NextResponse.json({ ok: true, data });
}
