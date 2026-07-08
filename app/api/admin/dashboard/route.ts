import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

async function fetchDashboardStats() {
  const supabase = getServiceClient();
  if (!supabase) {
    return {
      leads: 0,
      mentorQueries: 0,
      predictorSearches: 0,
      resources: 0,
      publishedCourses: 0,
      activeAnnouncements: 0,
      recentLeads: [] as unknown[],
      recentUploads: [] as unknown[],
    };
  }

  const [
    leads,
    mentor,
    predictor,
    resources,
    courses,
    announcements,
    recentLeads,
    recentUploads,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("mentor_queries").select("id", { count: "exact", head: true }),
    supabase.from("predictor_searches").select("id", { count: "exact", head: true }),
    supabase.from("resources").select("id", { count: "exact", head: true }),
    supabase
      .from("courses")
      .select("id", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("announcements")
      .select("id", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from("leads")
      .select("id, type, name, phone, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("resources")
      .select("id, title, category, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    leads: leads.count ?? 0,
    mentorQueries: mentor.count ?? 0,
    predictorSearches: predictor.count ?? 0,
    resources: resources.count ?? 0,
    publishedCourses: courses.count ?? 0,
    activeAnnouncements: announcements.count ?? 0,
    recentLeads: recentLeads.data ?? [],
    recentUploads: recentUploads.data ?? [],
  };
}

const getCachedStats = unstable_cache(fetchDashboardStats, ["admin-dashboard-stats"], {
  revalidate: 60,
});

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  const stats = await getCachedStats();
  return NextResponse.json({ ok: true, data: stats });
}
