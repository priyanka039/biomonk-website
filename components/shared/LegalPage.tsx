import { SectionLabel } from "./SectionLabel";
import { siteConfig, whatsappLink } from "@/lib/site";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-parchment/80">{intro}</p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold text-amber">
              {s.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-parchment/80">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 rounded-2xl border border-moss bg-forest/60 p-5 text-sm text-parchment/70">
        Questions about this policy? Email{" "}
        <span className="text-cream">{siteConfig.email}</span> or{" "}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:underline"
        >
          message us on WhatsApp
        </a>
        .
      </p>
    </div>
  );
}
