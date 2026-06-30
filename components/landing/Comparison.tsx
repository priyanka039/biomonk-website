import { Check, X, Award, Users, Trophy, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { siteConfig } from "@/lib/site";

const ROWS = [
  {
    label: "When you can start",
    biomonk: "Today — instant access",
    other: "Wait for the next batch",
  },
  {
    label: "Who teaches you",
    biomonk: "Vicky Sir, personally",
    other: "Rotating / outsourced faculty",
  },
  {
    label: "Batch size",
    biomonk: "Mentor-led, personal",
    other: "Crowded halls of 200+",
  },
  {
    label: "Doubt support",
    biomonk: "Direct WhatsApp access",
    other: "Raise a ticket, wait days",
  },
  {
    label: "Focus",
    biomonk: "NEET Biology, rank-oriented",
    other: "Generic, filler-heavy",
  },
  {
    label: "Cost",
    biomonk: "From ₹6,999 — start free",
    other: "₹1,00,000+ per year",
  },
];

const BADGES = [
  { icon: Award, value: siteConfig.stats.years, label: "Years mentoring" },
  { icon: Users, value: siteConfig.stats.students, label: "Students guided" },
  { icon: Trophy, value: siteConfig.stats.toppers, label: "Top AIR toppers" },
  { icon: ShieldCheck, value: "100%", label: "NCERT-aligned" },
];

export function Comparison() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel className="justify-center">The difference</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          BioMonk vs a typical coaching factory
        </h2>
        <p className="mt-4 text-parchment/70">
          Same goal — a top NEET Biology score. A very different way of getting
          there.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-moss bg-white">
        {/* Header */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-moss bg-forest/60">
          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted sm:px-7">
            What you compare
          </div>
          <div className="px-3 py-4 text-center text-sm font-bold text-gold sm:px-5">
            BioMonk
          </div>
          <div className="px-3 py-4 text-center text-sm font-medium text-parchment/70 sm:px-5">
            Typical coaching
          </div>
        </div>

        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1.2fr_1fr_1fr] items-center ${
              i % 2 === 1 ? "bg-forest/30" : ""
            }`}
          >
            <div className="px-5 py-4 text-sm font-medium text-cream sm:px-7">
              {row.label}
            </div>
            <div className="flex items-start gap-2 px-3 py-4 text-sm text-parchment sm:px-5">
              <Check size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{row.biomonk}</span>
            </div>
            <div className="flex items-start gap-2 px-3 py-4 text-sm text-muted sm:px-5">
              <X size={16} className="mt-0.5 shrink-0 text-muted/70" />
              <span>{row.other}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {BADGES.map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center rounded-2xl border border-moss bg-forest/40 px-4 py-5 text-center"
          >
            <b.icon size={22} className="text-gold" />
            <span className="mt-2 font-display text-2xl font-semibold text-cream">
              {b.value}
            </span>
            <span className="mt-0.5 text-xs text-parchment/70">{b.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <CtaButton href="/courses" size="lg">
          Start the right way →
        </CtaButton>
      </div>
    </section>
  );
}
