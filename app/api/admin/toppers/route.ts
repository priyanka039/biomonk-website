import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const topperSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rank: z.number().int().min(1, "Rank is required"),
  score: z.number().optional(),
  year: z.number().int().optional(),
  quote: z.string().optional(),
  mentored_since: z.string().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const { data, error } = await supabase
    .from("toppers")
    .select("*")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  const { user } = auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON"] }, { status: 400 });
  }

  const parsed = topperSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("toppers")
    .insert({ ...parsed.data, updated_by: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  revalidatePublicSite();
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

  const schema = topperSchema.extend({ id: z.string().uuid() });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const { id, ...rest } = parsed.data;
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("toppers")
    .update({ ...rest, updated_by: user.id })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  revalidatePublicSite();
  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, errors: ["id is required"] }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { error } = await supabase.from("toppers").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  revalidatePublicSite();
  return NextResponse.json({ ok: true });
}
