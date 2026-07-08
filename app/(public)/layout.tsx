import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { LavenderMist } from "@/components/shared/LavenderMist";
import { StickyCta } from "@/components/shared/StickyCta";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import {
  getContacts,
  getSiteSettings,
  getAnnouncements,
} from "@/lib/cms";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contacts, settings, announcements] = await Promise.all([
    getContacts(),
    getSiteSettings(),
    getAnnouncements(),
  ]);

  return (
    <>
      <LavenderMist />
      <AnnouncementBanner announcements={announcements} />
      <Navbar lmsUrl={settings.lmsUrl} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer contacts={contacts} stats={settings.stats} />
      <WhatsAppFloat contacts={contacts} />
      <StickyCta />
    </>
  );
}
