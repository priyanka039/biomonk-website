import { Hero } from "@/components/landing/Hero";
import { ProofMarquee } from "@/components/landing/ProofMarquee";
import { PersonaCards } from "@/components/landing/PersonaCards";
import { WhyBioMonk } from "@/components/landing/WhyBioMonk";
import { FreeVsPaid } from "@/components/landing/FreeVsPaid";
import { Comparison } from "@/components/landing/Comparison";
import { Resources } from "@/components/landing/Resources";
import { FeaturedCourses } from "@/components/landing/FeaturedCourses";
import { NeetCountdown } from "@/components/landing/NeetCountdown";
import { PredictorCtaBand } from "@/components/landing/PredictorCtaBand";
import { HallOfFame } from "@/components/landing/HallOfFame";
import { WhatsAppWall } from "@/components/landing/WhatsAppWall";
import { VickyStory } from "@/components/landing/VickyStory";
import { MentorConnectTeaser } from "@/components/landing/MentorConnectTeaser";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofMarquee />
      <PersonaCards />
      <WhyBioMonk />
      <FreeVsPaid />
      <Comparison />
      <Resources />
      <FeaturedCourses />
      <NeetCountdown />
      <PredictorCtaBand />
      <HallOfFame limit={6} showViewAll heading="Your seniors did it here" />
      <WhatsAppWall />
      <VickyStory />
      <MentorConnectTeaser />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
