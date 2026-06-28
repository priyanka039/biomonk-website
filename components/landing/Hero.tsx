import Image from "next/image";
import { Trophy, BarChart3, Target } from "lucide-react";
import { CtaButton } from "@/components/shared/CtaButton";

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24 lg:pt-20">
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

        {/* Right — real mentor portrait on a brand gradient disc */}
        <div className="relative z-10 mx-auto w-full max-w-sm lg:max-w-md">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="absolute bottom-3 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber to-gold"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full gold-gradient opacity-25 blur-3xl"
            />
            <Image
              src="/vicky.png"
              alt="Vicky Vaswani — Founder & Lead Mentor at BioMonk"
              width={616}
              height={849}
              priority
              unoptimized
              className="relative z-10 w-[82%] max-w-[20rem] [mask-image:linear-gradient(to_bottom,black_84%,transparent)] drop-shadow-[0_24px_45px_rgba(90,0,157,0.4)]"
            />
          </div>

          <div className="relative z-20 mx-auto -mt-2 w-max rounded-full border border-moss bg-white/90 px-5 py-2 text-center shadow-[0_14px_34px_-14px_rgba(90,0,157,0.5)] backdrop-blur">
            <p className="font-display text-sm font-semibold text-cream">
              Vicky Vaswani
            </p>
            <p className="text-[11px] font-medium text-gold">
              Founder &amp; Lead Mentor
            </p>
          </div>
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

