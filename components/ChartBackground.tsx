// A subtle, looping "live analytics dashboard" backdrop — a bar chart
// pulsing like an equalizer, a glowing trend line that redraws itself,
// a soft green scan-light sweeping across, and a dot grid. Everything
// is capped at low opacity via .chart-bg in globals.css so it reads as
// texture, not content. Pure CSS/SVG — no client JS needed.
const BAR_HEIGHTS = [
  22, 34, 18, 40, 28, 46, 32, 55, 38, 60, 44, 50, 66, 48, 72, 58, 80, 62, 88,
  70, 94, 78, 100, 84,
];

const LINE_POINTS =
  "0,86 30,70 60,78 90,52 120,60 150,34 180,44 210,22 240,30 270,10 300,18 " +
  "330,4 360,14 390,-4";

export default function ChartBackground() {
  return (
    <div className="chart-bg" aria-hidden="true">
      <div className="chart-bg-grid" />

      <svg
        className="chart-bg-bars"
        viewBox="0 0 480 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {BAR_HEIGHTS.map((h, i) => (
          <rect
            key={i}
            x={i * 20}
            y={100 - h}
            width="12"
            height={h}
            rx="1.5"
            className="chart-bar"
            style={{ animationDelay: `${(i % 12) * 0.18}s` }}
          />
        ))}
      </svg>

      <svg
        className="chart-bg-line"
        viewBox="-10 -15 410 110"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="chartLineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polyline
          points={LINE_POINTS}
          className="chart-line-glow"
          filter="url(#chartLineGlow)"
        />
        <polyline points={LINE_POINTS} className="chart-line-crisp" />
      </svg>

      <div className="chart-bg-scan" />
      <div className="chart-bg-vignette" />
    </div>
  );
}