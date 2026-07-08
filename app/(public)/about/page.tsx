import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { whatsappLink } from "@/lib/site";
import { getSection } from "@/lib/cms";
import { SECTION_KEYS } from "@/lib/cms/keys";

export const metadata: Metadata = {
  title: "About Vicky Vaswani — 16 Years of NEET Biology Mentorship",
  description:
    "From Aakash and Allen to PhysicsWallah — and finally BioMonk. The story of why Vicky Vaswani left the big institutes to mentor NEET students directly.",
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
    title: "Started teaching career",
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

export default async function AboutPage() {
  const section = await getSection<{ items?: typeof TIMELINE }>(
    SECTION_KEYS.ABOUT_TIMELINE
  );
  const timeline = section?.items?.length ? section.items : TIMELINE;

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
        <div className="relative mx-auto w-full max-w-xs">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="absolute bottom-3 left-1/2 h-[84%] w-[84%] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber to-gold"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full gold-gradient opacity-20 blur-3xl"
            />
            <Image
              src="/vicky.png"
              alt="Vicky Vaswani — Founder & Lead Mentor at BioMonk"
              width={614}
              height={849}
              unoptimized
              className="relative z-10 w-[84%] max-w-[16rem] [mask-image:linear-gradient(to_bottom,black_85%,transparent)] drop-shadow-[0_22px_45px_rgba(90,0,157,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <SectionLabel>The Journey</SectionLabel>
        <ol className="relative mt-8 border-l border-moss pl-8">
          {timeline.map((t) => (
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
