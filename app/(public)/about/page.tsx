import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Vicky Vaswani — 16 Years of NEET Biology Mentorship",
  description:
    "From FIITJEE to Aakash, Allen and PhysicsWallah — and finally BioMonk. The story of why Vicky Vaswani left the big institutes to mentor NEET students directly.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  {
    period: "2001–2003",
    title: "Masters in Zoology",
    desc: "Dr Ram Manohar Lohia Awadh University.",
  },
  {
    period: "2006",
    title: "Joined FIITJEE",
    desc: "Centre Head & Faculty — the start of a teaching career.",
  },
  {
    period: "2011",
    title: "Moved to Aakash",
    desc: "Helped establish Aakash Bengaluru.",
  },
  {
    period: "2015",
    title: "Joined Allen Career Institute",
    desc: "Helped build Allen Bengaluru from the ground up.",
  },
  {
    period: "2021",
    title: "Joined PhysicsWallah",
    desc: "Taught NEET Biology online to lakhs of students.",
  },
  {
    period: "2022",
    title: "Founded BioMonk",
    desc: "Left the big institutes to mentor students directly.",
  },
];

const SOCIAL = [
  { value: "250K+", label: "YouTube Subscribers" },
  { value: "120K+", label: "Instagram Followers" },
  { value: "10,000+", label: "WhatsApp Community" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl text-balance">
            16 Years. One Mission.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-parchment/80">
            Vicky Vaswani has spent his career inside India&apos;s biggest
            coaching institutes — building centres, teaching thousands, and
            watching how the system really works. BioMonk is what he built when
            he decided to do it his way.
          </p>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-moss bg-gradient-to-b from-moss/60 via-forest to-ink">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[8rem] font-semibold leading-none text-sage/20">
              VV
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <SectionLabel>The Journey</SectionLabel>
        <ol className="relative mt-8 border-l border-moss pl-8">
          {TIMELINE.map((t) => (
            <li key={t.period} className="relative pb-9 last:pb-0">
              <span className="absolute -left-[2.6rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-amber">
                {t.period}
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-cream">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-parchment/70">{t.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Philosophy */}
      <div className="mt-16 rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/40 to-forest p-8 sm:p-12">
        <SectionLabel>Philosophy</SectionLabel>
        <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-cream sm:text-3xl text-balance">
          &ldquo;I&apos;ve watched lakhs of students lose their NEET dream — not
          because they weren&apos;t smart, but because they had bad guidance or
          bloated courses. BioMonk is my answer to that.&rdquo;
        </blockquote>
        <p className="mt-5 font-mono text-sm text-amber">— Vicky Vaswani</p>
      </div>

      {/* Social proof */}
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {SOCIAL.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-moss bg-forest/60 p-6 text-center"
          >
            <div className="font-display text-4xl font-semibold gold-text">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-parchment/70">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl text-balance">
          This is why I built BioMonk. Want to be part of it?
        </h2>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton
            href={whatsappLink(
              "Hi Vicky Sir! I read your story and want to join BioMonk."
            )}
            variant="whatsapp"
            size="lg"
          >
            Join Free
          </CtaButton>
          <CtaButton href="/courses" variant="ghost" size="lg">
            Explore Courses
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
