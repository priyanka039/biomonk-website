"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import { getPublicFileUrl } from "@/lib/storage";

interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label?: string;
  badge?: string;
  tagline?: string;
  price: number;
  sale_price: number;
  image_path?: string | null;
  published: boolean;
  featured: boolean;
}

export default function AdminCoursesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    category: "dropper",
    category_label: "",
    price: 0,
    sale_price: 0,
  });

  function load() {
    fetch("/api/admin/courses")
      .then((r) => r.json())
      .then((j) => j.ok && setItems(j.data ?? []));
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadCover(file: File, courseId: string) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", "course-cover");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);

    if (!json.ok) {
      toast(json.errors?.[0] ?? "Upload failed", "error");
      return;
    }

    const put = await fetch("/api/admin/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: courseId,
        image_path: json.data.file_path,
      }),
    });
    const putJson = await put.json();
    if (putJson.ok) {
      toast("Cover image updated");
      load();
      if (editing?.id === courseId) {
        setEditing({ ...editing, image_path: json.data.file_path });
      }
    } else {
      toast(putJson.errors?.[0] ?? "Save failed", "error");
    }
  }

  async function create() {
    const res = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        published: true,
        featured: true,
        sort_order: items.length,
        price: form.price || 0,
        sale_price: form.sale_price || 0,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      toast("Course created");
      setForm({
        slug: "",
        title: "",
        category: "dropper",
        category_label: "",
        price: 0,
        sale_price: 0,
      });
      load();
    } else {
      toast(json.errors?.[0] ?? "Failed", "error");
    }
  }

  async function saveEdit() {
    if (!editing) return;
    const res = await fetch("/api/admin/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        title: editing.title,
        slug: editing.slug,
        category: editing.category,
        category_label: editing.category_label,
        badge: editing.badge,
        tagline: editing.tagline,
        price: editing.price,
        sale_price: editing.sale_price,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      toast("Course saved");
      setEditing(null);
      load();
    } else {
      toast(json.errors?.[0] ?? "Save failed", "error");
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
    const res = await fetch("/api/admin/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    if (!(await res.json()).ok) {
      setItems((list) =>
        list.map((x) => (x.id === id ? { ...x, [field]: !value } : x))
      );
      toast("Update failed", "error");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete course?")) return;
    const res = await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
    if ((await res.json()).ok) {
      setItems((l) => l.filter((x) => x.id !== id));
      toast("Deleted");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cream">Courses</h1>
      <p className="mt-1 text-sm text-parchment/60">
        Upload a cover photo (JPEG/PNG/WebP, max 5 MB) for each course card on
        the homepage. Courses here replace the static list once published.
      </p>

      <div className="mt-8 rounded-xl border border-moss bg-ink/40 p-4">
        <h2 className="text-sm font-medium text-cream">Add course</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            placeholder="slug (e.g. neet-biology-dropper-2026)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
          />
          <input
            placeholder="Category label (e.g. Dropper Batch)"
            value={form.category_label}
            onChange={(e) =>
              setForm({ ...form, category_label: e.target.value })
            }
            className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
          />
          <button
            type="button"
            onClick={create}
            className="rounded-full gold-gradient px-4 py-2 text-sm font-semibold text-ink"
          >
            Add
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-8 rounded-xl border border-gold/40 bg-ink/60 p-6">
          <h2 className="font-medium text-cream">Edit: {editing.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            />
            <input
              value={editing.category_label ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, category_label: e.target.value })
              }
              placeholder="Category label"
              className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            />
            <input
              value={editing.badge ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, badge: e.target.value })
              }
              placeholder="Badge (e.g. Bestseller)"
              className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream"
            />
            <input
              value={editing.tagline ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, tagline: e.target.value })
              }
              placeholder="Tagline"
              className="rounded-lg border border-moss bg-forest px-3 py-2 text-sm text-cream sm:col-span-2"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {editing.image_path && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getPublicFileUrl(editing.image_path)}
                alt="Cover preview"
                className="h-20 w-32 rounded-lg border border-moss object-cover"
              />
            )}
            <label className="cursor-pointer rounded-lg border border-moss px-4 py-2 text-sm text-gold hover:border-gold/50">
              {uploading ? "Uploading…" : "Upload cover photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCover(f, editing.id);
                }}
              />
            </label>
          </div>

          <div className="mt-4 flex gap-2">
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
      )}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-moss text-parchment/70">
              <th className="py-2 pr-3">Cover</th>
              <th className="py-2 pr-3">Title</th>
              <th className="py-2 pr-3">Slug</th>
              <th className="py-2 pr-3">Featured</th>
              <th className="py-2 pr-3">Published</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-b border-moss/50">
                <td className="py-2 pr-3">
                  {c.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getPublicFileUrl(c.image_path)}
                      alt=""
                      className="h-10 w-14 rounded object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
                <td className="py-2 pr-3 text-cream">{c.title}</td>
                <td className="py-2 pr-3 text-xs">{c.slug}</td>
                <td className="py-2 pr-3">
                  <button
                    type="button"
                    onClick={() => toggle(c.id, "featured", !c.featured)}
                    className="text-gold"
                  >
                    {c.featured ? "Yes" : "No"}
                  </button>
                </td>
                <td className="py-2 pr-3">
                  <button
                    type="button"
                    onClick={() => toggle(c.id, "published", !c.published)}
                    className="text-gold"
                  >
                    {c.published ? "Yes" : "No"}
                  </button>
                </td>
                <td className="py-2 space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditing(c)}
                    className="text-gold"
                  >
                    Edit
                  </button>
                  <label className="cursor-pointer text-parchment hover:text-gold">
                    Photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadCover(f, c.id);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
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
          <p className="mt-4 text-sm text-muted">
            No courses in database — homepage still uses static courses from code.
            Add courses here to manage them + cover photos.
          </p>
        )}
      </div>
    </div>
  );
}
