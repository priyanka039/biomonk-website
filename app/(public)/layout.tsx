import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { LavenderMist } from "@/components/shared/LavenderMist";
import { StickyCta } from "@/components/shared/StickyCta";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LavenderMist />
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <StickyCta />
    </>
  );
}
