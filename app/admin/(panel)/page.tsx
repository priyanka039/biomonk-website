"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  leads: number;
  mentorQueries: number;
  predictorSearches: number;
  resources: number;
  publishedCourses: number;
  activeAnnouncements: number;
  recentLeads: { id: string; type: string; name?: string; phone?: string; created_at: string }[];
  recentUploads: { id: string; title: string; category: string; created_at: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((j) => j.ok && setStats(j.data));
  }, []);

  const cards = stats
    ? [
        { label: "Leads", value: stats.leads },
        { label: "Mentor queries", value: stats.mentorQueries },
        { label: "Predictor searches", value: stats.predictorSearches },
        { label: "Resources", value: stats.resources },
        { label: "Published courses", value: stats.publishedCourses },
        { label: "Active announcements", value: stats.activeAnnouncements },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Dashboard</h1>
      <p className="mt-1 text-sm text-parchment/70">Stats refresh every 60 seconds</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.length
          ? cards.map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-moss bg-ink/50 p-5"
              >
                <div className="text-3xl font-semibold gold-text">{c.value}</div>
                <div className="mt-1 text-sm text-parchment/70">{c.label}</div>
              </div>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border border-moss bg-moss/20"
              />
            ))}
      </div>

      {stats && (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-cream">Recent leads</h2>
            <ul className="mt-4 space-y-2">
              {stats.recentLeads.map((l) => (
                <li
                  key={l.id}
                  className="rounded-lg border border-moss bg-ink/40 px-4 py-3 text-sm"
                >
                  <span className="text-gold">{l.type}</span>
                  {l.name && ` · ${l.name}`}
                  {l.phone && ` · ${l.phone}`}
                  <span className="block text-xs text-muted">
                    {new Date(l.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
              {!stats.recentLeads.length && (
                <li className="text-sm text-muted">No leads yet</li>
              )}
            </ul>
            <Link href="/admin/leads" className="mt-3 inline-block text-sm text-gold hover:underline">
              View all leads →
            </Link>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-cream">Recent uploads</h2>
            <ul className="mt-4 space-y-2">
              {stats.recentUploads.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border border-moss bg-ink/40 px-4 py-3 text-sm"
                >
                  {r.title}
                  <span className="block text-xs text-muted">
                    {r.category} · {new Date(r.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
              {!stats.recentUploads.length && (
                <li className="text-sm text-muted">No resources yet</li>
              )}
            </ul>
            <Link href="/admin/resources" className="mt-3 inline-block text-sm text-gold hover:underline">
              Manage resources →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
