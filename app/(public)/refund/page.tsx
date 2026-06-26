import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "BioMonk course and counselling refund terms.",
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="We want you to enroll with confidence. The summary below outlines our approach to refunds — exact terms for each course are confirmed by the team before you pay."
      sections={[
        {
          heading: "Course refunds",
          body: "Most courses include a transparent refund window after enrollment. If you change your mind within that window and have not consumed a significant portion of the content, you are eligible for a refund.",
        },
        {
          heading: "Counselling sessions",
          body: "Mentor Connect sessions can be rescheduled with reasonable notice. Refunds for unused sessions are handled case by case.",
        },
        {
          heading: "How to request",
          body: "Message the team on WhatsApp with your enrollment details. We aim to process eligible refunds promptly.",
        },
      ]}
    />
  );
}
