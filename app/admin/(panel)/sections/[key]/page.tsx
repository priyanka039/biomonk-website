"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/components/admin/Toast";

export default function AdminSectionEditorPage() {
  const { key } = useParams<{ key: string }>();
  const { toast } = useToast();
  const [json, setJson] = useState("{}");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!key) return;
    fetch(`/api/admin/content/sections/${key}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.ok && j.data) {
          setJson(JSON.stringify(j.data.payload ?? {}, null, 2));
          setPublished(j.data.published ?? true);
        }
      });
  }, [key]);

  async function save() {
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(json);
    } catch {
      toast("Invalid JSON", "error");
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/admin/content/sections/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload, published, label: key, page: "home" }),
    });
    const j = await res.json();
    setSaving(false);
    toast(j.ok ? "Section saved" : (j.errors?.[0] ?? "Save failed"), j.ok ? "success" : "error");
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Edit: {key}</h1>
      <label className="mt-6 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Published
      </label>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        rows={24}
        className="mt-4 w-full max-w-3xl rounded-xl border border-moss bg-ink/60 p-4 font-mono text-sm text-cream outline-none focus:border-gold"
      />
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-4 rounded-full gold-gradient px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save section"}
      </button>
    </div>
  );
}
