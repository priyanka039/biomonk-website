import type { Metadata } from "next";
import {
  LayoutDashboard,
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  FileText,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student Dashboard — Your BioMonk Learning Hub",
  description:
    "Track your progress, watch lessons, take chapter-wise tests, and review performance analytics — all inside the BioMonk student dashboard.",
  alternates: { canonical: "/dashboard" },
};

const FEATURES = [
  {
    icon: PlayCircle,
    title: "Video Lessons",
    desc: "Structured, NCERT-first recorded lessons you can revisit anytime, with notes below every video.",
  },
  {
    icon: ClipboardCheck,
    title: "Test Series",
    desc: "Chapter-wise and full-length mock tests with instant analysis and a motivating leaderboard.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "See lessons completed, tests taken, average score, and your study streak at a glance.",
  },
  {
    icon: FileText,
    title: "Notes & Mind Maps",
    desc: "Downloadable PDF notes and mind maps for every chapter — revision made effortless.",
  },
  {
    icon: Flame,
    title: "Study Streaks",
    desc: "Daily streaks and recommended next lessons keep your preparation on track.",
  },
  {
    icon: LayoutDashboard,
    title: "One Clean Hub",
    desc: "Courses, tests, predictor results, and your profile — all in a single distraction-free dashboard.",
  },
];

export default function DashboardShowcasePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionLabel>Student Dashboard</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
            Your entire NEET prep, in one place
          </h1>
          <p className="mt-4 text-lg text-parchment/80">
            Enrolled students get a clean, focused learning hub — lessons,
            tests, notes, and analytics. Already a member? Jump straight in.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={siteConfig.lmsUrl} size="lg">
              Open My Dashboard <ArrowUpRight size={18} />
            </CtaButton>
            <CtaButton href="/courses" variant="ghost" size="lg">
              Not enrolled yet? See Courses
            </CtaButton>
          </div>
        </div>

        {/* Mock dashboard preview */}
        <DashboardPreview />
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
          What&apos;s inside
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-moss bg-forest/60 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <f.icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-parchment/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/40 to-forest px-6 py-12 text-center sm:px-12">
        <h2 className="font-display text-3xl font-semibold text-cream text-balance">
          Ready to log in?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-parchment/80">
          The learning dashboard opens in a dedicated, secure portal. Enrolled
          students can sign in there with their registered details.
        </p>
        <CtaButton href={siteConfig.lmsUrl} size="lg" className="mt-7">
          Go to Dashboard <ArrowUpRight size={18} />
        </CtaButton>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-moss bg-forest p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="rounded-2xl bg-ink p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Welcome back,</p>
            <p className="font-display text-lg font-semibold text-cream">
              Priya 👋
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sage to-moss text-sm font-semibold text-cream">
            P
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-moss bg-forest/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-parchment">Dropper Batch 2026</span>
            <span className="text-gold">68%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink">
            <div className="h-full w-[68%] gold-gradient" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { v: "218", l: "Lessons" },
            { v: "34", l: "Tests" },
            { v: "12🔥", l: "Streak" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl border border-moss bg-forest/60 p-3 text-center"
            >
              <div className="font-display text-xl font-semibold text-cream">
                {s.v}
              </div>
              <div className="text-[10px] text-muted">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 p-3">
          <PlayCircle size={28} className="text-gold" />
          <div className="text-xs">
            <p className="text-muted">Up next</p>
            <p className="font-medium text-cream">
              Molecular Basis of Inheritance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
