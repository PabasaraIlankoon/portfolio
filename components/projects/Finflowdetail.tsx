"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Smartphone,
  ShieldCheck,
  Mic,
  Github,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Camera,
  KeyRound,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// Repository
// ─────────────────────────────────────────────────────────────────────
const REPO = {
  label: "FinFlow",
  desc: "Flutter app + Node.js backend + WSO2 API Manager config",
  url: "https://github.com/PabasaraIlankoon/FinFlow",
  color: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
  dot: "bg-emerald-400",
};

// ─────────────────────────────────────────────────────────────────────
// 📱 APP SCREENSHOTS — mapped from /public/images/appN.jpg
// ─────────────────────────────────────────────────────────────────────
const APP_IMAGES = [
  { src: "/images/app1.jpg", caption: "Home dashboard — balance, income/expense, spending by category" },
  { src: "/images/app2.jpg", caption: "Add transaction — manual or voice entry, inline budget, split with friends" },
  { src: "/images/app3.jpg", caption: "Transaction history — full chronological log" },
  { src: "/images/app4.jpg", caption: "Budgets — per-category progress tracking" },
  { src: "/images/app5.jpg", caption: "Reports — income vs. expense and category breakdown" },
  { src: "/images/app6.jpg", caption: "Create split bill — divide a shared expense across friends" },
  { src: "/images/app7.jpg", caption: "Split bills overview — per-person share calculated automatically" },
  { src: "/images/app8.jpg", caption: "Set monthly budget — quick creation from any category" },
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

  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}

      <div className="max-w-md mx-auto">
        <div className="relative group">
          <button
            onClick={() => setLightboxOpen(true)}
            className={`relative w-full ${aspect} rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 cursor-zoom-in block`}
          >
            <SafeImage
              src={images[activeIndex].src}
              alt={images[activeIndex].caption}
            />
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={13} className="text-white" />
            </div>
          </button>

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

        <div className="mt-2.5 flex items-center justify-between px-1">
          <p className="text-[12px] text-gray-500 font-medium">
            {images[activeIndex].caption}
          </p>
          <p className="text-[11px] text-gray-300 font-mono">
            {activeIndex + 1}/{images.length}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              i === activeIndex
                ? "border-emerald-500 ring-1 ring-emerald-300"
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
        accent ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`text-2xl font-bold font-mono mb-0.5 ${
          accent ? "text-emerald-700" : "text-gray-900"
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
// Auth flow steps
// ─────────────────────────────────────────────
function AuthFlowSteps() {
  const steps = [
    { n: "01", title: "Login", body: "Flutter app sends username/password to WSO2's OAuth2 token endpoint." },
    { n: "02", title: "Token issued", body: "WSO2 validates credentials and returns an access + refresh token." },
    { n: "03", title: "Gatewayed request", body: "Every API call carries the token to the WSO2 gateway, not the backend directly." },
    { n: "04", title: "Validated & proxied", body: "WSO2 checks the token, subscription and throttling, then forwards to Node.js." },
    { n: "05", title: "Backend responds", body: "Express processes the request and the response flows back through WSO2." },
  ];
  return (
    <div className="grid sm:grid-cols-5 gap-3">
      {steps.map((s) => (
        <div key={s.n} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-[11px] font-mono text-emerald-600 font-bold mb-1">{s.n}</div>
          <p className="text-xs font-semibold text-gray-800 mb-1">{s.title}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

const HIGHLIGHTS = [
  { icon: "🔐", title: "Real OAuth2 authentication, not a mock login", body: "Every login goes through WSO2's actual token endpoint. Wrong credentials are rejected by WSO2 itself before the backend ever sees the request." },
  { icon: "🛡️", title: "The gateway is the security boundary", body: "WSO2 API Manager validates tokens, enforces subscription and throttling policies, and blocks unauthenticated traffic — authentication is never the backend's problem." },
  { icon: "🎙️", title: "Voice-first transaction entry", body: "On-device speech-to-text parses natural phrases like \"I spent 500 on groceries,\" matches the category, logs the transaction, and speaks a confirmation back via text-to-speech." },
  { icon: "🤝", title: "Bill splitting for shared expenses", body: "Create a split bill, add any number of friends, and FinFlow calculates each person's share automatically." },
  { icon: "📊", title: "Budgets that actually track spending", body: "Set a monthly limit per category and watch a live progress bar update as transactions come in, with overspend warnings." },
  { icon: "⚙️", title: "Zero native build tooling on the backend", body: "The datastore is a dependency-free JSON file store — no C++ compiler, no native modules, runs anywhere Node.js does." },
];

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export function FinFlowDetail() {
  return (
    <div className="space-y-8">
      {/* ── 1. Problem statement ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The problem</SectionLabel>
        <div className="space-y-4">
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            Most personal finance app tutorials stop at a Flutter UI talking directly to a bare backend —
            fine for a demo, but it leaves every security concern (who&apos;s logged in, what they&apos;re
            allowed to call, how often) baked into application code instead of handled by dedicated
            infrastructure.
          </p>
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            FinFlow was built to do it the way a production system would: WSO2 API Manager sits in front
            of the backend as a real API gateway, issuing OAuth2 tokens, enforcing subscriptions and
            throttling, and rejecting bad requests before they ever reach the application server — while
            the app itself stays fast, voice-enabled, and genuinely useful for everyday budgeting.
          </p>
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { stat: "100%", label: "requests gatewayed", sub: "via WSO2 OAuth2" },
            { stat: "0", label: "native build deps", sub: "on the backend" },
            { stat: "8", label: "core screens", sub: "dashboard → reports" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <div className="text-xl font-bold text-emerald-700 font-mono">{s.stat}</div>
              <div className="text-xs font-semibold text-emerald-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-emerald-500 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Repository ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Repository</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Flutter app, Node.js/Express backend, and the full WSO2 API Manager setup guide live in a single repo.
        </p>
        <a
          href={REPO.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between gap-3 rounded-xl border p-4 transition-colors max-w-sm ${REPO.color}`}
        >
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${REPO.dot}`} />
            <Github size={16} />
            <div>
              <p className="text-[12px] font-mono font-bold leading-tight">{REPO.label}</p>
              <p className="text-[11px] opacity-70 mt-0.5">{REPO.desc}</p>
            </div>
          </div>
          <ExternalLink size={13} className="opacity-50 flex-shrink-0" />
        </a>
      </div>

      {/* ── 3. Architecture ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Architecture</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          WSO2 API Manager sits between the mobile app and the backend as the authentication and traffic
          checkpoint — the backend never has to trust a request on its own word.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {[
            { icon: <Smartphone size={16} />, title: "Flutter App", sub: "UI, voice I/O, secure token storage" },
            { icon: <KeyRound size={16} />, title: "WSO2 API Manager", sub: "OAuth2, throttling, gatewaying", accent: true },
            { icon: <ShieldCheck size={16} />, title: "Node.js Backend", sub: "Accounts, transactions, budgets" },
          ].map((b, i) => (
            <div key={i} className="flex items-center flex-1 gap-3">
              <div
                className={`flex-1 rounded-xl border p-4 ${
                  b.accent ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={b.accent ? "text-emerald-600" : "text-gray-400"}>{b.icon}</span>
                  <span className="text-xs font-bold text-gray-800">{b.title}</span>
                </div>
                <p className="text-[11px] text-gray-500">{b.sub}</p>
              </div>
              {i < 2 && (
                <ChevronRight size={16} className="text-gray-300 hidden sm:block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Auth flow ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Authentication flow</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          What happens between opening the app and seeing the dashboard.
        </p>
        <AuthFlowSteps />
      </div>

      {/* ── 5. Performance / build metrics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>At a glance</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "OAuth2", label: "Auth protocol", sub: "Password grant", accent: true },
            { value: "8", label: "App screens", sub: "dashboard → split bills" },
            { value: "14", label: "REST endpoints", sub: "accounts → budgets", accent: true },
            { value: "0", label: "Native deps", sub: "backend datastore" },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── 6. App screenshots ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Flutter mobile app</SectionLabel>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone size={14} className="text-emerald-500" />
          <span className="text-sm font-semibold text-gray-800">Android &amp; iOS</span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full">
            FinFlow
          </span>
          <a
            href={REPO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Github size={12} />
            GitHub
          </a>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Dashboard, voice-enabled transaction entry, budgets, reports, and bill splitting — all secured
          behind WSO2 API Manager.
        </p>
        <div className="max-w-[260px] mx-auto">
          <AppleGallery images={APP_IMAGES} aspect="aspect-[9/16]" />
        </div>
      </div>

      {/* ── 7. What makes this work ── */}
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

      {/* ── 8. Feature list ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Feature breakdown</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={16} className="text-emerald-500" />
              <span className="text-sm font-semibold text-gray-800">Core finance features</span>
            </div>
            <ul className="space-y-1.5">
              {[
                "Multi-account tracking (cash, bank, card, savings)",
                "Auto-seeded, customisable income/expense categories",
                "Dashboard with gradient balance card + donut chart",
                "Per-category monthly budgets with progress bars",
                "Income vs. expense reports and category breakdown",
                "Bill splitting — divide shared costs across friends",
                "Swipe-to-delete transaction history",
              ].map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[12px] text-gray-600">
                  <ChevronRight size={11} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-sm font-semibold text-gray-800">Security &amp; infrastructure</span>
            </div>
            <ul className="space-y-1.5">
              {[
                "OAuth2 Password grant against WSO2's token endpoint",
                "WSO2 gateway rejects unauthenticated traffic before the backend",
                "Subscription & throttling policies enforced at the gateway",
                "Auto token refresh on expiry from the Flutter app",
                "Secure on-device token storage (flutter_secure_storage)",
                "Dependency-free JSON datastore — zero native build tooling",
                "Documented, reusable WSO2 setup guide for future projects",
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

      {/* ── 9. Voice assistant callout ── */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <Mic size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-emerald-800 mb-1.5">
              Voice-first transaction entry
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Tap the mic and say something like{" "}
              <code className="text-[11px] bg-emerald-100 px-1 rounded">
                &quot;I spent 500 on groceries&quot;
              </code>{" "}
              — on-device speech recognition parses the amount and category, logs the transaction, and
              speaks a confirmation back through text-to-speech. No typing required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
