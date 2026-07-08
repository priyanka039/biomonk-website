import {
  Download,
  BookMarked,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaButton } from "@/components/shared/CtaButton";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { siteConfig } from "@/lib/site";
import type { ResourceRow } from "@/lib/cms";
import { getResources } from "@/lib/cms";
import { SECTION_KEYS } from "@/lib/cms/keys";
import { getSection } from "@/lib/cms";
import {
  categoryMeta,
  descriptionLines,
} from "@/lib/resource-categories";

const LMS_FEATURES = [
  { label: "Structured video lessons", bold: false },
  { label: "Test series with instant analysis", bold: false },
  { label: "Error Book — every mistake, fixed", bold: true },
  { label: "Performance analytics & streaks", bold: false },
  { label: "Live doubt-solving sessions", bold: false },
];

interface SectionHeader {
  title?: string;
  subtitle?: string;
}

export async function Resources() {
  const allResources = await getResources();
  const section = await getSection<SectionHeader>(SECTION_KEYS.RESOURCES_HEADER);
  const title = section?.title ?? "Start with our free study material";
  const subtitle =
    section?.subtitle ??
    "Hand-picked notes, mind maps and PYQs to kick-start your Biology prep — no sign-up, no payment. Just download and begin.";

  const featured = allResources.filter((r) => r.featured);
  const gridResources =
    featured.length > 0 ? featured : allResources;

  return (
    <section
      id="resources"
      className="relative scroll-mt-20 border-y border-moss bg-forest/50 py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Free Resources</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
            {title}
          </h2>
          <p className="mt-4 text-parchment/70">{subtitle}</p>
        </div>

        {gridResources.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridResources.map((r) => (
              <ResourceCard key={r.id} resource={r} variant="grid" />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-parchment/60">
            Study material coming soon — check back shortly.
          </p>
        )}

        {allResources.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                  Look inside the material
                </h3>
                <p className="mt-1.5 text-sm text-parchment/70">
                  Real, exam-ready PDFs from BioMonk — swipe to browse.
                </p>
              </div>
              <span className="hidden shrink-0 text-xs text-muted sm:block">
                Swipe →
              </span>
            </div>

            <div className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {allResources.map((r) => (
                <ResourceCard key={`preview-${r.id}`} resource={r} variant="preview" />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/40 to-forest p-7 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-amber">
                <BookMarked size={14} />
                Inside the BioMonk LMS
              </span>
              <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl text-balance">
                Free notes get you started.
                <br className="hidden sm:block" /> The BioMonk LMS gets you{" "}
                <span className="gold-text">ranks.</span>
              </h3>
              <p className="mt-4 text-parchment/80">
                When you&apos;re ready to go all-in, everything lives in one
                focused dashboard — including the Error Book that turns every
                wrong answer into a fixed concept before NEET.
              </p>

              <ul className="mt-6 space-y-3">
                {LMS_FEATURES.map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-center gap-3 ${
                      f.bold ? "font-semibold text-amber" : "text-parchment"
                    }`}
                  >
                    <CheckCircle2
                      size={18}
                      className={`shrink-0 ${f.bold ? "text-amber" : "text-gold"}`}
                    />
                    {f.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton href="/dashboard" size="lg">
                  Explore the Dashboard <ArrowRight size={18} />
                </CtaButton>
                <CtaButton href={siteConfig.lmsUrl} variant="ghost" size="lg">
                  Open My LMS <ArrowUpRight size={18} />
                </CtaButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-[2.25rem] gold-gradient opacity-[0.14] blur-2xl"
              />
              <BrowserFrame
                url="app.biomonk.in/dashboard"
                src="/lms-dashboard.png"
                alt="BioMonk LMS dashboard featuring the Error Book"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceCard({
  resource,
  variant,
}: {
  resource: ResourceRow;
  variant: "grid" | "preview";
}) {
  const meta = categoryMeta(resource.category);
  const Icon = meta.icon;
  const lines = descriptionLines(resource.description);
  const isPreview = variant === "preview";

  const shell = isPreview
    ? "group relative w-[240px] shrink-0 snap-start sm:w-[260px]"
    : "group flex flex-col";

  const card = isPreview
    ? "relative overflow-hidden rounded-2xl border border-moss bg-white p-5 shadow-[0_18px_45px_-30px_rgba(90,0,157,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:border-gold/40"
    : "flex h-full flex-col rounded-2xl border border-moss bg-white p-6 shadow-[0_20px_50px_-30px_rgba(90,0,157,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-gold/40";

  return (
    <article className={shell}>
      <div className={card}>
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${meta.badgeClass}`}
          >
            {meta.shortTag}
          </span>
          {!isPreview && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${meta.iconClass}`}>
                <Icon size={20} />
              </span>
            </span>
          )}
          {isPreview && (
            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
              PDF
            </span>
          )}
        </div>

        <span className="mt-3 block text-[11px] font-semibold uppercase tracking-wider text-sage">
          {meta.label}
        </span>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-cream">
          {resource.title}
        </h3>

        {lines.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {lines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 text-[13px] text-parchment"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
                {line}
              </li>
            ))}
          </ul>
        ) : resource.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-parchment">
            {resource.description}
          </p>
        ) : (
          <p className="mt-2 flex-1 text-sm text-muted">
            Free {meta.label.toLowerCase()} — download and start revising.
          </p>
        )}

        <a
          href={`/api/download/${resource.id}`}
          className={`inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-amber ${
            isPreview ? "mt-4" : "mt-5"
          }`}
        >
          <Download size={16} />
          Download PDF
        </a>

        {isPreview && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"
          />
        )}
      </div>
    </article>
  );
}
