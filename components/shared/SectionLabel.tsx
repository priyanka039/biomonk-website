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
    <span
      className={cn(
        "font-display text-2xl font-semibold tracking-tight text-cream",
        className
      )}
    >
      Bio<span className="gold-text">Monk</span>
    </span>
  );
}
