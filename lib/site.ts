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
};

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
