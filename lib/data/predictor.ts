import type { Category, College } from "./colleges";

export type ChanceLabel = "SAFE" | "GOOD" | "MODERATE" | "REACH" | "UNLIKELY";

export interface Chance {
  label: ChanceLabel;
  /** semantic bucket used for card border styling */
  tone: "safe" | "moderate" | "reach" | "dream";
}

export interface PredictedCollege extends College {
  chance: Chance;
  cutoffRank: number;
}

export function getChance(userRank: number, cutoffRank: number): Chance {
  const ratio = userRank / cutoffRank;
  if (ratio <= 0.7) return { label: "SAFE", tone: "safe" };
  if (ratio <= 0.9) return { label: "GOOD", tone: "safe" };
  if (ratio <= 1.05) return { label: "MODERATE", tone: "moderate" };
  if (ratio <= 1.3) return { label: "REACH", tone: "reach" };
  return { label: "UNLIKELY", tone: "dream" };
}

const LABEL_ORDER: Record<ChanceLabel, number> = {
  SAFE: 0,
  GOOD: 1,
  MODERATE: 2,
  REACH: 3,
  UNLIKELY: 4,
};

export function predict(
  colleges: College[],
  rank: number,
  category: Category
): PredictedCollege[] {
  return colleges
    .map((c) => {
      const cutoffRank = c.cutoff[category] ?? c.cutoff.UR;
      return { ...c, cutoffRank, chance: getChance(rank, cutoffRank) };
    })
    .sort((a, b) => {
      const diff = LABEL_ORDER[a.chance.label] - LABEL_ORDER[b.chance.label];
      if (diff !== 0) return diff;
      return a.cutoffRank - b.cutoffRank;
    });
}

/**
 * Empirical score -> AIR mapping from NTA 2024 NEET UG data
 * (~24 lakh appeared, ~11.45 lakh qualified). Indicative only.
 */
const RANK_BANDS: [hi: number, lo: number, rank: number][] = [
  [720, 715, 50],
  [714, 700, 200],
  [699, 680, 800],
  [679, 660, 2000],
  [659, 640, 4500],
  [639, 620, 8000],
  [619, 600, 13000],
  [599, 580, 20000],
  [579, 560, 30000],
  [559, 540, 45000],
  [539, 520, 65000],
  [519, 500, 90000],
  [499, 480, 125000],
  [479, 460, 170000],
  [459, 440, 225000],
  [439, 420, 290000],
  [419, 400, 365000],
  [399, 380, 450000],
  [379, 360, 540000],
  [359, 340, 630000],
  [339, 320, 720000],
  [319, 300, 810000],
  [299, 280, 900000],
  [279, 260, 990000],
  [259, 240, 1080000],
  [239, 220, 1160000],
  [219, 200, 1240000],
  [199, 1, 1500000],
];

const TOTAL_APPEARED = 2_400_000;

export function estimateRank(score: number): {
  rank: number;
  percentile: number;
} {
  let rank = 1_500_000;
  for (let i = 0; i < RANK_BANDS.length; i++) {
    const [hi, lo, r] = RANK_BANDS[i];
    if (score >= lo && score <= hi) {
      const next = RANK_BANDS[i + 1]?.[2] ?? r + 50000;
      rank = Math.round(r + ((hi - score) / (hi - lo + 1)) * (next - r));
      break;
    }
  }
  const percentile = Math.max(
    0,
    Math.min(100, ((TOTAL_APPEARED - rank) / TOTAL_APPEARED) * 100)
  );
  return { rank, percentile: Math.round(percentile * 100) / 100 };
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "UR", label: "General / UR" },
  { value: "OBC", label: "OBC" },
  { value: "EWS", label: "EWS" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "PH", label: "PwD" },
];

export const STATE_NAMES: Record<string, string> = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chhattisgarh",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  JK: "J&K",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  WB: "West Bengal",
};

export const STATE_OPTIONS = Object.entries(STATE_NAMES)
  .map(([value, label]) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const COLLEGE_TYPE_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "AIIMS", label: "AIIMS" },
  { value: "Central", label: "Central / JIPMER" },
  { value: "Government", label: "Government" },
  { value: "Deemed", label: "Deemed" },
  { value: "Private", label: "Private" },
];
