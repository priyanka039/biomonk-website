import Image from "next/image";

export function BrowserFrame({
  url,
  src,
  alt,
  compact,
  priority,
}: {
  url?: string;
  src: string;
  alt: string;
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-moss bg-white shadow-[0_30px_70px_-30px_rgba(90,0,157,0.5)]">
      <div
        className={`flex items-center gap-2 border-b border-moss bg-forest ${
          compact ? "px-2.5 py-1.5" : "px-4 py-2.5"
        }`}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gold/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/50" />
        </span>
        {!compact && url && (
          <span className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-center font-mono text-[11px] text-muted">
            {url}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1024}
        height={533}
        unoptimized
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}
