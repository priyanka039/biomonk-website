import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "leads";
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const format = searchParams.get("format");

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ ok: true, data: [] });

  const table =
    type === "mentor"
      ? "mentor_queries"
      : type === "predictor"
        ? "predictor_searches"
        : "leads";

  let q = supabase.from(table).select("*").order("created_at", { ascending: false });

  if (from) q = q.gte("created_at", from);
  if (to) q = q.lte("created_at", to);

  const { data, error } = await q.limit(500);
  if (error) {
    return NextResponse.json({ ok: false, errors: [error.message] }, { status: 500 });
  }

  if (format === "csv") {
    const rows = data ?? [];
    if (rows.length === 0) {
      return new NextResponse("", {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${type}-leads.csv"`,
        },
      });
    }
    const keys = Object.keys(rows[0]);
    const csv = [
      keys.join(","),
      ...rows.map((row) =>
        keys.map((k) => JSON.stringify((row as Record<string, unknown>)[k] ?? "")).join(",")
      ),
    ].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${type}-export.csv"`,
      },
    });
  }

  return NextResponse.json({ ok: true, data });
}
