import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

/**
 * Unified lead-capture endpoint. Handles:
 *  - "enrollment"  -> course interest (no payment; routes to Vicky Sir)
 *  - "general"     -> generic "talk to mentor" lead
 *  - "mentor"      -> Mentor Connect counselling application
 *  - "predictor"   -> anonymous predictor search analytics
 *
 * Persists to Supabase when configured; otherwise no-ops gracefully so the
 * front-end can always fall back to WhatsApp.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = String(body.type ?? "general");
  const supabase = getServiceClient();

  // No backend configured yet — accept the lead so UX stays smooth.
  if (!supabase) {
    console.info("[lead] received (no Supabase configured):", { type, ...body });
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    if (type === "mentor") {
      await supabase.from("mentor_queries").insert({
        name: body.name,
        phone: body.phone,
        email: body.email ?? null,
        neet_score: body.neetScore ? Number(body.neetScore) : null,
        category: body.category ?? null,
        state: body.state ?? null,
        college_preferences: body.collegePreferences ?? null,
        questions: body.questions ?? null,
        session_type: body.sessionType ?? null,
        preferred_slot: body.preferredSlot ?? null,
        status: "pending",
      });
    } else if (type === "predictor") {
      await supabase.from("predictor_searches").insert({
        score: body.score ? Number(body.score) : null,
        category: body.category ?? null,
        state: body.state ?? null,
      });
    } else {
      await supabase.from("leads").insert({
        type,
        name: body.name ?? null,
        phone: body.phone ?? null,
        context: body.context ?? null,
      });
    }
    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[lead] Supabase insert failed:", err);
    // Still return ok so the user is funnelled to WhatsApp without friction.
    return NextResponse.json({ ok: true, persisted: false });
  }
}
