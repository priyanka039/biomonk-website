"use client";

import { useEffect, useState } from "react";

type LeadType = "leads" | "mentor" | "predictor";

export default function AdminLeadsPage() {
  const [type, setType] = useState<LeadType>("leads");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  function load() {
    const params = new URLSearchParams({ type });
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    fetch(`/api/admin/leads?${params}`)
      .then((r) => r.json())
      .then((j) => j.ok && setRows(j.data ?? []));
  }

  useEffect(() => { load(); }, [type, from, to]);

  function exportCsv() {
    const params = new URLSearchParams({ type, format: "csv" });
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    window.open(`/api/admin/leads?${params}`, "_blank");
  }

  const keys = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Leads inbox</h1>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        {(["leads", "mentor", "predictor"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full px-4 py-2 text-sm capitalize ${
              type === t ? "gold-gradient text-ink font-semibold" : "border border-moss text-parchment/80"
            }`}
          >
            {t === "mentor" ? "Mentor queries" : t === "predictor" ? "Predictor" : "Leads"}
          </button>
        ))}
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <button type="button" onClick={exportCsv} className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">
          Export CSV
        </button>
      </div>

      <div className="mt-8 overflow-x-auto">
        {rows.length ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-moss text-parchment/70">
                {keys.map((k) => (
                  <th key={k} className="py-2 pr-4">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-moss/50">
                  {keys.map((k) => (
                    <td key={k} className="py-2 pr-4 text-parchment/90">
                      {String(row[k] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-muted">No records in this range</p>
        )}
      </div>
    </div>
  );
}
