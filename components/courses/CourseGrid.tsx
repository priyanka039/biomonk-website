"use client";

import { useState } from "react";
import { CourseCard } from "@/components/shared/CourseCard";
import { COURSES, COURSE_FILTERS } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

export function CourseGrid() {
  const [filter, setFilter] = useState("all");
  const shown =
    filter === "all"
      ? COURSES
      : COURSES.filter((c) => c.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {COURSE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f.value
                ? "border-gold bg-gold/15 text-gold"
                : "border-moss text-parchment/70 hover:border-sage"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-parchment/60">
          No courses in this category yet — message us on WhatsApp and
          we&apos;ll let you know when one launches.
        </p>
      )}
    </>
  );
}
