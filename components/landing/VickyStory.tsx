import Image from "next/image";
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
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="absolute bottom-3 left-1/2 h-[84%] w-[84%] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber to-gold"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full gold-gradient opacity-20 blur-3xl"
            />
            <Image
              src="/vicky.png"
              alt="Vicky Vaswani — Founder & Lead Mentor at BioMonk"
              width={614}
              height={849}
              unoptimized
              className="relative z-10 w-[82%] max-w-[18rem] [mask-image:linear-gradient(to_bottom,black_85%,transparent)] drop-shadow-[0_22px_45px_rgba(90,0,157,0.4)]"
            />
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
