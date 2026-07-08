import Link from "next/link";
import { SECTION_KEYS } from "@/lib/cms/keys";

const LABELS: Record<string, string> = {
  [SECTION_KEYS.HERO]: "Hero",
  [SECTION_KEYS.PROOF_MARQUEE]: "Proof Marquee",
  [SECTION_KEYS.PERSONA_CARDS]: "Persona Cards",
  [SECTION_KEYS.WHY_BIOMONK]: "Why BioMonk",
  [SECTION_KEYS.FREE_VS_PAID]: "Free vs Paid",
  [SECTION_KEYS.COMPARISON]: "Comparison",
  [SECTION_KEYS.RESOURCES_HEADER]: "Resources Header",
  [SECTION_KEYS.FEATURED_COURSES]: "Featured Courses",
  [SECTION_KEYS.NEET_COUNTDOWN]: "NEET Countdown",
  [SECTION_KEYS.PREDICTOR_BAND]: "Predictor Band",
  [SECTION_KEYS.HALL_OF_FAME]: "Hall of Fame",
  [SECTION_KEYS.WHATSAPP_WALL]: "WhatsApp Wall",
  [SECTION_KEYS.VICKY_STORY]: "Vicky Story",
  [SECTION_KEYS.MENTOR_TEASER]: "Mentor Teaser",
  [SECTION_KEYS.FAQ]: "FAQ",
  [SECTION_KEYS.FINAL_CTA]: "Final CTA",
  [SECTION_KEYS.ABOUT_TIMELINE]: "About Timeline",
  [SECTION_KEYS.FOOTER]: "Footer",
};

export default function AdminSectionsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Content sections</h1>
      <p className="mt-1 text-sm text-parchment/70">
        Edit homepage and page section payloads as JSON
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(SECTION_KEYS).map((key) => (
          <li key={key}>
            <Link
              href={`/admin/sections/${key}`}
              className="block rounded-xl border border-moss bg-ink/40 px-4 py-4 transition-colors hover:border-gold/40"
            >
              <span className="font-medium text-cream">{LABELS[key] ?? key}</span>
              <span className="mt-1 block text-xs text-muted">{key}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
