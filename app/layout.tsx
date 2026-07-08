import type { Metadata } from "next";
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://biomonk.in"
  ),
  title: {
    default: "BioMonk — India's Most Trusted NEET Biology Mentor | Vicky Vaswani",
    template: "%s | BioMonk",
  },
  description:
    "16+ years of NEET Biology mentorship by Vicky Vaswani (Ex-Allen, Ex-Aakash, Ex-PW). NCERT-first methodology, rank-oriented structure, free NEET college predictor, and direct mentor access. Join 10,000+ students.",
  keywords: [
    "NEET biology coaching online",
    "NEET biology mentor India",
    "NEET college predictor 2025",
    "NCERT biology for NEET",
    "Vicky Vaswani",
    "BioMonk",
  ],
  openGraph: {
    title: "BioMonk — India's Most Trusted NEET Biology Mentor",
    description:
      "16+ years. 1000s of students. Multiple AIRs. Now online — for everyone.",
    type: "website",
    locale: "en_IN",
    siteName: "BioMonk",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioMonk — NEET Biology by Vicky Vaswani",
    description:
      "16+ years. 1000s of students. Multiple AIRs. Now online — for everyone.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-ink text-cream"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
