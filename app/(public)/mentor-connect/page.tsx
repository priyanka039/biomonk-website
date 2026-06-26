import type { Metadata } from "next";
import { Hospital, ClipboardList, CalendarClock, Lightbulb } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MentorConnectForm } from "@/components/mentor/MentorConnectForm";

export const metadata: Metadata = {
  title: "Mentor Connect — NEET College & Counselling Guidance",
  description:
    "Your NEET rank is just the start. Get expert guidance on college selection, state vs all-India quota, branch choice, and the admission timeline.",
  alternates: { canonical: "/mentor-connect" },
};

const HELP = [
  {
    icon: Hospital,
    title: "College Selection",
    desc: "Which AIIMS / GMC / private college fits your rank + budget?",
  },
  {
    icon: ClipboardList,
    title: "Quota Strategy",
    desc: "State vs All-India? Open vs reserved? We decode it all.",
  },
  {
    icon: CalendarClock,
    title: "Admission Timeline",
    desc: "Counselling rounds, deadlines, document checklist — step by step.",
  },
  {
    icon: Lightbulb,
    title: "Career Guidance",
    desc: "MBBS vs BDS vs BAMS? We help you choose with full information.",
  },
];

const PLANS = [
  {
    name: "Quick Query",
    price: "₹499",
    detail: "30 min WhatsApp / call session",
  },
  {
    name: "Full Counselling",
    price: "₹1,499",
    detail: "60 min + follow-up + document checklist",
    featured: true,
  },
  {
    name: "Enrolled Students",
    price: "Included",
    detail: "Priority support for BioMonk Pro members",
  },
];

export default function MentorConnectPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="max-w-2xl">
        <SectionLabel>Mentor Connect</SectionLabel>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl text-balance">
          Which College Is Right for YOU?
        </h1>
        <p className="mt-4 text-lg text-parchment/80">
          Your NEET rank is just the start. Choosing the right college, quota,
          state, and branch determines your next 5 years.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HELP.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl border border-moss bg-forest/60 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <h.icon size={22} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-cream">
              {h.title}
            </h3>
            <p className="mt-1.5 text-sm text-parchment/70">{h.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 ${
              p.featured
                ? "border-gold/50 bg-gradient-to-b from-moss/40 to-forest"
                : "border-moss bg-forest/60"
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {p.name}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-gold">
              {p.price}
            </p>
            <p className="mt-1.5 text-sm text-parchment/70">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-3xl font-semibold text-cream">
          Book your guidance session
        </h2>
        <p className="mt-2 text-parchment/70">
          Fill this in and the team confirms your slot on WhatsApp within 24
          hours.
        </p>
        <div className="mt-6">
          <MentorConnectForm />
        </div>
      </div>
    </div>
  );
}
