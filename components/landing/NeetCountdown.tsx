"use client";

import { useEffect, useState } from "react";
import { CalendarClock, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

// How much faster the same syllabus must be covered vs starting today.
function paceMultiplier(daysNow: number, waitDays: number): string {
  const later = daysNow - waitDays;
  if (later <= 0) return "—";
  return `${(daysNow / later).toFixed(1)}×`;
}

export function NeetCountdown({ neetDate }: { neetDate?: string }) {
  const date = neetDate ?? siteConfig.neetDate;
  const targetMs = new Date(`${date}T00:00:00`).getTime();

  // Render numbers only after mount so SSR/client can't disagree on the date.
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(getTimeLeft(targetMs));
    const id = setInterval(() => setT(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const daysNow = t?.days ?? 0;
  const pace = [
    { when: "Start today", wait: 0, tone: "good" as const },
    { when: "Wait 2 months", wait: 60, tone: "warn" as const },
    { when: "Wait 4 months", wait: 120, tone: "bad" as const },
  ];

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: t?.days ?? null },
    { label: "Hours", value: t?.hours ?? null },
    { label: "Minutes", value: t?.minutes ?? null },
    { label: "Seconds", value: t?.seconds ?? null },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="deep-gradient relative overflow-hidden rounded-3xl border border-grape/40 p-7 shadow-[0_40px_100px_-50px_rgba(36,0,70,0.9)] sm:p-12">
        {/* soft brand glow inside the dark band */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-grape/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-lilac">
            <span className="h-px w-6 bg-lilac/60" />
            <CalendarClock size={14} /> The clock is real
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
            Your NEET rank is built now — not in January
          </h2>
          <p className="mt-4 text-petal/80">
            The syllabus doesn&apos;t shrink while you wait. Every day you delay,
            the same Biology has to be covered faster.
          </p>
        </div>

        {/* Live countdown */}
        <div className="relative mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-3 sm:gap-4">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-5 text-center backdrop-blur-sm"
            >
              <div className="font-display text-3xl font-semibold tabular-nums text-white sm:text-5xl">
                {u.value === null ? "––" : String(u.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-petal/70 sm:text-xs">
                {u.label}
              </div>
            </div>
          ))}
        </div>
        <p className="relative mt-3 text-center text-xs text-white/50">
          Until NEET{" "}
          {new Date(targetMs).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Cost of waiting */}
        <div className="relative mt-12">
          <div className="mb-5 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white">
            <TrendingUp size={16} className="shrink-0 text-lilac" />
            The cost of waiting — the daily pace you&apos;ll need
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {pace.map((p) => (
              <div
                key={p.when}
                className={`rounded-2xl border p-6 text-center backdrop-blur-sm ${
                  p.tone === "good"
                    ? "border-lilac/50 bg-white/[0.08] shadow-[0_20px_50px_-30px_rgba(199,125,255,0.6)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="text-sm font-medium text-petal/70">
                  {p.when}
                </div>
                <div
                  className={`mt-2 font-display text-4xl font-semibold tabular-nums ${
                    p.tone === "good"
                      ? "text-lilac"
                      : p.tone === "warn"
                        ? "text-petal"
                        : "text-white"
                  }`}
                >
                  {t === null ? "—" : paceMultiplier(daysNow, p.wait)}
                </div>
                <div className="mt-1 text-xs text-petal/50">
                  {p.wait === 0 ? "today's pace" : "harder, every day"}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-petal/70">
            Same syllabus. The only thing that changes is how hard it gets.
          </p>
        </div>

        <div className="relative mt-10 text-center">
          <a
            href="/courses"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-grape shadow-[0_18px_50px_-15px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03]"
          >
            Start today — get ahead →
          </a>
        </div>
      </div>
    </section>
  );
}
