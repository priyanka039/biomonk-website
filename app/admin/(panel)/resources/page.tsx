"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_path: string;
  published: boolean;
  featured: boolean;
  sort_order: number;
}

const CATEGORIES = [
  { value: "notes", label: "Notes" },
  { value: "dpp", label: "DPP (Daily Practice)" },
  { value: "pyqs", label: "PYQs" },
  { value: "mock-tests", label: "Mock Test" },
];

export default function AdminResourcesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Resource[]>([]);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "notes",
    file_path: "",
    file_size: 0,
    mime_type: "application/pdf",
  });
  const [uploading, setUploading] = useState(false);

  function load() {
    fetch("/api/admin/resources")
      .then((r) => r.json())
      .then((j) => j.ok && setItems(j.data ?? []));
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadFile(file: File, category: string) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", category);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (json.ok) {
      setForm((f) => ({
        ...f,
        file_path: json.data.file_path,
        file_size: json.data.file_size,
        mime_type: json.data.mime_type,
      }));
      toast("File uploaded");
    } else {
      toast(json.errors?.[0] ?? "Upload failed", "error");
    }
  }

  async function create() {
    const res = await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        published: true,
        featured: false,
        sort_order: items.length,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      toast("Resource created");
      setForm({
        title: "",
        description: "",
        category: "notes",
        file_path: "",
        file_size: 0,
        mime_type: "application/pdf",
      });
      load();
    } else {
      toast(json.errors?.[0] ?? "Create failed", "error");
    }
  }

  async function saveEdit() {
    if (!editing) return;
    const res = await fetch("/api/admin/resources", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        title: editing.title,
        description: editing.description,
        category: editing.category,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      toast("Resource updated");
      setEditing(null);
      load();
    } else {
      toast(json.errors?.[0] ?? "Update failed", "error");
    }
  }

  async function toggle(
    id: string,
    field: "published" | "featured",
    value: boolean
  ) {
    setItems((list) =>
      list.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
    const res = await fetch("/api/admin/resources", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    const json = await res.json();
    if (!json.ok) {
      setItems((list) =>
        list.map((x) => (x.id === id ? { ...x, [field]: !value } : x))
      );
      toast(json.errors?.[0] ?? "Update failed", "error");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this resource and its file?")) return;
    const res = await fetch(`/api/admin/resources?id=${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.ok) {
      setItems((list) => list.filter((x) => x.id !== id));
      toast("Resource deleted");
    } else {
      toast(json.errors?.[0] ?? "Delete failed", "error");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">
        Resources
      </h1>
      <p className="mt-1 text-sm text-parchment/60">
        Category tag shows on site (Notes, DPP, PYQs, Mock). Use Featured for
        the main grid. Description bullets: one point per line.
      </p>

      <div className="mt-8 max-w-2xl rounded-xl border border-moss bg-ink/40 p-6">
        <h2 className="font-medium text-cream">Upload new resource</h2>
        <div className="mt-4 space-y-3">
          <input
            placeholder="Title (e.g. Human Physiology)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
          />
          <textarea
            placeholder="Description — one bullet per line for preview cards"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            rows={3}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              e.target.files?.[0] &&
              uploadFile(e.target.files[0], form.category)
            }
            className="text-sm text-parchment"
          />
          {form.file_path && (
            <p className="text-xs text-muted">Uploaded: {form.file_path}</p>
          )}
          <button
            type="button"
            onClick={create}
            disabled={!form.title || !form.file_path || uploading}
            className="rounded-full gold-gradient px-6 py-2 text-sm font-semibold text-ink disabled:opacity-50"
          >
            Create resource
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-8 max-w-2xl rounded-xl border border-gold/40 bg-ink/60 p-6">
          <h2 className="font-medium text-cream">Edit resource</h2>
          <div className="mt-4 space-y-3">
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            />
            <textarea
              value={editing.description ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
              rows={3}
            />
            <select
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="w-full rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-full gold-gradient px-5 py-2 text-sm font-semibold text-ink"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-moss px-5 py-2 text-sm text-parchment"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-moss text-parchment/70">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Tag</th>
              <th className="py-2 pr-4">Featured</th>
              <th className="py-2 pr-4">Published</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} className="border-b border-moss/50">
                <td className="py-3 pr-4 text-cream">{r.title}</td>
                <td className="py-3 pr-4 uppercase text-xs text-gold">
                  {r.category}
                </td>
                <td className="py-3 pr-4">
                  <button
                    type="button"
                    onClick={() => toggle(r.id, "featured", !r.featured)}
                    className="text-gold"
                  >
                    {r.featured ? "Yes" : "No"}
                  </button>
                </td>
                <td className="py-3 pr-4">
                  <button
                    type="button"
                    onClick={() => toggle(r.id, "published", !r.published)}
                    className="text-gold"
                  >
                    {r.published ? "Yes" : "No"}
                  </button>
                </td>
                <td className="py-3 space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(r)}
                    className="text-gold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && (
          <p className="mt-4 text-sm text-muted">No resources yet</p>
        )}
      </div>
    </div>
  );
}
