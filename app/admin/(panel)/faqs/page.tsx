"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Faq {
  id: string;
  question: string;
  answer: string;
  published: boolean;
}

export default function AdminFaqsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Faq[]>([]);
  const [form, setForm] = useState({ question: "", answer: "" });

  function load() {
    fetch("/api/admin/faqs").then((r) => r.json()).then((j) => j.ok && setItems(j.data ?? []));
  }
  useEffect(() => { load(); }, []);

  async function create() {
    const res = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: true, sort_order: items.length }),
    });
    const json = await res.json();
    if (json.ok) { toast("FAQ added"); setForm({ question: "", answer: "" }); load(); }
    else toast(json.errors?.[0] ?? "Failed", "error");
  }

  async function togglePublished(id: string, published: boolean) {
    setItems((list) => list.map((x) => (x.id === id ? { ...x, published } : x)));
    const res = await fetch("/api/admin/faqs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published }),
    });
    if (!(await res.json()).ok) {
      setItems((list) => list.map((x) => (x.id === id ? { ...x, published: !published } : x)));
      toast("Update failed", "error");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete FAQ?")) return;
    const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
    if ((await res.json()).ok) { setItems((l) => l.filter((x) => x.id !== id)); toast("Deleted"); }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">FAQs</h1>
      <div className="mt-8 space-y-2 rounded-xl border border-moss bg-ink/40 p-4">
        <input placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <textarea placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" rows={3} />
        <button type="button" onClick={create} className="rounded-full gold-gradient px-4 py-2 text-sm font-semibold text-ink">Add FAQ</button>
      </div>
      <div className="mt-8 space-y-3">
        {items.map((f) => (
          <div key={f.id} className="rounded-xl border border-moss bg-ink/40 p-4">
            <p className="font-medium text-cream">{f.question}</p>
            <p className="mt-1 text-sm text-parchment/70">{f.answer}</p>
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => togglePublished(f.id, !f.published)} className="text-sm text-gold">{f.published ? "Published" : "Hidden"}</button>
              <button type="button" onClick={() => remove(f.id)} className="text-sm text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
