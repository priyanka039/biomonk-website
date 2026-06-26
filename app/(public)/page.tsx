import { Hero } from "@/components/landing/Hero";
import { ProofMarquee } from "@/components/landing/ProofMarquee";
import { WhyBioMonk } from "@/components/landing/WhyBioMonk";
import { FreeVsPaid } from "@/components/landing/FreeVsPaid";
import { FeaturedCourses } from "@/components/landing/FeaturedCourses";
import { PredictorCtaBand } from "@/components/landing/PredictorCtaBand";
import { HallOfFame } from "@/components/landing/HallOfFame";
import { VickyStory } from "@/components/landing/VickyStory";
import { MentorConnectTeaser } from "@/components/landing/MentorConnectTeaser";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofMarquee />
      <WhyBioMonk />
      <FreeVsPaid />
      <FeaturedCourses />
      <PredictorCtaBand />
      <HallOfFame limit={6} showViewAll heading="Your seniors did it here" />
      <VickyStory />
      <MentorConnectTeaser />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
