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
  Wifi,
  WifiOff,
} from "lucide-react";

// ─────────────────────────────────────────────
// Image galleries — replace src paths with your actual photos
// ─────────────────────────────────────────────
const HARDWARE_IMAGES = [
  { src: "/images/lankamesh.jpg",        caption: "LankaMesh node - assembled hardware" },
  { src: "/images/lankamesh-detail.jpg", caption: "LankaMesh system - full setup" },
];

const APP_IMAGES = [
  { src: "/images/lankamesh-mobile.jpg", caption: "Mobile app - messages & status" },
  { src: "/images/lankamesh-sos.jpg",    caption: "SOS emergency screen" },
];

// GitHub repo
const REPO = {
  label: "pvillankoon/lankamesh",
  url:   "https://github.com/SanchilaAmavi/LankaMesh",
};

// ─────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">
      {children}
    </p>
  );
}

function SafeImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-300 gap-1 ${className}`}>
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

function AppleGallery({ images, aspect = "aspect-video" }: { images: { src: string; caption: string }[]; aspect?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-orange-500 ring-1 ring-orange-300" : "border-gray-200 opacity-60 hover:opacity-90"}`}
          >
            <SafeImage src={img.src} alt={img.caption} />
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 font-mono mt-1.5">Click thumbnail to switch · click main image to fullscreen</p>
    </>
  );
}

