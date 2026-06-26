import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-7xl font-semibold gold-text">404</span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-cream">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-parchment/70">
        That page wandered off. Let&apos;s get you back to your NEET prep.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full gold-gradient px-6 font-semibold text-ink"
        >
          Back home
        </Link>
        <Link
          href="/free-tools/neet-predictor"
          className="inline-flex h-12 items-center justify-center rounded-full border border-gold/40 px-6 font-medium text-cream hover:bg-gold/10"
        >
          Try the free predictor
        </Link>
      </div>
    </div>
  );
}
