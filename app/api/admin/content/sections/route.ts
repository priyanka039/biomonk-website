import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const { data, error } = await supabase
    .from("content_sections")
    .select("*")
    .order("display_order");

  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }
  return NextResponse.json({ ok: true, data });
}
