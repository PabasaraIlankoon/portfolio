"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Radio,
  Github,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  ZoomIn,
  Camera,
  Smartphone,
  Globe,
  Activity,
  Waves,
} from "lucide-react";

const WEB_IMAGES = [
  { src: "/images/ASK Modulation.png",       caption: "ASK modulation — waveform & constellation" },
  { src: "/images/OFDM Modulation.png",      caption: "OFDM modulation — multi-carrier view" },
  { src: "/images/Performance Analysis.png", caption: "BER vs SNR performance analysis" },
];


function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">
      {children}
    </p>
  );
}

function SafeImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-300 gap-1 absolute inset-0">
        <Camera size={20} />
        <span className="text-[9px] font-mono text-center px-2 leading-tight opacity-60">
          {src.split("/").pop()}
        </span>
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill className="object-contain bg-gray-50" onError={() => setError(true)} />
  );
}

function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <X size={18} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-3 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronLeft size={20} />
      </button>
      <div className="relative w-[88vw] max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index].src} alt={images[index].caption} fill className="object-contain" />
      </div>
      <p className="mt-4 text-white/70 text-sm font-medium text-center px-6">{images[index].caption}</p>
      <p className="mt-1 text-white/30 text-xs font-mono">{index + 1} / {images.length}</p>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-3 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function AppleGallery({ images, aspect = "aspect-video" }: { images: { src: string; caption: string }[]; aspect?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className={`relative w-full ${aspect} rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-300`}>
        <Camera size={22} />
        <span className="text-[11px] font-mono text-gray-400">Add screenshots here</span>
      </div>
    );
  }

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      {lightboxOpen && (
        <Lightbox images={images} index={activeIndex} onClose={() => setLightboxOpen(false)} onPrev={prev} onNext={next} />
      )}
      <div className="relative group">
        <button
          onClick={() => setLightboxOpen(true)}
          className={`relative w-full ${aspect} rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 cursor-zoom-in block`}
        >
          <SafeImage src={images[activeIndex].src} alt={images[activeIndex].caption} />
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={13} className="text-white" />
          </div>
        </button>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronRight size={18} />
            </button>
          </>
        )}
        <div className="mt-2.5 flex items-center justify-between px-1">
          <p className="text-[12px] text-gray-500 font-medium">{images[activeIndex].caption}</p>
          <p className="text-[11px] text-gray-300 font-mono">{activeIndex + 1}/{images.length}</p>
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-sky-500 ring-1 ring-sky-300" : "border-gray-200 opacity-60 hover:opacity-90"}`}
            >
              <SafeImage src={img.src} alt={img.caption} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function MetricCard({ value, label, sub, accent = false }: { value: string; label: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 text-center ${accent ? "bg-sky-50 border-sky-200" : "bg-white border-gray-200"}`}>
      <div className={`text-2xl font-bold font-mono mb-0.5 ${accent ? "text-sky-700" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>}
    </div>
  );
}

