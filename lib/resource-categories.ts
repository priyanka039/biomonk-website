import type { LucideIcon } from "lucide-react";
import {
  FileText,
  ListChecks,
  History,
  FileCheck2,
} from "lucide-react";

export type ResourceCategory = "notes" | "dpp" | "pyqs" | "mock-tests";

export interface CategoryMeta {
  label: string;
  shortTag: string;
  icon: LucideIcon;
  badgeClass: string;
  iconClass: string;
}

/** Badge + icon styles for white cards (site uses dark text tokens on light surfaces). */
export const RESOURCE_CATEGORIES: Record<ResourceCategory, CategoryMeta> = {
  notes: {
    label: "Quick Notes",
    shortTag: "Notes",
    icon: FileText,
    badgeClass: "bg-violet-100 text-violet-800 border-violet-200",
    iconClass: "bg-violet-100 text-violet-700",
  },
  dpp: {
    label: "DPP",
    shortTag: "DPP",
    icon: ListChecks,
    badgeClass: "bg-amber-100 text-amber-900 border-amber-200",
    iconClass: "bg-amber-100 text-amber-800",
  },
  pyqs: {
    label: "PYQ Set",
    shortTag: "PYQs",
    icon: History,
    badgeClass: "bg-sky-100 text-sky-900 border-sky-200",
    iconClass: "bg-sky-100 text-sky-800",
  },
  "mock-tests": {
    label: "Mock Test",
    shortTag: "Mock",
    icon: FileCheck2,
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-200",
    iconClass: "bg-emerald-100 text-emerald-800",
  },
};

export function categoryMeta(category: string): CategoryMeta {
  return (
    RESOURCE_CATEGORIES[category as ResourceCategory] ?? RESOURCE_CATEGORIES.notes
  );
}

export function descriptionLines(description: string | null, max = 4): string[] {
  if (!description?.trim()) return [];
  return description
    .split(/\n|·/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}
