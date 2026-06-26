import { CtaButton } from "@/components/shared/CtaButton";
import { siteConfig, whatsappLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="hero-glow relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-moss/50 to-forest px-6 py-16 text-center sm:px-12">
        <h2 className="relative z-10 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl text-balance">
          Join {siteConfig.stats.students} NEET Students Already on BioMonk
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-lg text-parchment/80">
          Free tools, a daily MCQ community, and a mentor who actually replies.
          Start today — no payment required.
        </p>
        <div className="relative z-10 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton
            href={whatsappLink(
              "Hi Vicky Sir! I want to join the free BioMonk WhatsApp community."
            )}
            variant="whatsapp"
            size="lg"
          >
            Join Free on WhatsApp
          </CtaButton>
          <CtaButton href="/courses" variant="ghost" size="lg">
            Explore Courses
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
