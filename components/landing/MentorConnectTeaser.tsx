import { GraduationCap, FileText, CalendarClock, Lightbulb } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";

const SERVICES = [
  { icon: GraduationCap, text: "College selection guidance" },
  { icon: FileText, text: "State vs All-India quota strategy" },
  { icon: Lightbulb, text: "Branch / stream advice (MBBS, BDS, BAMS, BHMS)" },
  { icon: CalendarClock, text: "Admission process walkthrough" },
];

export function MentorConnectTeaser({ seatsLeft }: { seatsLeft?: number }) {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-sage/40 bg-moss/50 p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Mentor Connect</SectionLabel>
            {seatsLeft != null && seatsLeft > 0 && (
              <p className="mt-3 text-sm font-medium text-amber">
                {seatsLeft} guidance slots open this month
              </p>
            )}
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
              Don&apos;t Know Which College to Choose?
            </h2>
            <p className="mt-4 text-parchment/80">
              Students with 500+ scores still don&apos;t know state quota vs
              all-India quota. Our counselling session helps you pick the right
              college for your rank.
            </p>
            <CtaButton href="/mentor-connect" className="mt-7">
              Book a Guidance Session →
            </CtaButton>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:content-center">
            {SERVICES.map((s) => (
              <li
                key={s.text}
                className="flex items-start gap-3 rounded-2xl border border-moss bg-forest/60 p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <s.icon size={20} />
                </span>
                <span className="text-sm text-parchment">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
