"use client";

import { useState } from "react";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { CATEGORIES, STATE_OPTIONS } from "@/lib/data/predictor";
import { whatsappLink, siteConfig } from "@/lib/site";

const inputCls =
  "h-12 w-full rounded-xl border border-moss bg-ink px-4 text-cream placeholder:text-muted/60 ring-gold-focus";

export function MentorConnectForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    neetScore: "",
    category: "UR",
    state: "",
    collegePreferences: "",
    questions: "",
    sessionType: "quick",
    preferredSlot: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mentor",
          ...form,
          collegePreferences: form.collegePreferences
            ? form.collegePreferences.split(",").map((s) => s.trim())
            : null,
        }),
      });
    } catch {
      /* graceful */
    }
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-gold/40 bg-forest p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Check size={28} />
        </div>
        <h3 className="font-display text-2xl font-semibold text-cream">
          Application received!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-parchment/80">
          We&apos;ll confirm your slot within 24 hours via WhatsApp. For an
          instant response, message us now on {siteConfig.phoneDisplay}.
        </p>
        <a
          href={whatsappLink(
            `Hi Vicky Sir, I just submitted a Mentor Connect application (${form.name}, NEET ${form.neetScore}). Looking forward to my session.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-ink"
        >
          <MessageCircle size={18} />
          Confirm on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-moss bg-forest/60 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={inputCls}
          />
        </Field>
        <Field label="WhatsApp number" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="10-digit mobile"
            className={inputCls}
          />
        </Field>
        <Field label="Email (optional)">
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
          />
        </Field>
        <Field label="NEET Score">
          <input
            type="number"
            min={1}
            max={720}
            value={form.neetScore}
            onChange={(e) => update("neetScore", e.target.value)}
            placeholder="e.g. 615"
            className={inputCls}
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Home State">
          <select
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            className={inputCls}
          >
            <option value="">Select state…</option>
            {STATE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Top 3 college preferences">
          <input
            value={form.collegePreferences}
            onChange={(e) => update("collegePreferences", e.target.value)}
            placeholder="e.g. KGMU, Grant Medical College, BMCRI"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Your questions / concerns">
          <textarea
            value={form.questions}
            onChange={(e) => update("questions", e.target.value)}
            rows={4}
            placeholder="Tell us what you'd like guidance on…"
            className="w-full rounded-xl border border-moss bg-ink px-4 py-3 text-cream placeholder:text-muted/60 ring-gold-focus"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Session type">
          <select
            value={form.sessionType}
            onChange={(e) => update("sessionType", e.target.value)}
            className={inputCls}
          >
            <option value="quick">Quick Query — ₹499 (30 min)</option>
            <option value="full">Full Counselling — ₹1,499 (60 min)</option>
          </select>
        </Field>
        <Field label="Preferred slot">
          <input
            type="datetime-local"
            value={form.preferredSlot}
            onChange={(e) => update("preferredSlot", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl gold-gradient text-base font-semibold text-ink disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Submitting…
          </>
        ) : (
          "Submit Application →"
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        We&apos;ll confirm your slot within 24 hours via WhatsApp.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
