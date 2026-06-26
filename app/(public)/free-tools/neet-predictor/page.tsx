import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { NeetPredictor } from "@/components/predictor/NeetPredictor";

export const metadata: Metadata = {
  title: "Free NEET College Predictor 2025 — 200+ Medical Colleges",
  description:
    "Enter your NEET score and instantly see which medical colleges (AIIMS, Govt, Deemed, Private) you can get — by category and state quota. Free, no login required.",
  alternates: { canonical: "/free-tools/neet-predictor" },
};

export default async function NeetPredictorPage({
  searchParams,
}: {
  searchParams: Promise<{ score?: string }>;
}) {
  const { score } = await searchParams;
  const parsed = score ? parseInt(score, 10) : undefined;
  const initialScore =
    parsed && parsed >= 1 && parsed <= 720 ? parsed : undefined;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <SectionLabel className="justify-center">Free Tool</SectionLabel>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl text-balance">
          NEET College Predictor
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-parchment/80">
          Enter your score and rank to instantly see your realistic college
          options across AIIMS, government, deemed and private institutes — by
          category and state quota. No login, no email.
        </p>
      </div>

      <div className="mt-10">
        <NeetPredictor initialScore={initialScore} />
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        <InfoCard title="All India Quota (15%)">
          Register on mcc.nic.in for 15% AIQ seats in government colleges and
          100% seats in central/deemed institutions.
        </InfoCard>
        <InfoCard title="State Quota (85%)">
          Most government seats are filled via state counselling. Domicile and
          category certificates matter — keep originals ready.
        </InfoCard>
        <InfoCard title="Documents Checklist">
          Marksheets, category &amp; domicile certificates, ID, photos. Prepare
          originals plus multiple photocopies before reporting.
        </InfoCard>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-moss bg-forest/60 p-5">
      <h3 className="font-display text-lg font-semibold text-amber">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-parchment/70">
        {children}
      </p>
    </div>
  );
}