function ModulationTable() {
  const rows = [
    { scheme: "ASK",    module: "ask.py",   idea: "Amplitude shift keying — binary 0/1 mapped to two amplitudes" },
    { scheme: "QPSK",   module: "qpsk.py",  idea: "4 phase states, 2 bits per symbol" },
    { scheme: "16-QAM", module: "qam.py",   idea: "Combined amplitude + phase, 4 bits per symbol" },
    { scheme: "OFDM",   module: "ofdm.py",  idea: "Multi-carrier — data split across orthogonal sub-carriers" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Scheme", "Module", "Core idea"].map((h) => (
              <th key={h} className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 font-mono text-[12px] font-semibold text-sky-700">{r.scheme}</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-gray-500">{r.module}</td>
              <td className="py-2.5 text-[12px] text-gray-600">{r.idea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArchitectureBlock() {
  return (
    <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] text-gray-300 leading-relaxed overflow-x-auto">
      <div className="text-gray-600 mb-1">// Repository structure</div>
      <div><span className="text-sky-400">ask.py · qpsk.py · qam.py · ofdm.py</span>  — modulation modules</div>
      <div><span className="text-emerald-400">channel.py</span>            — AWGN noise model</div>
      <div><span className="text-amber-400">ber.py</span>                 — BER vs SNR sweep</div>
      <div><span className="text-violet-400">plot_utils.py · eye_diagram.py</span> — Plotly / Matplotlib rendering</div>
      <div><span className="text-gray-400">web_app/</span>               — Flask app (routes + templates)</div>
      <div><span className="text-gray-400">main_mobile.py · buildozer.spec</span> — Kivy Android build</div>
    </div>
  );
}

const HIGHLIGHTS = [
  {
    icon: <Waves size={18} className="text-sky-500" />,
    title: "Four modulation schemes, one consistent interface",
    body: "ASK, QPSK, 16-QAM, and OFDM each live in their own module with a shared function signature, so the Flask routes and the BER sweep can call any scheme interchangeably.",
  },
  {
    icon: <Activity size={18} className="text-emerald-500" />,
    title: "Real-time BER vs SNR sweeps",
    body: "The ber.py module runs each scheme across a configurable SNR range and streams the resulting curve to the browser using SciPy for the numerical work.",
  },
  {
    icon: <Radio size={18} className="text-amber-500" />,
    title: "AWGN channel model with adjustable noise",
    body: "channel.py injects additive white Gaussian noise at a chosen SNR, letting users see exactly how each modulation scheme behaves as conditions degrade.",
  },
  {
    icon: <Globe size={18} className="text-violet-500" />,
    title: "Fully interactive Plotly visualisations",
    body: "Waveforms, constellation diagrams, eye diagrams, and power spectral density plots are all rendered with Plotly — zoomable, pannable, and exportable straight from the browser.",
  },
  
];

export function DigitalCommDetail() {
  return (
    <div className="space-y-8">

      {/* ── 1. Problem statement ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The motivation</SectionLabel>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem] mb-4">
          Digital communications coursework usually means a MATLAB licence,
          a desktop-only toolbox, and plots that are hard to share. This
          project asks a simpler question: what if the whole lab ran in a
          browser tab instead?
        </p>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
          The simulator lets a student or researcher pick a modulation
          scheme, set a noise level, and immediately see the waveform,
          the constellation, and the resulting bit error rate - no
          installation beyond Python and a browser.
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { stat: "4",  label: "Modulation schemes",    sub: "ASK · QPSK · 16-QAM · OFDM" },
            { stat: "2",  label: "Delivery modes",         sub: "Flask web app + Kivy Android app" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-sky-50 border border-sky-100 p-4">
              <div className="text-xl font-bold text-sky-700 font-mono">{s.stat}</div>
              <div className="text-xs font-semibold text-sky-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-sky-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>


      
      {/* ── 4. Modulation schemes ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Modulation schemes</SectionLabel>
        <ModulationTable />
      </div>

      {/* ── 5. Web app screenshots ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Web app — live simulation views</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          ASK modulation, OFDM multi-carrier view, and the BER vs SNR
          performance analysis screen, all rendered with Plotly.
        </p>
        <AppleGallery images={WEB_IMAGES} aspect="aspect-[16/9]" />
      </div>

      {/* ── 6. Performance metrics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>What the simulator measures</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "ASK / QPSK",  label: "Baseline schemes",    sub: "binary & quadrature",     accent: true },
            { value: "16-QAM",      label: "Higher-order scheme",  sub: "4 bits / symbol" },
            { value: "OFDM",        label: "Multi-carrier",        sub: "sub-carrier allocation",  accent: true },
            { value: "AWGN",        label: "Channel model",        sub: "configurable SNR" },
            { value: "BER vs SNR",  label: "Performance curve",    sub: "SciPy-driven sweep",      accent: true },
            { value: "PSD",         label: "Spectral view",        sub: "power spectral density" },
            { value: "Eye diagram", label: "Timing view",          sub: "symbol-timing visual",    accent: true },
            { value: "APK",         label: "Android build",        sub: "Buildozer pipeline" },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── 7. Feature highlights ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>What makes this useful</SectionLabel>
        <div className="space-y-5">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                {h.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{h.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}