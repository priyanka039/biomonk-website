"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TopperCard } from "@/components/shared/TopperCard";
import type { TopperResult } from "@/lib/data/results";
import { TOPPERS } from "@/lib/data/results";
import { cn } from "@/lib/utils";

export function HallOfFame({
  limit,
  showViewAll = false,
  heading = "Your seniors did it here",
  toppers = TOPPERS,
}: {
  limit?: number;
  showViewAll?: boolean;
  heading?: string;
  toppers?: TopperResult[];
}) {
  const [year, setYear] = useState("All Years");

  const years = [
    "All Years",
    ...Array.from(new Set(toppers.map((t) => String(t.year)))).sort(
      (a, b) => Number(b) - Number(a)
    ),
  ];

  const filtered = toppers.filter(
    (t) => year === "All Years" || String(t.year) === year
  );
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <SectionLabel className="justify-center">Hall of Fame</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          {heading}
        </h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              year === y
                ? "border-gold bg-gold/15 text-gold"
                : "border-moss text-parchment/70 hover:border-sage"
            )}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <TopperCard key={`${t.name}-${t.air}`} topper={t} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 text-center">
          <Link
            href="/results"
            className="text-sm font-medium text-gold hover:underline"
          >
            View All Results →
          </Link>
        </div>
      )}
    </section>
  );
}
