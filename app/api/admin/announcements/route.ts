import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  active: z.boolean().optional(),
  starts_at: z.string().nullable().optional(),
  ends_at: z.string().nullable().optional(),
  priority: z.number().int().optional(),
  dismissible: z.boolean().optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("priority");

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

  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("announcements")
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

  const schema = announcementSchema.extend({ id: z.string().uuid() });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const { id, ...rest } = parsed.data;
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("announcements")
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

  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  revalidatePublicSite();
  return NextResponse.json({ ok: true });
}
