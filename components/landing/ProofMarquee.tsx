const INSTITUTES = [
  "Allen Career Institute",
  "PhysicsWallah",
  "Aakash Institute",
  "FIITJEE",
];

export function ProofMarquee() {
  const items = [...INSTITUTES, ...INSTITUTES, ...INSTITUTES];
  return (
    <section className="border-y border-moss/60 bg-forest/30 py-8">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.25em] text-muted">
        Vicky Sir has mentored students at India&apos;s top institutes
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {items.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl font-medium text-parchment/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
