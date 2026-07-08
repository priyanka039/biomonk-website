"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { AnnouncementRow } from "@/lib/cms";

export function AnnouncementBanner({
  announcements,
}: {
  announcements: AnnouncementRow[];
}) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("biomonk-dismissed-announcements");
      if (raw) setDismissed(new Set(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
  }, []);

  if (!mounted || !announcements.length) return null;

  const visible = announcements.find(
    (a) => !a.dismissible || !dismissed.has(a.id)
  );
  if (!visible) return null;

  function dismiss(id: string) {
    const next = new Set(dismissed);
    next.add(id);
    setDismissed(next);
    try {
      localStorage.setItem(
        "biomonk-dismissed-announcements",
        JSON.stringify([...next])
      );
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="fixed inset-x-0 top-16 z-[750] border-b border-gold/30 bg-forest/95 px-4 py-2.5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="text-sm text-cream">
          <span className="font-semibold text-gold">{visible.title}</span>
          {" — "}
          {visible.body}
        </p>
        {visible.dismissible && (
          <button
            type="button"
            onClick={() => dismiss(visible.id)}
            className="shrink-0 rounded-full p-1 text-parchment/70 hover:text-cream"
            aria-label="Dismiss announcement"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
