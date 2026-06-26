"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Compass } from "lucide-react";

export function PredictorCtaBand() {
  const router = useRouter();
  const [score, setScore] = useState("");

  function go(e: React.FormEvent) {
    e.preventDefault();
    const s = parseInt(score, 10);
    const q = s >= 1 && s <= 720 ? `?score=${s}` : "";
    router.push(`/free-tools/neet-predictor${q}`);
  }

  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl gold-gradient">
        <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="text-ink">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Compass size={14} /> Free Tool
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-balance">
              What College Will YOUR Score Get You?
            </h2>
            <p className="mt-3 max-w-md text-ink/80">
              Enter your NEET score below and find out instantly — for free, no
              email required.
            </p>
          </div>

          <form
            onSubmit={go}
            className="rounded-2xl bg-ink/95 p-5 shadow-xl"
          >
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
              Your NEET Score (out of 720)
            </label>
            <input
              type="number"
              min={1}
              max={720}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 640"
              className="h-14 w-full rounded-xl border border-moss bg-forest px-4 text-lg text-cream placeholder:text-muted/60 ring-gold-focus"
            />
            <button
              type="submit"
              className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-xl gold-gradient text-base font-semibold text-ink"
            >
              Use Free NEET Predictor
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
