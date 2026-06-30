// Soft, slowly drifting lavender "mist" rendered behind all page content.
// Pure CSS (transform/opacity only) so it's GPU-cheap and respects
// prefers-reduced-motion (handled in globals.css).
export function LavenderMist() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="mist mist-1" />
      <span className="mist mist-2" />
      <span className="mist mist-3" />
      <span className="mist mist-4" />
    </div>
  );
}
