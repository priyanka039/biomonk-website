import type { Metadata } from "next";
import {
  LayoutDashboard,
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  FileText,
  Flame,
  BookMarked,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
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
    icon: BookMarked,
    title: "Error Book",
    desc: "Every wrong answer is auto-saved to your Error Book — review and fix your mistakes before NEET.",
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

        {/* Real LMS preview */}
        <LmsShowcase />
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

function LmsShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[2.25rem] gold-gradient opacity-[0.12] blur-2xl"
      />
      <BrowserFrame
        url="app.biomonk.in/dashboard"
        src="/lms-dashboard.png"
        alt="BioMonk student dashboard — Error Book, progress and analytics"
        priority
      />
      <div className="absolute -bottom-10 -left-3 hidden w-48 -rotate-[5deg] sm:block lg:-left-10 lg:w-60">
        <BrowserFrame
          url="app.biomonk.in/schedule"
          src="/lms-schedule.png"
          alt="BioMonk Champion's Batch — today's live schedule"
          compact
        />
      </div>
    </div>
  );
}
