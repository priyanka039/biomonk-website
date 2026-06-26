import { Trophy, BarChart3, Target } from "lucide-react";
import { CtaButton } from "@/components/shared/CtaButton";

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:pb-24 lg:pt-20">
        {/* Left — text */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            NEET Biology · Taught personally by Vicky Sir
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl text-balance">
            India&apos;s Most Trusted{" "}
            <span className="gold-text">NEET Biology</span> Mentor
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
            16+ years. 1000s of students. Multiple AIRs.
            <br className="hidden sm:block" />
            Now online — for everyone.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ProofChip icon={<Trophy size={15} />}>
              Ex-Allen · Ex-Aakash · Ex-PW
            </ProofChip>
            <ProofChip icon={<BarChart3 size={15} />}>16+ Years</ProofChip>
            <ProofChip icon={<Target size={15} />}>
              Multiple AIR Toppers
            </ProofChip>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/courses" size="lg">
              Explore Courses →
            </CtaButton>
            <CtaButton
              href="/free-tools/neet-predictor"
              variant="ghost"
              size="lg"
            >
              Try Free NEET Predictor
            </CtaButton>
          </div>
        </div>

        {/* Right — portrait + floating result cards */}
        <div className="relative z-10 mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-moss bg-gradient-to-b from-moss/60 via-forest to-ink">
            <div className="absolute inset-0 flex items-end justify-center">
              <span className="font-display text-[10rem] font-semibold leading-none text-sage/20">
                VV
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5">
              <p className="font-display text-xl text-cream">Vicky Vaswani</p>
              <p className="text-xs text-amber">Founder &amp; Lead Mentor</p>
            </div>
          </div>

          <FloatCard
            className="-left-3 top-8 sm:-left-6"
            air="AIR 47"
            detail="NEET 2023 · Mehak S."
          />
          <FloatCard
            className="-right-3 bottom-16 sm:-right-6"
            air="AIR 112"
            detail="NEET 2024 · Rohit K."
          />
        </div>
      </div>
    </section>
  );
}

function ProofChip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-moss bg-forest/60 px-3.5 py-2 text-xs font-medium text-parchment">
      <span className="text-gold">{icon}</span>
      {children}
    </span>
  );
}

function FloatCard({
  className,
  air,
  detail,
}: {
  className: string;
  air: string;
  detail: string;
}) {
  return (
    <div
      className={`absolute z-20 animate-float-up rounded-2xl border border-gold/40 bg-forest/95 px-4 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur ${className}`}
    >
      <p className="font-display text-xl font-semibold text-gold">{air}</p>
      <p className="font-mono text-[11px] text-parchment/80">{detail}</p>
    </div>
  );
}
