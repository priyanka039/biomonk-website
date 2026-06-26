"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { FAQS } from "@/lib/data/faq";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <SectionLabel className="justify-center">FAQ</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
          Questions, answered
        </h2>
      </div>

      <div className="mt-10 divide-y divide-moss/60 rounded-2xl border border-moss bg-forest/40">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left ring-gold-focus"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-cream">{item.q}</span>
                <span className="shrink-0 text-gold">
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div
                className={`grid overflow-hidden px-5 transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] pb-5 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden text-sm leading-relaxed text-parchment/80">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
