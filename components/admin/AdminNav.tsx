"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  Layers,
  BookOpen,
  Trophy,
  HelpCircle,
  Megaphone,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/resources", label: "Resources", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/sections", label: "Sections", icon: Layers },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/results", label: "Results", icon: Trophy },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
];

export function AdminNav() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-moss bg-ink/95">
      <div className="border-b border-moss px-5 py-5">
        <Link href="/admin" className="font-display text-lg font-semibold text-cream">
          BioMonk Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || (href !== "/admin" && pathname.startsWith(href))
                ? "bg-gold/15 text-gold"
                : "text-parchment/70 hover:bg-moss/40 hover:text-cream"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-moss p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-parchment/70 hover:bg-moss/40 hover:text-cream"
        >
          <LogOut size={16} />
          Log out
        </button>
        <Link
          href="/"
          className="mt-1 block px-3 py-2 text-xs text-muted hover:text-parchment"
        >
          ← View site
        </Link>
      </div>
    </aside>
  );
}
