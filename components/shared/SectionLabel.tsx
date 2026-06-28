import Image from "next/image";
import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold",
        className
      )}
    >
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="BioMonk"
      width={945}
      height={189}
      priority
      unoptimized
      className={cn("h-8 w-auto", className)}
    />
  );
}
