// Decorative, fixed, low-opacity blobs that drift slowly behind the
// whole site. Pure CSS animation (see .ambient-blob in globals.css),
// so it costs nothing at runtime and respects prefers-reduced-motion.
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-blob ambient-blob--1" />
      <div className="ambient-blob ambient-blob--2" />
      <div className="ambient-blob ambient-blob--3" />
    </div>
  );
}