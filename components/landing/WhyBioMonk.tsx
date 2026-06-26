import {
  Dna,
  Target,
  UserCheck,
  BarChart3,
  Hospital,
  MessageCircle,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const FEATURES = [
  {
    icon: Dna,
    title: "NCERT-First Methodology",
    desc: "Every concept anchored in NCERT before anything else. The way NEET actually asks questions.",
  },
  {
    icon: Target,
    title: "Rank-Oriented Structure",
    desc: "Not just 'understand biology' — but 'score 360/360 in Biology.' Every session targets marks.",
  },
  {
    icon: UserCheck,
    title: "Direct Mentor Access",
    desc: "This is Vicky Sir teaching you personally. Not an outsourced faculty. Not a recorded lecture farm.",
  },
  {
    icon: BarChart3,
    title: "Free NEET Predictor Tool",
    desc: "Enter your score, instantly see which medical colleges you qualify for. No email required.",
  },
  {
    icon: Hospital,
    title: "Mentor Connect (College Guidance)",
    desc: "Know which college to choose, which state quota to apply, which stream to pick. Expert counselling.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Community",
    desc: "Daily MCQs, doubt clearing, motivational pushes. 24/7 student community on WhatsApp.",
  },
];

export function WhyBioMonk() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="max-w-2xl">
        <SectionLabel>Why BioMonk</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          A mentor in your corner — not a coaching factory
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-moss bg-forest/60 p-6 transition-colors hover:border-gold/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
              <f.icon size={24} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-cream">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-parchment/70">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