function MetricCard({ value, label, sub, accent = false }: { value: string; label: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 text-center ${accent ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200"}`}>
      <div className={`text-2xl font-bold font-mono mb-0.5 ${accent ? "text-orange-700" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>}
    </div>
  );
}

function WiringTable() {
  const rows = [
    { from: "GPIO 5  (NSS)",  to: "LoRa NSS/CS",   bus: "SPI" },
    { from: "GPIO 14 (RST)",  to: "LoRa RESET",     bus: "SPI" },
    { from: "GPIO 26 (DIO0)", to: "LoRa IRQ",       bus: "SPI" },
    { from: "GPIO 18 (SCK)",  to: "LoRa SCK",       bus: "SPI" },
    { from: "GPIO 23 (MOSI)", to: "LoRa MOSI",      bus: "SPI" },
    { from: "GPIO 19 (MISO)", to: "LoRa MISO",      bus: "SPI" },
    { from: "GPIO 16 (RX2)",  to: "GPS TX",         bus: "UART2" },
    { from: "GPIO 17 (TX2)",  to: "GPS RX",         bus: "UART2" },
    { from: "GPIO 21 (SDA)",  to: "OLED SDA",       bus: "I²C" },
    { from: "GPIO 22 (SCL)",  to: "OLED SCL",       bus: "I²C" },
    { from: "GPIO 4",         to: "DHT22 DATA",     bus: "1-Wire" },
    { from: "GPIO 48",        to: "NeoPixel DIN",   bus: "Digital" },
    { from: "GPIO 0",         to: "SOS Button (↓)", bus: "Digital" },
    { from: "USB-C",          to: "Flutter App",    bus: "CDC 115200" },
  ];
  const busColor: Record<string, string> = {
    "SPI":        "text-indigo-600 bg-indigo-50",
    "UART2":      "text-emerald-600 bg-emerald-50",
    "I²C":        "text-violet-600 bg-violet-50",
    "1-Wire":     "text-amber-600 bg-amber-50",
    "Digital":    "text-gray-600 bg-gray-100",
    "CDC 115200": "text-orange-600 bg-orange-50",
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["ESP32-S3 Pin", "Connected to", "Bus"].map(h => (
              <th key={h} className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2 pr-4 font-mono text-[12px] text-orange-700">{r.from}</td>
              <td className="py-2 pr-4 text-gray-600 text-[12px]">{r.to}</td>
              <td className="py-2">
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${busColor[r.bus] ?? "text-gray-600 bg-gray-100"}`}>
                  {r.bus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BOMTable() {
  const rows = [
    { component: "ESP32-S3 N16R8",                 qty: 3, unit: 1500, total: 4500 },
    { component: "LoRa SX1278 RA-02 (433 MHz)",    qty: 3, unit: 1450, total: 4350 },
    { component: "GPS NEO-6M (GPS6MV2)",            qty: 3, unit: 800,  total: 2400 },
    { component: "DHT22 Temp/Humidity Sensor",      qty: 3, unit: 220,  total: 660  },
    { component: "SSD1306 OLED 0.96\" I2C",        qty: 3, unit: 400,  total: 1200 },
    { component: "NeoPixel, buttons, wires, misc",  qty: 3, unit: 300,  total: 900  },
    { component: "Custom PCB (EasyEDA)",            qty: 3, unit: 400,  total: 1200 },
    { component: "Waterproof ABS Enclosure",        qty: 3, unit: 1800, total: 5400 },
  ];
  const grandTotal = rows.reduce((s, r) => s + r.total, 0);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Component", "Qty", "Unit (LKR)", "Total (LKR)"].map(h => (
              <th key={h} className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 text-[12px] text-gray-700">{r.component}</td>
              <td className="py-2.5 pr-4 text-[12px] text-gray-500">{r.qty}</td>
              <td className="py-2.5 pr-4 text-[12px] text-gray-500 font-mono">{r.unit.toLocaleString()}</td>
              <td className="py-2.5 text-[12px] font-mono font-semibold text-gray-700">{r.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-300 bg-orange-50">
            <td colSpan={3} className="py-2.5 pr-4 text-[12px] font-semibold text-gray-700">Total (3-node system)</td>
            <td className="py-2.5 text-[13px] font-bold font-mono text-orange-700">
              Rs. {grandTotal.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function ProtocolBlock() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-mono text-gray-400 mb-2 uppercase tracking-widest">Flutter → Node (Commands)</p>
        <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] text-gray-300 space-y-2 overflow-x-auto">
          <div><span className="text-gray-600">// Send categorised message</span></div>
          <div>{`{ `}<span className="text-indigo-400">"cmd"</span>{`: "SEND_TEXT", `}<span className="text-indigo-400">"to"</span>{`: "BROADCAST",`}</div>
          <div>&nbsp; <span className="text-indigo-400">"msg"</span>{`: "Need medical supplies", `}<span className="text-indigo-400">"category"</span>{`: "Medical" }`}</div>
          <div className="mt-2"><span className="text-gray-600">// SOS broadcast</span></div>
          <div>{`{ `}<span className="text-indigo-400">"cmd"</span>{`: "SEND_SOS" }`}</div>
          <div className="mt-2"><span className="text-gray-600">// Poll node status</span></div>
          <div>{`{ `}<span className="text-indigo-400">"cmd"</span>{`: "GET_STATUS" }`}</div>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-mono text-gray-400 mb-2 uppercase tracking-widest">Node → Flutter (Events)</p>
        <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] text-gray-300 space-y-1 overflow-x-auto">
          <div><span className="text-gray-600">// Incoming LoRa packet</span></div>
          <div>{`{ `}<span className="text-amber-400">"event"</span>{`: "RX", `}<span className="text-amber-400">"type"</span>{`: "SOS", `}<span className="text-amber-400">"from"</span>{`: "NODE-002",`}</div>
          <div>&nbsp; <span className="text-amber-400">"rssi"</span>{`: -87, `}<span className="text-amber-400">"data"</span>{`: { "msg": "SOS!", "lat": 7.29, "lon": 80.63 } }`}</div>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Infrastructure-free", lankamesh: true,   gotenna: true,    beartooth: true,  garmin: "Satellite" },
    { feature: "Cost per node",       lankamesh: "~$20", gotenna: "~$180", beartooth: "~$250", garmin: "~$350 + sub" },
    { feature: "Range",               lankamesh: "5 km", gotenna: "6.4 km", beartooth: "3 km", garmin: "Global" },
    { feature: "Multi-hop mesh",      lankamesh: true,   gotenna: true,    beartooth: false, garmin: false },
    { feature: "GPS sharing",         lankamesh: true,   gotenna: true,    beartooth: true,  garmin: true  },
    { feature: "Open-source",         lankamesh: true,   gotenna: false,   beartooth: false, garmin: false },
    { feature: "Custom categories",   lankamesh: true,   gotenna: false,   beartooth: false, garmin: "Limited" },
  ];
  const cell = (v: boolean | string) => {
    if (v === true)  return <span className="text-emerald-600 font-semibold">✓</span>;
    if (v === false) return <span className="text-gray-300">—</span>;
    return <span className="text-[12px] text-gray-600">{v}</span>;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Feature", "LankaMesh", "goTenna", "Beartooth MK2", "Garmin inReach"].map((h, i) => (
              <th key={h} className={`text-left py-2 pr-4 text-[11px] font-mono font-semibold uppercase tracking-wide ${i === 1 ? "text-orange-500" : "text-gray-400"}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 text-[12px] font-medium text-gray-700">{r.feature}</td>
              <td className="py-2.5 pr-4 bg-orange-50/50">{cell(r.lankamesh)}</td>
              <td className="py-2.5 pr-4">{cell(r.gotenna)}</td>
              <td className="py-2.5 pr-4">{cell(r.beartooth)}</td>
              <td className="py-2.5">{cell(r.garmin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          When disasters strike Sri Lanka — floods, landslides, cyclones — the first infrastructure to
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

      {/* ── 2. Repository ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Repository</SectionLabel>
        <a
          href={REPO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <Github size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-mono font-semibold text-gray-800">{REPO.label}</p>
              <p className="text-[11px] text-gray-400">Firmware · Flutter App · PCB files</p>
            </div>
          </div>
          <ExternalLink size={14} className="text-gray-400" />
        </a>
      </div>

      {/* ── 3. Hardware gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Hardware &amp; PCB</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          ESP32-S3 node with LoRa RA-02, GPS NEO-6M, SSD1306 OLED, and DHT22 mounted on a
          custom PCB inside a waterproof ABS enclosure.
        </p>
        <AppleGallery images={HARDWARE_IMAGES} aspect="aspect-[16/9]" />
      </div>

      {/* ── 4. Block diagram ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>System architecture</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Each node is both a terminal and a relay. SOS packets are flooded through the mesh;
          text messages are point-to-point with selective relay.
        </p>
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <Image
            src="/images/lankamesh/block_diagram.jpg"
            alt="LankaMesh system block diagram"
            width={1200}
            height={700}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ── 5. Flowchart ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Node operation flowchart</SectionLabel>
        <div className="max-w-[520px] mx-auto rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <Image
            src="/images/lankamesh_flow_chart.png"
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
              body: "Using Spreading Factor 10 at 433 MHz, each node achieves 5 km range in open terrain. The mesh relay means SOS packets are re-broadcast by intermediate nodes — extending total network reach well beyond any single hop.",
            },
            {
              icon: <WifiOff size={18} className="text-red-500" />,
              title: "Zero infrastructure — no internet or cellular",
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
              body: "Messages are tagged as Medical, Flood, Landslide, Fire, Evacuation, Supply Request, or Other — letting receivers triage incoming alerts by type rather than wading through unstructured text.",
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

      {/* ── 8. Flutter app gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Flutter mobile app</SectionLabel>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone size={14} className="text-orange-500" />
          <span className="text-sm font-semibold text-gray-800">Android &amp; iOS (USB CDC)</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Messages feed, SOS trigger, send dialog with category chips, OpenStreetMap node view,
          and live sensor status from the connected node.
        </p>
        <div className="max-w-[260px] mx-auto">
          <AppleGallery images={APP_IMAGES} aspect="aspect-[9/16]" />
        </div>
      </div>

      {/* ── 9. Wiring reference ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Wiring reference</SectionLabel>
        <WiringTable />
      </div>

      {/* ── 10. BOM ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Bill of materials (3-node system)</SectionLabel>
        <BOMTable />
      </div>

      {/* ── 11. Serial protocol ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Serial protocol — Flutter ↔ Node</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          All communication between the Flutter app and the ESP32-S3 node uses newline-terminated
          JSON over USB CDC at 115200 baud. No Bluetooth pairing or network setup needed.
        </p>
        <ProtocolBlock />
      </div>

      {/* ── 12. Comparison ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>vs commercial alternatives</SectionLabel>
        <ComparisonTable />
      </div>

      {/* ── 13. Problems & solutions ── */}
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

      {/* ── 14. TECHXHIBIT callout ── */}
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <div className="flex items-start gap-3">
          <Cpu size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-800 mb-1.5">
              TECHXHIBIT 2026 — Hardware &amp; IoT Track
            </p>
            <p className="text-sm text-orange-700 leading-relaxed">
              LankaMesh was presented at TECHXHIBIT 2026, KDU's undergraduate innovation showcase.
              Two fully functional nodes demonstrated reliable bidirectional communication, SOS broadcast,
              GPS coordinate sharing, and Flutter app integration live at the exhibition.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}