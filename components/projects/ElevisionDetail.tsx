"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Globe,
  Smartphone,
  AlertTriangle,
  Camera,
  Train,
  ChevronRight,
  Github,
  ExternalLink,
  Linkedin,
  X,
  ChevronLeft,
  ZoomIn,
} from "lucide-react";

// ─────────────────────────────────────────────
// Three GitHub repos
// ─────────────────────────────────────────────
const REPOS = [
  {
    label: "elevision-app",
    desc: "Flutter mobile app",
    url: "https://github.com/PabasaraIlankoon/elevision-app",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100",
    dot: "bg-indigo-400",
  },
  {
    label: "elevision-web",
    desc: "Next.js web dashboard",
    url: "https://github.com/PabasaraIlankoon/elevision-web",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
    dot: "bg-emerald-400",
  },
  {
    label: "elevision-device",
    desc: "Raspberry Pi detection unit",
    url: "https://github.com/PabasaraIlankoon/elevision-device",
    color: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    dot: "bg-amber-400",
  },
];
// ─────────────────────────────────────────────────────────────────────
// 🏗  SYSTEM ARCHITECTURE DIAGRAM
// The SVG diagram below is auto-generated (no image file needed).
// It renders the three-layer architecture inline.
// ────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// 📱 MOBILE APP SCREENSHOTS — mapped from your /public/images/ files
// ─────────────────────────────────────────────────────────────────────
const APP_IMAGES = [
  { src: "/images/mobile_app_dashboard.jpg",    caption: "Live dashboard — active alert card" },
  { src: "/images/alert_detail.jpg",            caption: "Alert detail — image, confidence, map" },
  { src: "/images/alert_history.jpg",           caption: "Alert history with time filters" },
  { src: "/images/map.jpg",                     caption: "Full-screen device map" },
  { src: "/images/analytics.jpg",               caption: "Analytics — trends and device stats" },
  { src: "/images/train_schedule.jpg",          caption: "train schedule-High risk train " },
  { src: "/images/mobile_SMS.jpg",              caption: "Elephant detected SMS alert " },
];

// ─────────────────────────────────────────────────────────────────────
// 🖥  WEB DASHBOARD SCREENSHOTS — mapped from your /public/images/ files
// ─────────────────────────────────────────────────────────────────────
const WEB_IMAGES = [
  { src: "/images/elevision-profile.jpg", caption: "Web dashboard — profile" },
  { src: "/images/web_dashboard.jpg",     caption: "Web dashboard — live alert hero" },
  { src: "/images/elevision-webapp.jpg",  caption: "Web app overview" },
  { src: "/images/web_map.jpg",           caption: "map — screen map" },
];

// ─────────────────────────────────────────────────────────────────────
// 🔧 HARDWARE / PROJECT IMAGES — mapped from your /public/images/ files
// ─────────────────────────────────────────────────────────────────────
const PROJECT_IMAGES = [
   { src: "/images/elevision.jpg",        caption: "Field hardware — full detection unit" },
  { src: "/images/elevision-pcb.jpg",    caption: "PCB & electronics layout" },
    { src: "/images/Assembled_PCB.jpg",      caption: "Assembled PCB — Final" },
];



// ─────────────────────────────────────────────
// Section label
// ─────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────
// Safe image with fallback placeholder
// ─────────────────────────────────────────────
function SafeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 text-gray-300 gap-1 ${className}`}
      >
        <Camera size={20} />
        <span className="text-[9px] font-mono text-center px-2 leading-tight opacity-60">
          {src.split("/").pop()}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setError(true)}
    />
  );
}

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        className="relative w-[88vw] max-w-4xl h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].src}
          alt={images[index].caption}
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-4 text-white/70 text-sm font-medium text-center px-6">
        {images[index].caption}
      </p>
      <p className="mt-1 text-white/30 text-xs font-mono">
        {index + 1} / {images.length}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Apple-style gallery: large preview + thumbnail strip
// ─────────────────────────────────────────────
function AppleGallery({
  images,
  aspect = "aspect-[4/3]", 
}: {
  images: { src: string; caption: string }[];
  aspect?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const next = () =>
    setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}

      {/* ⭐ IMPORTANT: SIZE CONTROL WRAPPER */}
      <div className="max-w-md mx-auto">
        
        {/* Large preview */}
        <div className="relative group">
          <button
            onClick={() => setLightboxOpen(true)}
            className={`relative w-full ${aspect} rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 cursor-zoom-in block`}
          >
            <SafeImage
              src={images[activeIndex].src}
              alt={images[activeIndex].caption}
            />

            {/* Zoom hint */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={13} className="text-white" />
            </div>
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Caption bar */}
        <div className="mt-2.5 flex items-center justify-between px-1">
          <p className="text-[12px] text-gray-500 font-medium">
            {images[activeIndex].caption}
          </p>
          <p className="text-[11px] text-gray-300 font-mono">
            {activeIndex + 1}/{images.length}
          </p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              i === activeIndex
                ? "border-indigo-500 ring-1 ring-indigo-300"
                : "border-gray-200 opacity-60 hover:opacity-90"
            }`}
          >
            <SafeImage src={img.src} alt={img.caption} />
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 font-mono mt-1.5">
        Click any thumbnail to switch · click main image to fullscreen
      </p>
    </>
  );
}

