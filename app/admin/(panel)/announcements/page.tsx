"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Announcement {
  id: string;
  title: string;
  body: string;
  active: boolean;
  dismissible: boolean;
  priority: number;
}

export default function AdminAnnouncementsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ title: "", body: "", dismissible: true, priority: 0 });

  function load() {
    fetch("/api/admin/announcements").then((r) => r.json()).then((j) => j.ok && setItems(j.data ?? []));
  }
  useEffect(() => { load(); }, []);

  async function create() {
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, active: true }),
    });
    const json = await res.json();
    if (json.ok) { toast("Announcement created"); setForm({ title: "", body: "", dismissible: true, priority: 0 }); load(); }
    else toast(json.errors?.[0] ?? "Failed", "error");
  }

  async function toggle(id: string, field: "active" | "dismissible", value: boolean) {
    setItems((list) => list.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
    const res = await fetch("/api/admin/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    if (!(await res.json()).ok) {
      setItems((list) => list.map((x) => (x.id === id ? { ...x, [field]: !value } : x)));
      toast("Update failed", "error");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete announcement?")) return;
    const res = await fetch(`/api/admin/announcements?id=${id}`, { method: "DELETE" });
    if ((await res.json()).ok) { setItems((l) => l.filter((x) => x.id !== id)); toast("Deleted"); }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Announcements</h1>
      <div className="mt-8 space-y-2 rounded-xl border border-moss bg-ink/40 p-4">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <textarea placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" rows={2} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.dismissible} onChange={(e) => setForm({ ...form, dismissible: e.target.checked })} />
          Dismissible
        </label>
        <button type="button" onClick={create} className="rounded-full gold-gradient px-4 py-2 text-sm font-semibold text-ink">Create</button>
      </div>
      <div className="mt-8 space-y-3">
        {items.map((a) => (
          <div key={a.id} className="rounded-xl border border-moss bg-ink/40 p-4">
            <p className="font-medium text-cream">{a.title}</p>
            <p className="mt-1 text-sm text-parchment/70">{a.body}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <button type="button" onClick={() => toggle(a.id, "active", !a.active)} className="text-gold">{a.active ? "Active" : "Inactive"}</button>
              <button type="button" onClick={() => toggle(a.id, "dismissible", !a.dismissible)} className="text-gold">{a.dismissible ? "Dismissible" : "Sticky"}</button>
              <button type="button" onClick={() => remove(a.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
