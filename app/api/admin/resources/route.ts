import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const BUCKET = "resources";

const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().default("notes"),
  file_path: z.string().min(1, "File path is required"),
  file_size: z.number().optional(),
  mime_type: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const { data, error } = await supabase
    .from("resources")
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

  const parsed = resourceSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("resources")
    .insert({ ...parsed.data, updated_by: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }

  logger.info("resource created", { userId: user.id, id: data.id });
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

  const schema = resourceSchema.extend({ id: z.string().uuid() }).partial({
    file_path: true,
    title: true,
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const { id, ...rest } = parsed.data;
  if (!id) {
    return NextResponse.json({ ok: false, errors: ["id is required"] }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("resources")
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

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, errors: ["id is required"] }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, errors: ["Supabase not configured"] }, { status: 503 });
  }

  const { data: row } = await supabase
    .from("resources")
    .select("file_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }

  if (row?.file_path) {
    await supabase.storage.from(BUCKET).remove([row.file_path]);
    logger.info("storage file deleted", { filePath: row.file_path });
  }

  revalidatePublicSite();
  return NextResponse.json({ ok: true });
}
