import { Check, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";

const FREE = [
  "NEET College Predictor",
  "1 Free Mock Test",
  "WhatsApp Community",
  "YouTube Lectures",
  "Daily MCQ on WhatsApp",
];

const PAID = [
  "Everything in Free",
  "Full Video Course Library",
  "Chapter-wise Test Series",
  "Live Doubt Sessions",
  "PDF Notes + Mind Maps",
  "Mentor Connect (Priority)",
  "Performance Analytics",
  "Revision Crash Programs",
];

export function FreeVsPaid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel className="justify-center">Free vs Pro</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          Start Free. Upgrade When Ready.
        </h2>
        <p className="mt-4 text-parchment/70">
          Taste the product before you pay a rupee. No pressure, no gimmicks.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Free */}
        <div className="flex flex-col rounded-3xl border border-moss bg-forest/60 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-cream">
              Free
            </h3>
            <span className="rounded-full border border-sage/40 px-3 py-1 text-xs font-medium text-sage">
              Always free
            </span>
          </div>
          <ul className="mt-6 flex-1 space-y-3.5">
            {FREE.map((item) => (
              <li key={item} className="flex items-center gap-3 text-parchment">
                <Check size={18} className="shrink-0 text-sage" />
                {item}
              </li>
            ))}
          </ul>
          <CtaButton
            href="/free-tools/neet-predictor"
            variant="ghost"
            className="mt-7 w-full"
          >
            Try Free Tools →
          </CtaButton>
        </div>

        {/* Paid */}
        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-gold/50 bg-gradient-to-b from-moss/40 to-forest p-7 shadow-[0_24px_60px_-30px_rgba(200,150,62,0.5)]">
          <div className="absolute right-0 top-0 rounded-bl-2xl gold-gradient px-4 py-1.5 text-xs font-bold text-ink">
            Most Popular
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-gold" />
            <h3 className="font-display text-2xl font-semibold text-cream">
              BioMonk Pro
            </h3>
          </div>
          <ul className="mt-6 flex-1 space-y-3.5">
            {PAID.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-3 ${i === 0 ? "font-semibold text-amber" : "text-parchment"}`}
              >
                <Check size={18} className="shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
          <CtaButton href="/courses" className="mt-7 w-full">
            See Course Plans →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
