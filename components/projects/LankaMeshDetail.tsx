"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Radio,
  Cpu,
  MapPin,
  AlertTriangle,
  MessageSquare,
  Battery,
  Smartphone,
  Github,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  ZoomIn,
  Camera,
  WifiOff,
} from "lucide-react";

const HARDWARE_IMAGES = [
  { src: "/images/lankamesh.jpg",        caption: "LankaMesh node - assembled hardware" },
  { src: "/images/lankamesh-detail.jpg", caption: "LankaMesh system - full setup" },
];

const APP_IMAGES = [
  { src: "/images/lankamesh-mobile.jpg", caption: "Mobile app - messages & status" },
  { src: "/images/lankamesh-sos.jpg",    caption: "SOS emergency screen" },
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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-300 gap-1">
        <Camera size={20} />
        <span className="text-[9px] font-mono text-center px-2 leading-tight opacity-60">
          {src.split("/").pop()}
        </span>
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill className="object-cover" onError={() => setError(true)} />
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

function Gallery({ images, aspect = "aspect-[16/9]" }: { images: { src: string; caption: string }[]; aspect?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className={`relative w-full ${aspect} rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-300`}>
        <Camera size={20} />
      </div>
    );
  }

  return (
    <>
      {lightboxOpen && (
        <Lightbox images={images} index={activeIndex} onClose={() => setLightboxOpen(false)} onPrev={prev} onNext={next} />
      )}
      <div className="relative group">
        <button
          onClick={() => setLightboxOpen(true)}
          className={`relative w-full ${aspect} rounded-xl overflow-hidden border border-gray-200 bg-gray-100 cursor-zoom-in block`}
        >
          <SafeImage src={images[activeIndex].src} alt={images[activeIndex].caption} />
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={11} className="text-white" />
          </div>
        </button>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronLeft size={15} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronRight size={15} />
            </button>
          </>
        )}
        <div className="mt-2 flex items-center justify-between px-0.5">
          <p className="text-[11px] text-gray-500">{images[activeIndex].caption}</p>
          <p className="text-[10px] text-gray-300 font-mono">{activeIndex + 1}/{images.length}</p>
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-orange-500 ring-1 ring-orange-300" : "border-gray-200 opacity-60 hover:opacity-90"}`}
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
    <div className={`rounded-xl border p-3 text-center ${accent ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200"}`}>
      <div className={`text-xl font-bold font-mono mb-0.5 ${accent ? "text-orange-700" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>}
    </div>
  );
}

export function LankaMeshDetail() {
  return (
    <div className="space-y-8">

      {/* ── 1. Problem statement ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The problem</SectionLabel>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem] mb-4">
          When disasters strike Sri Lanka - floods, landslides, cyclones - the first infrastructure to
          collapse is communication. Cellular towers lose power, internet backhaul goes down, and
          communities are left isolated at exactly the moment they need to coordinate rescue and relief.
        </p>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
          Cyclone DITWA in 2026 highlighted this gap nationally. Existing tools are either expensive
          satellite devices (Garmin inReach, ~$350 + subscription), limited in range (walkie-talkies,
          ~2 km), or lack digital integration. There is no affordable, open, infrastructure-independent
          system for Sri Lankan disaster conditions.
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { stat: "0",    label: "Infrastructure required", sub: "no towers, no internet" },
            { stat: "5 km", label: "Range per hop",           sub: "open terrain, 433 MHz"  },
            { stat: "~$20", label: "Cost per node",           sub: "vs $180+ commercial"    },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-orange-50 border border-orange-100 p-4">
              <div className="text-xl font-bold text-orange-700 font-mono">{s.stat}</div>
              <div className="text-xs font-semibold text-orange-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-orange-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>


      {/* ── 3. Hardware gallery — compact ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Hardware &amp; PCB</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          ESP32-S3 node with LoRa RA-02, GPS NEO-6M, SSD1306 OLED, and DHT22 mounted on a
          custom PCB inside a waterproof ABS enclosure.
        </p>
        <div className="max-w-[56%] mx-auto">
          <Gallery images={HARDWARE_IMAGES} aspect="aspect-[4/3]" />
        </div>
      </div>


      {/* ── 5. Flowchart — compact ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Node operation flowchart</SectionLabel>
        <div className="max-w-[340px] mx-auto rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <Image
            src="/images/lankamesh_flowchart.jpg"
            alt="LankaMesh node operation flowchart"
            width={800}
            height={900}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ── 6. Performance metrics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Performance metrics</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "5 km",    label: "Range per hop",      sub: "open terrain, SF10",       accent: true },
            { value: "433 MHz", label: "LoRa frequency",     sub: "free ISM band" },
            { value: "SF10",    label: "Spreading factor",   sub: "~980 bps data rate",       accent: true },
            { value: "20 dBm",  label: "TX power",           sub: "max output" },
            { value: "<400 ms", label: "SOS relay latency",  sub: "flood backoff 100–400 ms", accent: true },
            { value: "5",       label: "Message categories", sub: "Medical / Flood / Fire…" },
            { value: "3 nodes", label: "Current deployment", sub: "bidirectional tested",     accent: true },
            { value: "~$20",    label: "Cost per node",      sub: "vs $180+ commercial" },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── 7. Feature highlights ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>What makes this work</SectionLabel>
        <div className="space-y-5">
          {[
            {
              icon: <Radio size={18} className="text-orange-500" />,
              title: "LoRa mesh up to 5 km per hop",
              body: "Using Spreading Factor 10 at 433 MHz, each node achieves 5 km range in open terrain. The mesh relay means SOS packets are re-broadcast by intermediate nodes - extending total network reach well beyond any single hop.",
            },
            {
              icon: <WifiOff size={18} className="text-red-500" />,
              title: "Zero infrastructure - no internet or cellular",
              body: "Nodes communicate entirely peer-to-peer over LoRa radio. There are no servers, no SIM cards, no Wi-Fi access points. The system works in the field the moment cellular towers fail.",
            },
            {
              icon: <AlertTriangle size={18} className="text-red-600" />,
              title: "One-button SOS broadcast with GPS coordinates",
              body: "The GPIO0 button triggers an immediate SOS packet containing the node's GPS coordinates, broadcast to all nodes in range. The packet is relayed by every intermediate node automatically.",
            },
            {
              icon: <MapPin size={18} className="text-blue-500" />,
              title: "Real-time GPS coordinate sharing",
              body: "Every node broadcasts its GPS position (NEO-6M) every 15 seconds. The Flutter app plots all nodes on an OpenStreetMap view, giving rescue coordinators a live picture of where every field unit is.",
            },
            {
              icon: <MessageSquare size={18} className="text-emerald-500" />,
              title: "Structured emergency message categories",
              body: "Messages are tagged as Medical, Flood, Landslide, Fire, Evacuation, Supply Request, or Other - letting receivers triage incoming alerts by type rather than wading through unstructured text.",
            },
            {
              icon: <Battery size={18} className="text-green-600" />,
              title: "Battery-backed for multi-day field operation",
              body: "The ESP32-S3 uses light-sleep between transmissions to minimise current draw. DHT22 and GPS are duty-cycled. A standard 18650 Li-ion cell powers a node for 48+ hours in the field.",
            },
            {
              icon: <Smartphone size={18} className="text-indigo-500" />,
              title: "Flutter app via USB — no Bluetooth pairing required",
              body: "The Flutter app connects over USB CDC Serial at 115200 baud. The app shows incoming messages, allows sending categorised text, triggers SOS, displays the map, and reads node sensor data.",
            },
          ].map((h, i) => (
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

      {/* ── 8. Flutter app gallery — compact ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Flutter mobile app</SectionLabel>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone size={14} className="text-orange-500" />
          <span className="text-sm font-semibold text-gray-800">Android &amp; iOS (USB CDC)</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          Messages feed, SOS trigger, send dialog with category chips, OpenStreetMap node view,
          and live sensor status from the connected node.
        </p>
        <div className="max-w-[200px] mx-auto">
          <Gallery images={APP_IMAGES} aspect="aspect-[9/16]" />
        </div>
      </div>

      {/* ── 9. Problems & solutions ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Problems encountered &amp; solutions</SectionLabel>
        <div className="space-y-4">
          {[
            { problem: "Limited range in dense terrain", solution: "Optimised to SF10 / 125 kHz; tested with 5 dBi higher-gain antennas to improve link budget." },
            { problem: "Power constraints for field deployment", solution: "ESP32-S3 light-sleep between transmissions; DHT22 and GPS duty-cycled; targeting 48+ h on a single 18650 cell." },
            { problem: "Simultaneous retransmit collisions (mesh relay)", solution: "Random 100–400 ms backoff before relay; avoids two nodes retransmitting at the same instant after receiving an SOS." },
            { problem: "Data synchronisation delays", solution: "Per-packet sequence counter and timestamp; offline queue with automatic retry on reconnect." },
            { problem: "Hardware compatibility (SPI / I²C bus conflicts)", solution: "Explicit CS pin management on SPI; LoRa and OLED on separate buses; all modules tested at 3.3 V logic." },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
              <div className="flex items-start gap-2 mb-1.5">
                <ChevronRight size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-gray-700">{item.problem}</p>
              </div>
              <div className="flex items-start gap-2 ml-4">
                <ChevronRight size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}