"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Topper {
  id: string;
  name: string;
  rank: number;
  year: number;
  featured: boolean;
}

export default function AdminResultsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Topper[]>([]);
  const [form, setForm] = useState({ name: "", rank: 1, year: 2025 });

  function load() {
    fetch("/api/admin/toppers").then((r) => r.json()).then((j) => j.ok && setItems(j.data ?? []));
  }
  useEffect(() => { load(); }, []);

  async function create() {
    const res = await fetch("/api/admin/toppers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, featured: false, sort_order: items.length }),
    });
    const json = await res.json();
    if (json.ok) { toast("Topper added"); setForm({ name: "", rank: 1, year: 2025 }); load(); }
    else toast(json.errors?.[0] ?? "Failed", "error");
  }

  async function toggleFeatured(id: string, featured: boolean) {
    setItems((list) => list.map((x) => (x.id === id ? { ...x, featured } : x)));
    const res = await fetch("/api/admin/toppers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured }),
    });
    if (!(await res.json()).ok) {
      setItems((list) => list.map((x) => (x.id === id ? { ...x, featured: !featured } : x)));
      toast("Update failed", "error");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete topper?")) return;
    const res = await fetch(`/api/admin/toppers?id=${id}`, { method: "DELETE" });
    if ((await res.json()).ok) { setItems((l) => l.filter((x) => x.id !== id)); toast("Deleted"); }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Results / Toppers</h1>
      <div className="mt-8 flex flex-wrap gap-2 rounded-xl border border-moss bg-ink/40 p-4">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <input type="number" placeholder="AIR" value={form.rank} onChange={(e) => setForm({ ...form, rank: Number(e.target.value) })} className="w-24 rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <input type="number" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className="w-24 rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <button type="button" onClick={create} className="rounded-full gold-gradient px-4 py-2 text-sm font-semibold text-ink">Add</button>
      </div>
      <table className="mt-8 w-full text-left text-sm">
        <thead><tr className="border-b border-moss text-parchment/70"><th className="py-2">Name</th><th>AIR</th><th>Year</th><th>Featured</th><th></th></tr></thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id} className="border-b border-moss/50">
              <td className="py-2 text-cream">{t.name}</td>
              <td>{t.rank}</td>
              <td>{t.year}</td>
              <td><button type="button" onClick={() => toggleFeatured(t.id, !t.featured)} className="text-gold">{t.featured ? "Yes" : "No"}</button></td>
              <td><button type="button" onClick={() => remove(t.id)} className="text-red-400">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
