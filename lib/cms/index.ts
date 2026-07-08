import { getServiceClient } from "@/lib/supabase/server";
import { getPublicFileUrl } from "@/lib/storage";
import { siteConfig } from "@/lib/site";
import { COURSES, type Course } from "@/lib/data/courses";
import { TOPPERS, type TopperResult } from "@/lib/data/results";
import { FAQS } from "@/lib/data/faq";
import { logger } from "@/lib/logger";
import type { SectionKey } from "./keys";

export interface SiteStats {
  students: string;
  years: string;
  toppers: string;
  aiimsSelections: string;
}

export interface SiteSettingsData {
  lmsUrl: string;
  neetDate: string;
  mentorSeatsLeft: number;
  stats: SiteStats;
}

export interface ContactRow {
  id: string;
  type: string;
  value: string;
  label: string | null;
  sort_order: number;
  published: boolean;
}

export interface ResourceRow {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  download_count: number;
  published: boolean;
  featured: boolean;
  sort_order: number;
}

export interface AnnouncementRow {
  id: string;
  title: string;
  body: string;
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  priority: number;
  dismissible: boolean;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  sort_order: number;
}

function db() {
  return getServiceClient();
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const fallback: SiteSettingsData = {
    lmsUrl: siteConfig.lmsUrl,
    neetDate: siteConfig.neetDate,
    mentorSeatsLeft: siteConfig.mentorSeatsLeft,
    stats: { ...siteConfig.stats },
  };

  const supabase = db();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) return fallback;

    const stats = data.stats as SiteStats | null;
    return {
      lmsUrl: data.lms_url ?? fallback.lmsUrl,
      neetDate: data.neet_date ?? fallback.neetDate,
      mentorSeatsLeft: data.mentor_seats_left ?? fallback.mentorSeatsLeft,
      stats: stats ?? fallback.stats,
    };
  } catch (err) {
    logger.error("[cms] fallback getSiteSettings", { err });
    return fallback;
  }
}

export async function getContacts(): Promise<ContactRow[]> {
  const fallback: ContactRow[] = [
    {
      id: "fb-whatsapp",
      type: "whatsapp",
      value: siteConfig.whatsappNumber,
      label: "WhatsApp",
      sort_order: 0,
      published: true,
    },
    {
      id: "fb-email",
      type: "email",
      value: siteConfig.email,
      label: "Email",
      sort_order: 1,
      published: true,
    },
    {
      id: "fb-phone",
      type: "phone",
      value: siteConfig.phoneDisplay,
      label: "Phone",
      sort_order: 2,
      published: true,
    },
    {
      id: "fb-youtube",
      type: "youtube",
      value: siteConfig.socials.youtube,
      label: "YouTube",
      sort_order: 3,
      published: true,
    },
    {
      id: "fb-instagram",
      type: "instagram",
      value: siteConfig.socials.instagram,
      label: "Instagram",
      sort_order: 4,
      published: true,
    },
    {
      id: "fb-wa-group",
      type: "whatsapp_group",
      value: siteConfig.whatsappGroupLink,
      label: "WhatsApp Community",
      sort_order: 5,
      published: true,
    },
  ];

  const supabase = db();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("published", true)
      .order("sort_order");

    if (error || !data?.length) return fallback;
    return data as ContactRow[];
  } catch (err) {
    logger.error("[cms] fallback getContacts", { err });
    return fallback;
  }
}

export function contactByType(
  contacts: ContactRow[],
  type: string
): ContactRow | undefined {
  return contacts.find((c) => c.type === type);
}

export async function getSection<T = Record<string, unknown>>(
  key: SectionKey
): Promise<T | null> {
  const supabase = db();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("content_sections")
      .select("payload")
      .eq("key", key)
      .eq("published", true)
      .maybeSingle();

    if (error || !data?.payload) return null;
    return data.payload as T;
  } catch (err) {
    logger.error("[cms] fallback getSection", { key, err });
    return null;
  }
}

export async function getResources(opts?: {
  featured?: boolean;
}): Promise<ResourceRow[]> {
  const supabase = db();
  if (!supabase) return [];

  try {
    let q = supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("sort_order");

    if (opts?.featured) q = q.eq("featured", true);

    const { data, error } = await q;
    if (error) {
      logger.error("[cms] fallback getResources", { err: error });
      return [];
    }
    return (data ?? []) as ResourceRow[];
  } catch (err) {
    logger.error("[cms] fallback getResources", { err });
    return [];
  }
}

export async function getCourses(): Promise<Course[]> {
  const supabase = db();
  if (!supabase) return COURSES;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("published", true)
      .order("sort_order");

    if (error || !data?.length) return COURSES;

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      categoryLabel: row.category_label ?? row.category,
      badge: row.badge ?? undefined,
      tagline: row.tagline ?? "",
      description: row.description ?? "",
      price: row.price,
      salePrice: row.sale_price,
      rating: Number(row.rating),
      students: Number(row.students) || 0,
      durationLabel: row.duration_label ?? "",
      lessonCount: row.lesson_count,
      lastUpdated: row.last_updated ?? "",
      highlights: (row.highlights as string[]) ?? [],
      whatsIncluded: (row.whats_included as string[]) ?? [],
      curriculum: (row.curriculum as Course["curriculum"]) ?? [],
      imagePath: row.image_path ?? undefined,
      imageUrl: row.image_path ? getPublicFileUrl(row.image_path) : undefined,
    }));
  } catch (err) {
    logger.error("[cms] fallback getCourses", { err });
    return COURSES;
  }
}

export async function getToppers(): Promise<TopperResult[]> {
  const supabase = db();
  if (!supabase) return TOPPERS;

  try {
    const { data, error } = await supabase
      .from("toppers")
      .select("*")
      .order("sort_order");

    if (error || !data?.length) return TOPPERS;

    return data.map((row) => ({
      name: row.name,
      air: row.rank,
      score: row.score ?? 0,
      college: "",
      quote: row.quote ?? "",
      year: row.year,
      since: row.mentored_since ?? "",
    }));
  } catch (err) {
    logger.error("[cms] fallback getToppers", { err });
    return TOPPERS;
  }
}

export async function getFaqs(): Promise<{ q: string; a: string; id?: string }[]> {
  const supabase = db();
  if (!supabase) return FAQS;

  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("published", true)
      .order("sort_order");

    if (error || !data?.length) return FAQS;

    return data.map((row) => ({
      id: row.id,
      q: row.question,
      a: row.answer,
    }));
  } catch (err) {
    logger.error("[cms] fallback getFaqs", { err });
    return FAQS;
  }
}

export async function getAnnouncements(): Promise<AnnouncementRow[]> {
  const supabase = db();
  if (!supabase) return [];

  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("active", true)
      .order("priority")
      .order("created_at", { ascending: false });

    if (error) return [];

    return ((data ?? []) as AnnouncementRow[]).filter((a) => {
      if (a.starts_at && a.starts_at > now) return false;
      if (a.ends_at && a.ends_at < now) return false;
      return true;
    });
  } catch (err) {
    logger.error("[cms] fallback getAnnouncements", { err });
    return [];
  }
}

export async function getResourceById(id: string): Promise<ResourceRow | null> {
  const supabase = db();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as ResourceRow;
}

export async function incrementDownloadCount(id: string): Promise<void> {
  const supabase = db();
  if (!supabase) return;

  const { data } = await supabase
    .from("resources")
    .select("download_count")
    .eq("id", id)
    .maybeSingle();

  if (!data) return;

  await supabase
    .from("resources")
    .update({ download_count: (data.download_count ?? 0) + 1 })
    .eq("id", id);
}
