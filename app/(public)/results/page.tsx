import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { HallOfFame } from "@/components/landing/HallOfFame";
import { CtaButton } from "@/components/shared/CtaButton";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Results & Hall of Fame — BioMonk NEET Toppers",
  description:
    "Meet the BioMonk students who turned Biology into their strongest subject — AIIMS selections, AIR top-100 ranks, and government medical college admissions.",
  alternates: { canonical: "/results" },
};

const STATS = [
  { value: "847", label: "Students Mentored" },
  { value: "23", label: "AIR Top-100" },
  { value: "6", label: "AIIMS Selections" },
  { value: siteConfig.stats.years, label: "Years of Mentorship" },
];

export default function ResultsPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
        <div className="text-center">
          <SectionLabel className="justify-center">Hall of Fame</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl text-balance">
            These students were sitting where you are
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-parchment/80">
            One year ago, they were anxious aspirants too. Then they got
            structure, a mentor, and a plan. Here&apos;s where they are now.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-moss bg-forest/60 p-6 text-center"
            >
              <div className="font-display text-4xl font-semibold gold-text sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-parchment/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <HallOfFame heading="Our toppers, by the year" />

      {/* Video testimonials */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <SectionLabel>Video Stories</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold text-cream sm:text-4xl">
          Hear it from them
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a
              key={i}
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-video items-center justify-center rounded-2xl border border-moss bg-gradient-to-br from-moss/50 via-forest to-ink"
            >
              <PlayCircle
                size={48}
                className="text-gold transition-transform group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/40 to-forest px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl text-balance">
            Your result could be here next year.
          </h2>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaButton href="/courses" size="lg">
              Join BioMonk →
            </CtaButton>
            <CtaButton href="/free-tools/neet-predictor" variant="ghost" size="lg">
              Try Free Predictor
            </CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
