import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";

const TIMELINE = [
  { year: "2006", label: "FIITJEE" },
  { year: "2011", label: "Aakash" },
  { year: "2015", label: "Allen" },
  { year: "2021", label: "PW" },
  { year: "2022", label: "BioMonk" },
];

export function VickyStory() {
  return (
    <section className="border-y border-moss/60 bg-forest/30">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-moss bg-gradient-to-b from-moss/60 via-forest to-ink">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[9rem] font-semibold leading-none text-sage/20">
              VV
            </span>
          </div>
        </div>

        <div>
          <SectionLabel>The Mentor</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            16 Years. One Mission.
          </h2>

          <div className="mt-5 space-y-4 text-parchment/80">
            <p>
              Vicky Vaswani started teaching at FIITJEE in 2006. Over the next
              decade and a half, he helped build Aakash and Allen Bengaluru from
              the ground up, and taught online at PhysicsWallah.
            </p>
            <p>
              In 2022 he left the big institutes for a simple reason: to mentor
              students directly, without the bloat. BioMonk is the result —
              structured, affordable, deeply personal NEET Biology guidance.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-4">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="mt-1.5 font-mono text-xs text-amber">
                    {t.year}
                  </span>
                  <span className="text-xs text-parchment/70">{t.label}</span>
                </div>
                {i < TIMELINE.length - 1 && (
                  <span className="mb-7 h-px w-8 bg-moss" />
                )}
              </div>
            ))}
          </div>

          <CtaButton href="/about" variant="ghost" className="mt-8">
            Read Full Story →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
