// Uniform, slowly drifting lavender wash rendered behind all page content.
// Two full-bleed gradient layers (no positioned blobs) keep the mist density
// even across the entire page instead of glowing in patches. Pure CSS
// (background-position only) so it's GPU-cheap and respects
// prefers-reduced-motion (handled in globals.css).
export function LavenderMist() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="mist-field mist-field-a" />
      <span className="mist-field mist-field-b" />
    </div>
  );
}