// ─────────────────────────────────────────────
// Metric card
// ─────────────────────────────────────────────
function MetricCard({
  value,
  label,
  sub,
  accent = false,
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        accent ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`text-2xl font-bold font-mono mb-0.5 ${
          accent ? "text-indigo-700" : "text-gray-900"
        }`}
      >
        {value}
      </div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && (
        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Hardware table
// ─────────────────────────────────────────────
function HardwareTable() {
  const rows = [
    { component: "Raspberry Pi 4 (4 GB)",  purpose: "AI processing & system brain",     notes: "aarch64, Debian Bookworm" },
    { component: "ELP 2MP USB Camera",     purpose: "Night-vision field capture",        notes: "Auto-detected at indices 0–3" },
    { component: "SIM800L GSM module",     purpose: "SMS fallback alerting",             notes: "GPIO14/15, 4V regulated supply" },
    { component: "ONNX model (6.3 MB)",    purpose: "YOLOv8 Nano — elephant detection", notes: "~280–350 ms inference on Pi 4" },
    { component: "LED + Buzzer",           purpose: "Trackside physical alert",          notes: "GPIO17 / GPIO24" },
    { component: "32 GB microSD",          purpose: "OS, model, offline queue",          notes: "Class 10" },
    { component: "Waterproof housing",     purpose: "Field deployment",                  notes: "IP-rated outdoor enclosure" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Component</th>
            <th className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Purpose</th>
            <th className="text-left py-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4"><span className="font-mono text-[12px] text-indigo-700">{r.component}</span></td>
              <td className="py-2.5 pr-4 text-gray-600 text-[12px]">{r.purpose}</td>
              <td className="py-2.5 text-gray-400 text-[11px] font-mono hidden sm:table-cell">{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// Train risk engine (interactive)
// ─────────────────────────────────────────────
function TrainRiskEngine() {
  const [offset, setOffset] = useState(0);
  const trains = [
    { name: "6080 Meenagaya",  baseMin: 23 },
    { name: "6075 Pulathisi",  baseMin: 47 },
    { name: "6076 Pulathisi",  baseMin: -240 },
  ];
  const getStatus = (base: number) => {
    const rem = base - offset;
    if (rem < 0)   return { label: "Passed",        cls: "text-gray-400 bg-gray-100",  dot: "bg-gray-300" };
    if (rem <= 30) return { label: `In ${rem} min`, cls: "text-red-700 bg-red-50",     dot: "bg-red-500" };
    if (rem <= 60) return { label: `In ${rem} min`, cls: "text-amber-700 bg-amber-50", dot: "bg-amber-400" };
    return           { label: `In ${rem} min`,       cls: "text-gray-600 bg-gray-50",   dot: "bg-gray-400" };
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[11px] text-gray-500 font-mono whitespace-nowrap">Time elapsed after alert:</span>
        <input
          type="range"
          min={0}
          max={60}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="flex-1 min-w-[120px]"
        />
        <span className="text-[11px] font-mono text-indigo-600 min-w-[60px]">+{offset} min</span>
      </div>
      <div className="space-y-2">
        {trains.map((t, i) => {
          const s = getStatus(t.baseMin);
          return (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Train size={14} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">Train #{t.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">Palugaswewa stop</p>
                </div>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${s.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-400 font-mono">
        Drag slider to simulate time passing after an alert fires at Palugaswewa section.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Firestore schema
// ─────────────────────────────────────────────
function FirestoreSchema() {
  const fields = [
    { name: "timestampMs",   type: "number", desc: "Unix milliseconds" },
    { name: "imageUrl",      type: "string", desc: "Cloudinary HTTPS URL" },
    { name: "confidence",    type: "number", desc: "0.0 – 1.0" },
    { name: "deviceId",      type: "string", desc: '"RW-001"' },
    { name: "locationName",  type: "string", desc: '"Palugaswewa Railway Section"' },
    { name: "latitude",      type: "number", desc: "8.0475" },
    { name: "longitude",     type: "number", desc: "80.6932" },
    { name: "status",        type: "string", desc: '"new" | "seen"' },
  ];
  return (
    <div className="font-mono text-[12px] bg-gray-950 text-gray-300 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-800 text-[10px] text-gray-500 tracking-widest uppercase">
        Firestore · alerts/&#123;alertId&#125;
      </div>
      <div className="p-4 space-y-1.5">
        {fields.map((f, i) => (
          <div key={i} className="flex items-baseline gap-2 flex-wrap">
            <span className="text-indigo-400">{f.name}</span>
            <span className="text-gray-600">:</span>
            <span className="text-amber-400">{f.type}</span>
            <span className="text-gray-600 text-[11px]">// {f.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Creator card — bio on the left, photo on the right
// ─────────────────────────────────────────────
function CreatorCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
      <SectionLabel>Creator</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900 mb-1">Pabasara Ilankoon</p>
          <p className="text-sm text-indigo-600 font-medium mb-3">
            Creator &amp; Lead Developer — Elevision
          </p>
          <p className="text-gray-600 leading-relaxed text-[0.97rem] mb-4">
            Elevision was designed, built, and field-tested end-to-end by Pabasara Ilankoon —
            from training and exporting the YOLOv8 detection model, to wiring and deploying the
            Raspberry Pi field unit, to building the Flutter app and Next.js control-room
            dashboard that bring the alerts to life.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/PabasaraIlankoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/pabasara-ilankoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Linkedin size={13} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Photo — sits on the right on desktop, below the bio on mobile */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src="/images/creator-pabasara-elevision.jpg"
              alt="Pabasara Ilankoon, creator of Elevision, with the field detection unit"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const HIGHLIGHTS = [
  { icon: "🐘", title: "Detects elephants at 94% average confidence",      body: "YOLOv8 Nano fine-tuned on a custom wildlife-railway dataset achieves 94% average confidence with a false positive rate below 3%. Two consecutive positive frames are required before an alert fires - eliminating momentary shadows or debris triggers." },
  { icon: "⚡", title: "End-to-end alert in under 5 seconds",              body: "From the moment an elephant is confirmed on camera to a push notification on the operator's phone, the pipeline completes in under 5 seconds. Firebase real-time listeners update the web dashboard in under 2 seconds." },
  { icon: "🚂", title: "Identifies which trains are at risk — right now",  body: "Five high-risk trains pre-loaded with full stop schedules are cross-referenced against the alert location in real time. The engine colour-codes risk levels and updates live as time passes - 'In 23 min' ticks down every minute." },
  { icon: "📡", title: "GSM SMS fallback — works without internet",        body: "If the Pi loses connectivity, the SIM800L GSM module fires an SMS within 30 seconds. The offline queue persists alerts to disk and retries automatically when connectivity is restored." },
  { icon: "🌐", title: "Two interfaces: Flutter app + Next.js dashboard",  body: "The Flutter app targets railway operators in the field with push notifications, an alert feed, and Sinhala / English language switching. The Next.js dashboard targets control rooms with live alerts, CSV export, and analytics charts." },
  { icon: "🔋", title: "Designed for remote, off-grid deployment",         body: "Housed in a waterproof enclosure, runs on UPS battery for up to 4 hours. The systemd service auto-starts on every boot - no manual intervention after field installation." },
];

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export function ElevisionDetail() {
  const [activeTab, setActiveTab] = useState("train");

  const tabs = [
    { id: "train",  label: "Train risk engine" },
    { id: "schema", label: "Firestore schema" },
  ];

  return (
    <div className="space-y-8">

      {/* ── 1. Problem statement ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The problem</SectionLabel>
        <div className="space-y-4">
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            Sri Lanka loses 10 - 20 elephants every year to train collisions. The railway network passes
            through critical elephant habitats - the Gal Oya corridor, Minneriya - Kaudulla gathering
            zones, and the Habarana - Polonnaruwa crossing - mostly at night, when visibility is near zero
            and response times average 5 - 10 seconds.
          </p>
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            Elevision is the real-time intelligence layer that sits between the animal and the oncoming
            train. A Raspberry Pi running a YOLOv8 Nano model monitors the track 24/7. The moment an
            elephant is detected, a chain of alerts fires within 5 seconds.
          </p>
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { stat: "10 - 20",      label: "elephants lost per year",  sub: "to train collisions in Sri Lanka" },
            { stat: "70%",       label: "collisions at night",      sub: "zero warning for drivers currently" },
            { stat: "5 - 10 sec", label: "average response time",    sub: "with current manual reporting" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-red-50 border border-red-100 p-4">
              <div className="text-xl font-bold text-red-700 font-mono">{s.stat}</div>
              <div className="text-xs font-semibold text-red-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-red-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1b. Creator ── */}
      <CreatorCard />

      {/* ── 2. Repositories ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Repositories</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          The system is split across three separate repositories - one per layer. Click any to open on GitHub.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {REPOS.map((repo) => (
            <a
              key={repo.label}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col gap-2 rounded-xl border p-4 transition-colors ${repo.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${repo.dot}`} />
                  <Github size={14} />
                </div>
                <ExternalLink size={12} className="opacity-50" />
              </div>
              <div>
                <p className="text-[12px] font-mono font-bold leading-tight">{repo.label}</p>
                <p className="text-[11px] opacity-70 mt-0.5">{repo.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── 3. Hardware / Project images ── */}
      {/*
        ════════════════════════════════════════════════════
        📸 ADD YOUR HARDWARE / PROJECT IMAGES HERE
        Save 6 cropped photos to:
          /public/images/elevision/
            hardware-unit.jpg   — Pi + all modules in enclosure
            camera-mount.jpg    — ELP camera on mount / pole
            gsm-wiring.jpg      — SIM800L wiring close-up
            field-deploy.jpg    — Unit installed trackside at Palugaswewa
            detection-demo.jpg  — Terminal or screen showing detection running
            system-overview.jpg — Wide shot of full assembled system
        ════════════════════════════════════════════════════
      */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Hardware &amp; field deployment</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          The Raspberry Pi detection unit, camera mount, GSM wiring, and trackside deployment at Palugaswewa.
        </p>
        <AppleGallery images={PROJECT_IMAGES} aspect="aspect-[16/9]" />
      </div>

      {/* ── 4b. Detection pipeline flowchart ── */}
<div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
  <SectionLabel>Detection pipeline flowchart</SectionLabel>
  <p className="text-gray-500 text-sm leading-relaxed mb-5">
    Step-by-step flow from camera frame capture through inference, filtering,
    and multi-channel alert dispatch.
  </p>
<div className="max-w-[520px] mx-auto rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
  <Image
    src="/images/flow_chart_elevision.jpg"
    alt="Elevision detection pipeline flowchart"
    width={800}
    height={900}
    className="w-full h-auto object-contain"
  />
</div>
</div>
      {/* ── 5. Performance metrics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Performance metrics</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "94%",    label: "Avg. confidence",     sub: "YOLOv8 Nano",        accent: true },
            { value: "<3%",    label: "False positive rate", sub: "2-frame filter" },
            { value: "~300ms", label: "Inference / frame",   sub: "Raspberry Pi 4",     accent: true },
            { value: "<10s",    label: "Alert delivery",      sub: "Pi → phone",         accent: true },
            { value: "<2s",    label: "Dashboard update",    sub: "Firestore stream" },
            { value: "75m",    label: "Detection range",     sub: "Night-vision camera" },
            { value: "15h",     label: "UPS battery backup",  sub: "Off-grid operation" },
            { value: "<30s",   label: "GSM SMS fallback",    sub: "No internet needed", accent: true },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── 6. Interactive detail tabs (Train risk + Firestore schema) ── */}
      {/* NOTE: The detection pipeline flowchart has been removed from here. */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3.5 text-[12px] font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === t.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-6 md:p-8">
          {activeTab === "train" && (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                When an alert fires, the engine checks which trains are approaching. Drag the slider to
                simulate time passing — watch the countdown update live.
              </p>
              <TrainRiskEngine />
            </>
          )}
          {activeTab === "schema" && (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Every detection writes a single Firestore document. Both the Flutter app and Next.js
                dashboard read from this collection via real-time listeners — no polling needed.
              </p>
              <FirestoreSchema />
            </>
          )}
        </div>
      </div>

      {/* ── 7. Hardware components table ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Hardware components</SectionLabel>
        <HardwareTable />
        <div className="mt-5 rounded-xl bg-gray-950 p-4 font-mono text-[11px] text-gray-400 leading-relaxed overflow-x-auto">
          <div className="text-gray-600 mb-2">// Raspberry Pi GPIO wiring</div>
          <div><span className="text-indigo-400">GPIO14 (TX)</span> ← SIM800L RX &nbsp;·&nbsp; <span className="text-indigo-400">GPIO15 (RX)</span> → SIM800L TX</div>
          <div><span className="text-emerald-400">GPIO17</span> → LED indicator (330Ω) &nbsp;&nbsp; <span className="text-amber-400">GPIO24</span> → Buzzer</div>
          <div><span className="text-violet-400">GPIO27</span> → SIM800L RST &nbsp;·&nbsp; USB → ELP camera</div>
          <div className="mt-2 text-yellow-600">⚠ SIM800L draws up to 2A surge — power from a separate 4V regulated supply, NOT the Pi GPIO pins.</div>
        </div>
      </div>

      {/* ── 8. Flutter mobile app screenshots ── */}
      {/*
        ════════════════════════════════════════════════════
        📱 ADD YOUR FLUTTER MOBILE APP SCREENSHOTS HERE
        Crop your full-page app screenshot into 6 parts and save to:
          /public/images/elevision/
            app-dashboard.jpg      — Main dashboard screen (top section)
            app-alert-detail.jpg   — Alert detail: image + confidence + map
            app-alert-history.jpg  — Alert list / history screen
            app-train-schedule.jpg — Train risk / schedule screen
            app-map.jpg            — Full-screen map view
            app-analytics.jpg      — Analytics / stats screen

        TIP: Use a phone frame / mockup tool (Shots.so, Mockuphone)
        to wrap each screenshot before saving - looks much more
        professional in the gallery.
        ════════════════════════════════════════════════════
      */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Flutter mobile app</SectionLabel>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone size={14} className="text-indigo-500" />
          <span className="text-sm font-semibold text-gray-800">iOS &amp; Android</span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">
            elevision-app
          </span>
          <a
            href="https://github.com/PabasaraIlankoon/elevision-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Github size={12} />
            GitHub
          </a>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Push notifications, live alert dashboard, train risk engine, full-screen map, analytics,
          offline cache, and Sinhala / English language toggle.
        </p>
        {/* Constrained to phone width so portrait screenshots match PCB gallery height */}
        <div className="max-w-[260px] mx-auto">
          <AppleGallery images={APP_IMAGES} aspect="aspect-[9/16]" />
        </div>
      </div>

      {/* ── 9. Next.js web dashboard screenshots ── */}
      {}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Next.js web dashboard</SectionLabel>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={14} className="text-emerald-500" />
          <span className="text-sm font-semibold text-gray-800">Control room dashboard</span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full">
            elevision-web
          </span>
          <a
            href="https://github.com/PabasaraIlankoon/elevision-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Github size={12} />
            GitHub
          </a>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Live alert hero, alert history with CSV export, per-alert detail view with map,
          device health grid, train schedule, and analytics charts.
        </p>
        <AppleGallery images={WEB_IMAGES} aspect="aspect-[16/7]" />
      </div>

      {/* ── 10. What makes this work ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>What makes this work</SectionLabel>
        <div className="space-y-5">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-xl flex-shrink-0 mt-0.5">{h.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{h.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 11. Interface feature list ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Interface features</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={16} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-800">Flutter mobile app</span>
            </div>
            <ul className="space-y-1.5">
              {[
                "Live dashboard — active alert with image + confidence",
                "Alert history with Today / Week / Month filters",
                "Train schedule — which trains are at risk NOW",
                "Full-screen map with device locations",
                "Analytics: trends, top-detecting devices",
                "EN / Sinhala language toggle (persisted)",
                "Emergency SOS call button",
                "Offline-capable — cached alerts without internet",
              ].map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[12px] text-gray-600">
                  <ChevronRight size={11} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-emerald-500" />
              <span className="text-sm font-semibold text-gray-800">Next.js web dashboard</span>
            </div>
            <ul className="space-y-1.5">
              {[
                "Live alert hero - image, location, device, confidence",
                "One-tap acknowledge + mark as reviewed",
                "Alert history with date filtering and CSV export",
                "Alert detail - embedded map, train risk assessment",
                "Device map - Sri Lanka railway zones (Leaflet)",
                "Devices grid - online / offline status per node",
                "Train schedule - high-risk trains near corridor",
                "Analytics - detection trends and confidence stats",
              ].map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[12px] text-gray-600">
                  <ChevronRight size={11} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── 12. Corridor callout ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1.5">
              High-risk elephant corridor - Palugaswewa section
            </p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Initial deployment targets Palugaswewa Railway Section (8.0475°N, 80.6932°E).
              Device{" "}
              <code className="text-[11px] bg-amber-100 px-1 rounded">RW-001</code> monitors
              this section. Train #6080 Meenagaya and Train #6076 Pulathisi pass through in the
              small hours - peak danger window - and are flagged as Very High risk.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
