"use client";

import { useMemo, useState } from "react";
import {
  Loader2,
  Search,
  Sparkles,
  Download,
  ArrowRight,
  Info,
} from "lucide-react";
import { COLLEGES } from "@/lib/data/colleges";
import type { Category } from "@/lib/data/colleges";
import {
  predict,
  estimateRank,
  CATEGORIES,
  STATE_OPTIONS,
  STATE_NAMES,
  COLLEGE_TYPE_FILTERS,
  type PredictedCollege,
  type ChanceLabel,
} from "@/lib/data/predictor";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

const TONE: Record<
  PredictedCollege["chance"]["tone"],
  { card: string; badge: string }
> = {
  safe: {
    card: "border-emerald-500/30 hover:border-emerald-400/60",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  moderate: {
    card: "border-amber-500/30 hover:border-amber-400/60",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  reach: {
    card: "border-orange-500/30 hover:border-orange-400/60",
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  dream: {
    card: "border-red-500/30 hover:border-red-400/60",
    badge: "bg-red-500/15 text-red-300 border-red-500/30",
  },
};

const TABS = [
  { id: "all", label: "All" },
  { id: "AIIMS", label: "AIIMS" },
  { id: "Central", label: "Central" },
  { id: "Government", label: "Govt" },
  { id: "Deemed", label: "Deemed" },
  { id: "Private", label: "Private" },
  { id: "state", label: "My State" },
] as const;

export function NeetPredictor({ initialScore }: { initialScore?: number }) {
  const [score, setScore] = useState(initialScore ? String(initialScore) : "");
  const [rank, setRank] = useState(
    initialScore ? String(estimateRank(initialScore).rank) : ""
  );
  const [rankTouched, setRankTouched] = useState(false);
  const [category, setCategory] = useState<Category>("UR");
  const [state, setState] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictedCollege[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [submitted, setSubmitted] = useState<{
    score: number;
    rank: number;
    category: Category;
    state: string;
  } | null>(null);

  function onScoreChange(v: string) {
    setScore(v);
    const s = parseInt(v, 10);
    if (!rankTouched && s >= 1 && s <= 720) {
      setRank(String(estimateRank(s).rank));
    }
  }

  function runPredict(e: React.FormEvent) {
    e.preventDefault();
    const s = parseInt(score, 10);
    const r = parseInt(rank, 10);
    if (!s || !r || !state) {
      alert("Please fill in Score, Rank, and Home State to get predictions.");
      return;
    }
    if (s < 1 || s > 720) {
      alert("Score must be between 1 and 720.");
      return;
    }
    setLoading(true);
    // analytics (best-effort, anonymous)
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "predictor", score: s, category, state }),
    }).catch(() => {});

    setTimeout(() => {
      const all = predict(COLLEGES, r, category).filter((c) => {
        if (typeFilter === "all") return true;
        return c.type === typeFilter;
      });
      setResults(all);
      setSubmitted({ score: s, rank: r, category, state });
      setActiveTab("all");
      setLoading(false);
      requestAnimationFrame(() => {
        document
          .getElementById("predictor-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 700);
  }

  const buckets = useMemo(() => {
    if (!results || !submitted) return null;
    return {
      all: results,
      AIIMS: results.filter((c) => c.type === "AIIMS"),
      Central: results.filter((c) => c.type === "Central"),
      Government: results.filter((c) => c.type === "Government"),
      Deemed: results.filter((c) => c.type === "Deemed"),
      Private: results.filter((c) => c.type === "Private"),
      state: results.filter(
        (c) =>
          c.quota === "State" ||
          (c.quota.includes("State") && c.state === submitted.state)
      ),
    } as Record<string, PredictedCollege[]>;
  }, [results, submitted]);

  const safeCount =
    results?.filter((c) => ["SAFE", "GOOD"].includes(c.chance.label)).length ??
    0;
  const modCount =
    results?.filter((c) => c.chance.label === "MODERATE").length ?? 0;

  return (
    <div>
      {/* ── Input card ── */}
      <form
        onSubmit={runPredict}
        className="rounded-3xl border border-moss bg-forest/60 p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FieldShell label="NEET Score (/720)">
            <input
              type="number"
              min={1}
              max={720}
              value={score}
              onChange={(e) => onScoreChange(e.target.value)}
              placeholder="e.g. 640"
              className={inputCls}
            />
          </FieldShell>

          <FieldShell
            label="AIR (auto-estimated)"
            hint="Edit if you know your exact rank"
          >
            <input
              type="number"
              min={1}
              value={rank}
              onChange={(e) => {
                setRank(e.target.value);
                setRankTouched(true);
              }}
              placeholder="e.g. 8000"
              className={inputCls}
            />
          </FieldShell>

          <FieldShell label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </FieldShell>

          <FieldShell label="Home State">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputCls}
            >
              <option value="">Select state…</option>
              {STATE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </FieldShell>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">College type:</span>
          {COLLEGE_TYPE_FILTERS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTypeFilter(t.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                typeFilter === t.value
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-moss text-parchment/70 hover:border-sage"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl bg-ink/50 p-3 text-xs text-muted">
          <Info size={15} className="mt-0.5 shrink-0 text-gold/70" />
          <p>
            Predictions use 2023–2024 MCC/state counselling closing-rank data.
            Cutoffs vary year to year — use this as a guide, not a guarantee.
            Always verify with official counselling authorities.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl gold-gradient text-base font-semibold text-ink disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Analyzing 200+ colleges…
            </>
          ) : (
            <>
              <Search size={18} />
              Predict My Colleges →
            </>
          )}
        </button>
      </form>

      {/* ── Results ── */}
      {buckets && submitted && (
        <div id="predictor-results" className="mt-10 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-moss bg-forest/60 p-5">
            <div className="flex flex-wrap gap-5">
              <Stat label="Score" value={submitted.score} />
              <Stat label="AIR Rank" value={submitted.rank.toLocaleString("en-IN")} />
              <Stat label="Safe Picks" value={safeCount} tone="text-emerald-300" />
              <Stat label="Moderate" value={modCount} tone="text-amber-300" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill>{CATEGORIES.find((c) => c.value === submitted.category)?.label}</Pill>
              <Pill className="text-gold">{STATE_NAMES[submitted.state]}</Pill>
              <Pill className="text-muted">
                {buckets.all.length} colleges
              </Pill>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === t.id
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-moss text-parchment/70 hover:border-sage"
                )}
              >
                {t.label} ({buckets[t.id].length})
              </button>
            ))}
          </div>

          <CollegeList colleges={buckets[activeTab]} />

          {/* Soft upsell */}
          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center rounded-3xl border border-gold/40 bg-gradient-to-r from-moss/40 to-forest p-6">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Sparkles size={18} />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Next step
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-cream">
                Want a 1:1 session to strategize around these colleges?
              </h3>
              <p className="mt-1 text-sm text-parchment/80">
                Book a Mentor Connect session with Vicky Sir — quota strategy,
                college shortlisting, and a personalised plan for your rank.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/mentor-connect"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full gold-gradient px-6 font-semibold text-ink"
              >
                Book Session <ArrowRight size={16} />
              </a>
              <a
                href={whatsappLink(
                  `Hi Vicky Sir, my NEET score is ${submitted.score} (AIR ~${submitted.rank}). I'd like help shortlisting colleges.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#25D366]/50 px-6 text-sm font-medium text-[#25D366] hover:bg-[#25D366]/10"
              >
                <Download size={16} />
                Save / share on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-moss bg-ink px-4 text-cream placeholder:text-muted/60 ring-gold-focus";

function FieldShell({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted/70">{hint}</span>}
    </label>
  );
}

function Stat({
  label,
  value,
  tone = "text-cream",
}: {
  label: string;
  value: React.ReactNode;
  tone?: string;
}) {
  return (
    <div>
      <div className={cn("font-display text-2xl font-semibold", tone)}>
        {value}
      </div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-moss bg-ink/50 px-3 py-1 text-xs font-medium text-parchment",
        className
      )}
    >
      {children}
    </span>
  );
}

const CHANCE_LABEL: Record<ChanceLabel, string> = {
  SAFE: "Safe",
  GOOD: "Good",
  MODERATE: "Moderate",
  REACH: "Reach",
  UNLIKELY: "Unlikely",
};

function CollegeList({ colleges }: { colleges: PredictedCollege[] }) {
  if (!colleges.length) {
    return (
      <div className="mt-6 rounded-2xl border border-moss bg-forest/40 p-10 text-center text-parchment/70">
        <div className="text-3xl">🔍</div>
        <p className="mt-2">
          No colleges found for this filter. Try a different college type.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-3">
      {colleges.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className={cn(
            "flex flex-col gap-3 rounded-2xl border bg-forest/60 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
            TONE[c.chance.tone].card
          )}
        >
          <div>
            <p className="font-medium text-cream">{c.name}</p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
              <Tag>{STATE_NAMES[c.state] ?? c.state}</Tag>
              <Tag>{c.type}</Tag>
              <Tag>~{c.seats} seats</Tag>
              <Tag>{c.fees}</Tag>
              <Tag>{c.quota} Quota</Tag>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                TONE[c.chance.tone].badge
              )}
            >
              {CHANCE_LABEL[c.chance.label]}
            </span>
            <span className="font-mono text-xs text-muted">
              Closing rank:{" "}
              <span className="text-parchment">
                {c.cutoffRank.toLocaleString("en-IN")}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-moss bg-ink/50 px-2 py-0.5 text-muted">
      {children}
    </span>
  );
}
