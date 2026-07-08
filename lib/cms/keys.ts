export const SECTION_KEYS = {
  HERO: "hero",
  PROOF_MARQUEE: "proof_marquee",
  PERSONA_CARDS: "persona_cards",
  WHY_BIOMONK: "why_biomonk",
  FREE_VS_PAID: "free_vs_paid",
  COMPARISON: "comparison",
  RESOURCES_HEADER: "resources_header",
  FEATURED_COURSES: "featured_courses",
  NEET_COUNTDOWN: "neet_countdown",
  PREDICTOR_BAND: "predictor_band",
  HALL_OF_FAME: "hall_of_fame",
  WHATSAPP_WALL: "whatsapp_wall",
  VICKY_STORY: "vicky_story",
  MENTOR_TEASER: "mentor_teaser",
  FAQ: "faq",
  FINAL_CTA: "final_cta",
  ABOUT_TIMELINE: "about_timeline",
  FOOTER: "footer",
} as const;

export type SectionKey = (typeof SECTION_KEYS)[keyof typeof SECTION_KEYS];
