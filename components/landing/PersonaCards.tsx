import Link from "next/link";
import { Sprout, RotateCcw, Timer, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const PERSONAS = [
  {
    icon: Sprout,
    tag: "Class 11 & 12",
    title: "You're building your foundation",
    desc: "Lock in NCERT-first Biology while school is still on. Start now and you're chapters ahead before the boards rush begins.",
    outcome: "Finish the syllabus before panic season.",
    href: "/courses/neet-biology-class-12",
    cta: "See the Foundation plan",
    featured: false,
  },
  {
    icon: RotateCcw,
    tag: "Dropper / Repeater",
    title: "You're going all-in this year",
    desc: "You already know what went wrong last time — scattered notes, weak revision. One clean, rank-oriented Biology source built for repeaters.",
    outcome: "Turn last year's gaps into this year's marks.",
    href: "/courses/neet-biology-dropper-2026",
    cta: "See the Dropper batch",
    featured: true,
  },
  {
    icon: Timer,
    tag: "Final stretch",
    title: "You need a high-yield sprint",
    desc: "Months left, not years. A 60-day, high-yield revision sprint that targets exactly what NEET asks — no filler, just marks.",
    outcome: "Maximise every remaining day.",
    href: "/courses/neet-biology-crash-course",
    cta: "See the Crash Course",
    featured: false,
  },
];

export function PersonaCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel className="justify-center">Find your path</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          Which student are you?
        </h2>
        <p className="mt-4 text-parchment/70">
          Three starting points, one mentor. Pick where you are right now —
          we&apos;ll meet you there.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PERSONAS.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className={`group relative flex flex-col rounded-3xl border p-7 transition-all duration-200 hover:-translate-y-1 ${
              p.featured
                ? "border-gold/50 bg-gradient-to-b from-moss/40 to-forest shadow-[0_24px_60px_-30px_rgba(90,0,157,0.5)]"
                : "border-moss bg-white hover:border-gold/40 hover:shadow-[0_20px_50px_-30px_rgba(90,0,157,0.5)]"
            }`}
          >
            {p.featured && (
              <span className="absolute right-0 top-0 rounded-bl-2xl gold-gradient px-4 py-1.5 text-xs font-bold text-ink">
                Most chosen
              </span>
            )}
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
              <p.icon size={24} />
            </span>
            <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-sage">
              {p.tag}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold text-cream">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-parchment/75">
              {p.desc}
            </p>
            <p className="mt-4 text-sm font-semibold text-amber">{p.outcome}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-amber">
              {p.cta}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
