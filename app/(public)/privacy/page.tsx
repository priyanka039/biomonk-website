import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BioMonk collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="We respect your privacy. This page explains what we collect and how we use it. This is a summary for general guidance and will be finalised before launch."
      sections={[
        {
          heading: "Information we collect",
          body: "When you submit an interest form, predictor query, or Mentor Connect application, we collect details such as your name, phone number, email, NEET score, category, and state. The NEET Predictor itself can be used anonymously without an account.",
        },
        {
          heading: "How we use it",
          body: "We use your details to respond to your enquiry, connect you with Vicky Sir, confirm counselling slots, and improve our free tools. We never sell your data to third parties.",
        },
        {
          heading: "Data storage",
          body: "Submissions are stored securely and accessed only by the BioMonk team. You can request deletion of your data at any time by contacting us.",
        },
      ]}
    />
  );
}
