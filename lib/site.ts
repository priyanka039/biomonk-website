/**
 * Central site configuration. Swap the placeholder values (or set the matching
 * NEXT_PUBLIC_* env vars) when the real numbers/links are ready.
 */

const RAW_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "919999999999";

export const siteConfig = {
  name: "BioMonk",
  tagline: "India's Most Trusted NEET Biology Mentor",
  mentor: "Vicky Vaswani",
  location: "Bangalore, India",
  email: "hello@biomonk.in",
  phoneDisplay: "+91 99999 99999",
  whatsappNumber: RAW_WHATSAPP,
  whatsappGroupLink:
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK ||
    "https://chat.whatsapp.com/biomonk",
  lmsUrl: process.env.NEXT_PUBLIC_LMS_URL || "https://learn.biomonk.in",
  socials: {
    youtube: "https://youtube.com/@biomonk",
    instagram: "https://instagram.com/biomonk",
  },
  stats: {
    years: "16+",
    students: "10,000+",
    toppers: "23",
    aiimsSelections: "6",
  },
  // NEET 2027 is expected on the first Sunday of May. Update when NTA confirms.
  neetDate: process.env.NEXT_PUBLIC_NEET_DATE || "2027-05-02",
  // Honest scarcity: real number of mentor-connect slots open this month.
  mentorSeatsLeft: Number(process.env.NEXT_PUBLIC_MENTOR_SEATS ?? 8),
};

/**
 * Whole days remaining until the NEET exam date (>= 0).
 */
export function daysToNeet(from: Date = new Date()): number {
  const target = new Date(`${siteConfig.neetDate}T00:00:00`);
  const ms = target.getTime() - from.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/**
 * Build a wa.me deep link with a pre-filled message.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Free Tools", href: "/free-tools/neet-predictor" },
  { label: "Free Resources", href: "/#resources" },
  { label: "Results", href: "/results" },
  { label: "Mentor Connect", href: "/mentor-connect" },
  { label: "About", href: "/about" },
];
