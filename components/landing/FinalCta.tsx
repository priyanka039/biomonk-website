import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl gold-gradient px-6 py-16 text-center sm:px-12 shadow-[0_30px_90px_-35px_rgba(90,0,157,0.75)]">
        {/* soft luminous accents for depth */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <h2 className="relative z-10 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
          Join {siteConfig.stats.students} NEET Students Already on BioMonk
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-lg text-white/85">
          Free tools, a daily MCQ community, and a mentor who actually replies.
          Start today — no payment required.
        </p>
        <div className="relative z-10 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(
              "Hi Vicky Sir! I want to join the free BioMonk WhatsApp community."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Join Free on WhatsApp
          </a>
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
