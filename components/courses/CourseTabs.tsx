"use client";

import { useState } from "react";
import { ChevronDown, Lock, PlayCircle, Star } from "lucide-react";
import type { Course } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

const TABS = ["Curriculum", "Faculty", "Reviews"] as const;
type Tab = (typeof TABS)[number];

const REVIEWS = [
  {
    name: "Aishwarya T.",
    rating: 5,
    text: "The NCERT-first approach completely changed how I read Biology. Scored 340+ in my attempt.",
  },
  {
    name: "Dev P.",
    rating: 5,
    text: "Vicky Sir actually replies to doubts. The live sessions are gold for droppers.",
  },
  {
    name: "Ritika S.",
    rating: 4,
    text: "Mind maps and notes are excellent. Wish there were even more practice MCQs.",
  },
];

export function CourseTabs({ course }: { course: Course }) {
  const [tab, setTab] = useState<Tab>("Curriculum");

  return (
    <div>
      <div className="flex gap-1 border-b border-moss">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors",
              tab === t ? "text-gold" : "text-parchment/60 hover:text-cream"
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Curriculum" && <Curriculum course={course} />}
        {tab === "Faculty" && <Faculty />}
        {tab === "Reviews" && <Reviews rating={course.rating} />}
      </div>
    </div>
  );
}

function Curriculum({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {course.curriculum.map((chapter, i) => {
        const isOpen = open === i;
        const total = chapter.lessons.length;
        return (
          <div
            key={chapter.title}
            className="overflow-hidden rounded-2xl border border-moss bg-forest/50"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-medium text-cream">{chapter.title}</span>
              <span className="flex items-center gap-3 text-xs text-muted">
                {total} lessons
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-gold transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </span>
            </button>
            {isOpen && (
              <ul className="divide-y divide-moss/50 border-t border-moss/50">
                {chapter.lessons.map((l) => (
                  <li
                    key={l.title}
                    className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
                  >
                    <span className="flex items-center gap-2.5 text-parchment/80">
                      {l.free ? (
                        <PlayCircle size={16} className="text-gold" />
                      ) : (
                        <Lock size={15} className="text-muted" />
                      )}
                      {l.title}
                      {l.free && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-gold">
                          Free preview
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {l.duration}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Faculty() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-moss bg-forest/50 p-6 sm:flex-row sm:items-center">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl gold-gradient font-display text-3xl font-semibold text-white shadow-[0_10px_30px_-10px_rgba(90,0,157,0.7)]">
        VV
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold text-cream">
          Vicky Vaswani
        </h3>
        <p className="text-sm text-amber">Founder &amp; Lead Mentor · BioMonk</p>
        <p className="mt-3 text-sm leading-relaxed text-parchment/80">
          16+ years mentoring NEET Biology aspirants. Ex-FIITJEE, Ex-Aakash,
          Ex-Allen, Ex-PhysicsWallah. Masters in Zoology. Known for an
          NCERT-first, rank-oriented teaching style that has produced multiple
          AIR toppers.
        </p>
      </div>
    </div>
  );
}

function Reviews({ rating }: { rating: number }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-display text-4xl font-semibold text-gold">
          {rating}
        </span>
        <div>
          <div className="flex text-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(rating) ? "fill-amber" : "opacity-30"}
              />
            ))}
          </div>
          <p className="text-xs text-muted">Based on verified student reviews</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-moss bg-forest/50 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-cream">{r.name}</span>
              <div className="flex text-amber">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-parchment/80">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
