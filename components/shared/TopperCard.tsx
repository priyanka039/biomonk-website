import { Quote } from "lucide-react";
import type { TopperResult } from "@/lib/data/results";

export function TopperCard({ topper }: { topper: TopperResult }) {
  const initials = topper.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col rounded-2xl border border-moss bg-forest p-5 transition-colors hover:border-gold/50">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full gold-gradient font-semibold text-white shadow-[0_6px_18px_-6px_rgba(90,0,157,0.7)]">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-cream">{topper.name}</p>
          <p className="text-xs text-muted">NEET {topper.year}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-display text-2xl font-semibold text-gold">
            AIR {topper.air}
          </p>
          <p className="font-mono text-xs text-amber">{topper.score}/720</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-ink/50 px-3 py-2 text-sm text-parchment">
        <span className="text-muted">Admitted to </span>
        {topper.college}
      </div>

      <div className="mt-4 flex gap-2 text-sm italic text-parchment/80">
        <Quote size={16} className="mt-0.5 shrink-0 text-gold/60" />
        <p>{topper.quote}</p>
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">
        Mentored by Vicky Sir since {topper.since}
      </p>
    </div>
  );
}
