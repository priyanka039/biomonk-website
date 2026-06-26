"use client";

import { useEffect, useState } from "react";
import { X, Check, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, whatsappLink } from "@/lib/site";

interface LeadDialogProps {
  /** Visible label on the trigger button */
  triggerLabel: string;
  triggerClassName?: string;
  /** Pre-fills the "interest" context, e.g. a course title */
  context?: string;
  /** "enroll" | "general" — changes copy */
  intent?: "enroll" | "general";
}

const triggerBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ring-gold-focus h-12 px-6 text-[15px] gold-gradient text-ink shadow-[0_8px_30px_-8px_rgba(200,150,62,0.6)] hover:-translate-y-0.5";

export function LeadDialog({
  triggerLabel,
  triggerClassName,
  context,
  intent = "enroll",
}: LeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const waMessage = context
    ? `Hi Vicky Sir, I'm ${name || "a student"} and I want to enroll in "${context}". My number is ${phone}.`
    : `Hi Vicky Sir, I'm ${name || "a student"} and I'd like to know more about BioMonk. My number is ${phone}.`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: intent === "enroll" ? "enrollment" : "general",
          name,
          phone,
          context: context ?? null,
        }),
      });
    } catch {
      /* graceful — we still show the WhatsApp fallback */
    }
    setStatus("done");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setStatus("idle");
        }}
        className={cn(triggerBase, triggerClassName)}
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md animate-float-up rounded-t-3xl border border-moss bg-forest p-6 sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-moss hover:text-cream"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {status === "done" ? (
              <div className="py-2 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check size={28} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  You&apos;re on the list!
                </h3>
                <p className="mt-2 text-sm text-parchment/80">
                  Vicky Sir&apos;s team will reach out shortly. For the fastest
                  response, message us directly on WhatsApp now.
                </p>
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-ink"
                >
                  <MessageCircle size={18} />
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  {intent === "enroll"
                    ? "Request access"
                    : "Talk to Vicky Sir"}
                </h3>
                <p className="mt-1.5 text-sm text-parchment/80">
                  {context
                    ? `Interested in ${context}. `
                    : ""}
                  Drop your details — the team connects you directly with Vicky
                  Sir. No payment now.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <Field
                    label="Your name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                  <Field
                    label="WhatsApp number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="10-digit mobile number"
                    type="tel"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full gold-gradient font-semibold text-ink disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Request access →"
                    )}
                  </button>
                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/50 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                  >
                    <MessageCircle size={16} />
                    Or message on WhatsApp instead
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-moss bg-ink px-4 text-cream placeholder:text-muted/60 ring-gold-focus"
      />
    </label>
  );
}

export { siteConfig };
