import {
  FileText,
  Network,
  History,
  Shapes,
  ListChecks,
  FileCheck2,
  Download,
  BookMarked,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { siteConfig } from "@/lib/site";

// TODO: replace `href: "#"` with the real PDF URLs when the files are ready.
const RESOURCES = [
  {
    icon: FileText,
    title: "NCERT Biology Quick Notes",
    desc: "Crisp, exam-ready notes covering every line that matters in NCERT.",
    href: "#",
  },
  {
    icon: Network,
    title: "Biology Mind Maps",
    desc: "One-glance mind maps for all chapters — perfect for fast revision.",
    href: "#",
  },
  {
    icon: History,
    title: "10-Year NEET Biology PYQs",
    desc: "Previous-year questions with answer keys, sorted chapter-wise.",
    href: "#",
  },
  {
    icon: Shapes,
    title: "High-Yield Diagrams + Formula Sheet",
    desc: "The diagrams and one-liners that show up in NEET year after year.",
    href: "#",
  },
  {
    icon: ListChecks,
    title: "Chapter-wise DPP Samples",
    desc: "Daily practice problems to test yourself one chapter at a time.",
    href: "#",
  },
  {
    icon: FileCheck2,
    title: "1 Free Full Mock Test",
    desc: "A full-length Biology mock with an answer key to benchmark yourself.",
    href: "#",
  },
];

const LMS_FEATURES = [
  { label: "Structured video lessons", bold: false },
  { label: "Test series with instant analysis", bold: false },
  { label: "Error Book — every mistake, fixed", bold: true },
  { label: "Performance analytics & streaks", bold: false },
  { label: "Live doubt-solving sessions", bold: false },
];

export function Resources() {
  return (
    <section
      id="resources"
      className="relative scroll-mt-20 border-y border-moss bg-forest/50 py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Free Resources</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
            Start with our free study material
          </h2>
          <p className="mt-4 text-parchment/70">
            Hand-picked notes, mind maps and PYQs to kick-start your Biology
            prep — no sign-up, no payment. Just download and begin.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="group flex flex-col rounded-2xl border border-moss bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_50px_-30px_rgba(90,0,157,0.6)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <r.icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                {r.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm text-parchment/70">
                {r.desc}
              </p>
              <a
                href={r.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-amber"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          ))}
        </div>

        {/* Strategic free → paid upsell: the LMS as the natural next step */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/40 to-forest p-7 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-amber">
                <BookMarked size={14} />
                Inside the BioMonk LMS
              </span>
              <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl text-balance">
                Free notes get you started.
                <br className="hidden sm:block" /> The BioMonk LMS gets you{" "}
                <span className="gold-text">ranks.</span>
              </h3>
              <p className="mt-4 text-parchment/80">
                When you&apos;re ready to go all-in, everything lives in one
                focused dashboard — including the Error Book that turns every
                wrong answer into a fixed concept before NEET.
              </p>

              <ul className="mt-6 space-y-3">
                {LMS_FEATURES.map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-center gap-3 ${
                      f.bold ? "font-semibold text-amber" : "text-parchment"
                    }`}
                  >
                    <CheckCircle2
                      size={18}
                      className={`shrink-0 ${f.bold ? "text-amber" : "text-gold"}`}
                    />
                    {f.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton href="/dashboard" size="lg">
                  Explore the Dashboard <ArrowRight size={18} />
                </CtaButton>
                <CtaButton href={siteConfig.lmsUrl} variant="ghost" size="lg">
                  Open My LMS <ArrowUpRight size={18} />
                </CtaButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-[2.25rem] gold-gradient opacity-[0.14] blur-2xl"
              />
              <BrowserFrame
                url="app.biomonk.in/dashboard"
                src="/lms-dashboard.png"
                alt="BioMonk LMS dashboard featuring the Error Book"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
