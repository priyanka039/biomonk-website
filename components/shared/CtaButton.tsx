import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost" | "ink" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ring-gold-focus disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  gold: "gold-gradient text-ink shadow-[0_8px_30px_-8px_rgba(90,0,157,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(90,0,157,0.7)]",
  ghost:
    "border border-gold/40 text-cream hover:border-gold hover:bg-gold/10",
  ink: "bg-ink text-cream border border-moss hover:border-sage",
  whatsapp:
    "bg-[#25D366] text-ink hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function CtaButton(props: AnchorProps | ButtonProps) {
  const { variant = "gold", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } =
      props as AnchorProps;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
