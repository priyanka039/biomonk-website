"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const TARGET = new Date(`${siteConfig.neetDate}T00:00:00`).getTime();

function daysLeft(): number {
  return Math.max(0, Math.ceil((TARGET - Date.now()) / 86_400_000));
}

export function StickyCta() {
  const [show, setShow] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysLeft());
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[850] border-t border-moss bg-[rgba(249,247,253,0.92)] px-4 py-3 backdrop-blur-lg transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <div className="font-display text-lg font-semibold tabular-nums text-cream">
            {days === null ? "—" : days} days
          </div>
          <div className="text-[11px] text-parchment/70">left for NEET</div>
        </div>
        <Link
          href="/courses"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl gold-gradient px-5 text-sm font-bold text-white shadow-[0_10px_30px_-12px_rgba(90,0,157,0.7)]"
        >
          Explore Courses
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
