"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site";
import { Logo } from "./SectionLabel";

export function Navbar({ lmsUrl }: { lmsUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[800] transition-all duration-300",
        scrolled
          ? "glass-nav border-b border-gold/20"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="BioMonk home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-parchment/80 transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={lmsUrl || "/dashboard"}
            className="text-sm font-medium text-parchment/80 transition-colors hover:text-cream"
          >
            Login
          </Link>
          <Link
            href="/free-tools/neet-predictor"
            className="inline-flex h-10 items-center justify-center rounded-full gold-gradient px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Start Free
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="rounded-full p-2 text-cream lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[850] flex flex-col bg-ink/98 backdrop-blur-xl lg:hidden">
          <div className="flex h-16 items-center justify-between px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-full p-2 text-cream"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-2 px-5 pt-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-moss/60 py-4 font-display text-2xl text-cream"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={lmsUrl || "/dashboard"}
              onClick={() => setMenuOpen(false)}
              className="border-b border-moss/60 py-4 font-display text-2xl text-cream"
            >
              Login
            </Link>
            <Link
              href="/free-tools/neet-predictor"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex h-14 items-center justify-center rounded-full gold-gradient text-base font-semibold text-ink"
            >
              Start Free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
