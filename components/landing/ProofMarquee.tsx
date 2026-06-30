const HIGHLIGHTS = [
  "16+ Years Mentoring NEET Biology",
  "NCERT-First Methodology",
  "Rank-Oriented Structure",
  "Live Doubt-Solving Sessions",
  "Chapter-wise Test Series",
  "Error Book — fix every mistake",
  "Multiple AIR Toppers",
  "Direct Mentor Access",
];

export function ProofMarquee() {
  const items = [...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS];
  return (
    <section className="border-y border-moss/60 bg-forest/30 py-8">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.25em] text-muted">
        Everything that goes into a NEET Biology rank
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {items.map((name, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-display text-2xl font-medium text-parchment/50">
                {name}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
