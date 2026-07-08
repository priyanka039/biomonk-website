import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { ContactRow } from "@/lib/cms";
import type { SiteStats } from "@/lib/cms";
import {
  contactValue,
  whatsappLinkFromContacts,
} from "@/lib/contacts-helpers";
import { Logo } from "./SectionLabel";

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function Footer({
  contacts = [],
  stats,
}: {
  contacts?: ContactRow[];
  stats?: SiteStats;
}) {
  const years = stats?.years ?? siteConfig.stats.years;
  const email = contactValue(contacts, "email") || siteConfig.email;
  const phone = contactValue(contacts, "phone") || siteConfig.phoneDisplay;
  const youtube = contactValue(contacts, "youtube") || siteConfig.socials.youtube;
  const instagram = contactValue(contacts, "instagram") || siteConfig.socials.instagram;
  const waLink = whatsappLinkFromContacts(contacts);

  return (
    <footer className="border-t border-moss/60 bg-forest/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/70">
            NEET Biology, taught personally by {siteConfig.mentor}. {years} years of
            mentorship — now online, for everyone.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialIcon href={youtube} label="YouTube">
              <YoutubeIcon />
            </SocialIcon>
            <SocialIcon href={instagram} label="Instagram">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href={waLink} label="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <FooterCol title="Quick Links">
          <FooterLink href="/courses">Courses</FooterLink>
          <FooterLink href="/free-tools/neet-predictor">Free Tools</FooterLink>
          <FooterLink href="/#resources">Free Resources</FooterLink>
          <FooterLink href="/results">Results</FooterLink>
          <FooterLink href="/mentor-connect">Mentor Connect</FooterLink>
          <FooterLink href="/about">About</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex items-center gap-2 text-sm text-parchment/70">
            <Mail size={15} className="text-gold" /> {email}
          </li>
          <li className="flex items-center gap-2 text-sm text-parchment/70">
            <Phone size={15} className="text-gold" /> {phone}
          </li>
          <li className="flex items-center gap-2 text-sm text-parchment/70">
            <MapPin size={15} className="text-gold" /> {siteConfig.location}
          </li>
          <li>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex text-sm font-medium text-[#25D366] hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </li>
        </FooterCol>

        <FooterCol title="Legal">
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/refund">Refund Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-moss/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} BioMonk. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" />
            Secured payments &amp; data protection
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-parchment/70 transition-colors hover:text-cream"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-moss text-parchment/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
