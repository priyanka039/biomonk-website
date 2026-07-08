import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { z } from "zod";
import { zodErrorResponse } from "@/lib/validation/errors";

const courseSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  category: z.string().optional(),
  category_label: z.string().optional(),
  badge: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  sale_price: z.number().optional(),
  rating: z.number().optional(),
  students: z.union([z.string(), z.number()]).optional(),
  duration_label: z.string().optional(),
  lesson_count: z.number().int().optional(),
  last_updated: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  whats_included: z.array(z.string()).optional(),
  curriculum: z.array(z.unknown()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
  image_path: z.string().optional().nullable(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order");

  if (error) {
    return NextResponse.json(
      { ok: false, errors: [error.message] },
      { status: 500 }
    );
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
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON"] },
      { status: 400 }
    );
  }

  const parsed = courseSchema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Supabase not configured"] },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("courses")
    .insert({ ...parsed.data, updated_by: user.id })
    .select()
    .single();

  if (error) {
    const msg = error.code === "23505" ? "Slug already exists" : error.message;
    return NextResponse.json({ ok: false, errors: [msg] }, { status: 500 });
  }

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
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON"] },
      { status: 400 }
    );
  }

  const schema = courseSchema
    .extend({ id: z.string().uuid() })
    .partial({ slug: true, title: true });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return zodErrorResponse(parsed.error);

  const { id, ...rest } = parsed.data;
  if (!id) {
    return NextResponse.json(
      { ok: false, errors: ["id is required"] },
      { status: 400 }
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Supabase not configured"] },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("courses")
    .update({ ...rest, updated_by: user.id })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    const msg = error.code === "23505" ? "Slug already exists" : error.message;
    return NextResponse.json({ ok: false, errors: [msg] }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { ok: false, errors: ["id is required"] },
      { status: 400 }
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, errors: ["Supabase not configured"] },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) {
    return NextResponse.json(
      { ok: false, errors: [error.message] },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
