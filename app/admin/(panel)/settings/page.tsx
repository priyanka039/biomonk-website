"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Settings {
  lms_url: string;
  neet_date: string;
  mentor_seats_left: number;
  stats: {
    students: string;
    years: string;
    toppers: string;
    aiimsSelections: string;
  };
}

interface Contact {
  id: string;
  type: string;
  value: string;
  label: string | null;
  sort_order: number;
  published: boolean;
}

const CONTACT_TYPES = [
  "whatsapp",
  "email",
  "phone",
  "youtube",
  "instagram",
  "whatsapp_group",
];

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<"settings" | "contacts">("settings");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((j) => {
      if (j.ok && j.data) {
        setSettings({
          lms_url: j.data.lms_url ?? "",
          neet_date: j.data.neet_date ?? "2027-05-02",
          mentor_seats_left: j.data.mentor_seats_left ?? 8,
          stats: j.data.stats ?? {
            students: "10,000+",
            years: "16+",
            toppers: "23",
            aiimsSelections: "6",
          },
        });
      } else {
        setSettings({
          lms_url: "",
          neet_date: "2027-05-02",
          mentor_seats_left: 8,
          stats: {
            students: "10,000+",
            years: "16+",
            toppers: "23",
            aiimsSelections: "6",
          },
        });
      }
    });
    fetch("/api/admin/contacts").then((r) => r.json()).then((j) => j.ok && setContacts(j.data ?? []));
  }, []);

  async function saveSettings() {
    if (!settings) return;
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const json = await res.json();
    setSaving(false);
    toast(json.ok ? "Settings saved" : (json.errors?.[0] ?? "Save failed"), json.ok ? "success" : "error");
  }

  async function saveContact(c: Partial<Contact> & { type: string }) {
    const method = c.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/contacts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    });
    const json = await res.json();
    if (json.ok) {
      const list = await fetch("/api/admin/contacts").then((r) => r.json());
      if (list.ok) setContacts(list.data);
      toast("Contact saved");
    } else {
      toast(json.errors?.[0] ?? "Save failed", "error");
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Delete this contact?")) return;
    const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.ok) {
      setContacts((c) => c.filter((x) => x.id !== id));
      toast("Contact deleted");
    }
  }

  async function togglePublished(c: Contact) {
    await saveContact({ ...c, published: !c.published });
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Settings</h1>

      <div className="mt-6 flex gap-2">
        {(["settings", "contacts"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
              tab === t ? "gold-gradient text-ink" : "border border-moss text-parchment/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "settings" && settings && (
        <div className="mt-8 max-w-xl space-y-4">
          <Field label="LMS URL" value={settings.lms_url} onChange={(v) => setSettings({ ...settings, lms_url: v })} />
          <Field label="NEET date (YYYY-MM-DD)" value={settings.neet_date} onChange={(v) => setSettings({ ...settings, neet_date: v })} />
          <Field label="Mentor seats left" value={String(settings.mentor_seats_left)} onChange={(v) => setSettings({ ...settings, mentor_seats_left: Number(v) })} />
          <p className="text-xs text-muted pt-2">Stats (display strings)</p>
          <Field label="Students" value={settings.stats.students} onChange={(v) => setSettings({ ...settings, stats: { ...settings.stats, students: v } })} />
          <Field label="Years" value={settings.stats.years} onChange={(v) => setSettings({ ...settings, stats: { ...settings.stats, years: v } })} />
          <Field label="Toppers" value={settings.stats.toppers} onChange={(v) => setSettings({ ...settings, stats: { ...settings.stats, toppers: v } })} />
          <Field label="AIIMS selections" value={settings.stats.aiimsSelections} onChange={(v) => setSettings({ ...settings, stats: { ...settings.stats, aiimsSelections: v } })} />
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="rounded-full gold-gradient px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      )}

      {tab === "contacts" && (
        <div className="mt-8 space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className="flex flex-wrap items-end gap-3 rounded-xl border border-moss bg-ink/40 p-4">
              <div className="text-xs text-gold uppercase">{c.type}</div>
              <Field label="Value" value={c.value} onChange={(v) => setContacts((list) => list.map((x) => x.id === c.id ? { ...x, value: v } : x))} />
              <Field label="Label" value={c.label ?? ""} onChange={(v) => setContacts((list) => list.map((x) => x.id === c.id ? { ...x, label: v } : x))} />
              <button type="button" onClick={() => saveContact(c)} className="rounded-lg border border-gold/40 px-3 py-2 text-xs text-gold">Save</button>
              <button type="button" onClick={() => togglePublished(c)} className="rounded-lg border border-moss px-3 py-2 text-xs">{c.published ? "Published" : "Hidden"}</button>
              <button type="button" onClick={() => deleteContact(c.id)} className="rounded-lg border border-red-500/40 px-3 py-2 text-xs text-red-400">Delete</button>
            </div>
          ))}
          <AddContactForm types={CONTACT_TYPES} onAdd={saveContact} />
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-parchment/70">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream outline-none focus:border-gold"
      />
    </label>
  );
}

function AddContactForm({ types, onAdd }: { types: string[]; onAdd: (c: Partial<Contact> & { type: string }) => void }) {
  const [type, setType] = useState(types[0]);
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");

  return (
    <div className="rounded-xl border border-dashed border-moss p-4">
      <p className="mb-3 text-sm font-medium text-cream">Add contact</p>
      <div className="flex flex-wrap gap-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream">
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream" />
        <button
          type="button"
          onClick={() => { onAdd({ type, value, label, published: true, sort_order: 99 }); setValue(""); setLabel(""); }}
          className="rounded-full gold-gradient px-4 py-2 text-sm font-semibold text-ink"
        >
          Add
        </button>
      </div>
    </div>
  );
}
