import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of BioMonk.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="By using BioMonk, you agree to these terms. This is a plain-language summary that will be finalised before launch."
      sections={[
        {
          heading: "Use of the site",
          body: "Our free tools, including the NEET College Predictor, are provided for guidance only. Predictions are based on historical counselling data and are not a guarantee of admission.",
        },
        {
          heading: "Course access",
          body: "Enrolled students receive access to course content through the BioMonk learning dashboard. Sharing your access credentials or redistributing content is not permitted.",
        },
        {
          heading: "Contact",
          body: "For any questions about these terms, reach out to the BioMonk team via email or WhatsApp.",
        },
      ]}
    />
  );
}
