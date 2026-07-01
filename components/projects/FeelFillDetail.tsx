"use client";

import { useState } from "react";
import {
  Volume2,
  Vibrate,
  Radar,
  Cpu,
  BatteryCharging,
  Ruler,
  DollarSign,
  Accessibility,
} from "lucide-react";

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
// Stat strip
// ─────────────────────────────────────────────
const STATS = [
  { value: "4",        label: "Fill Levels" },
  { value: "~5 mL",    label: "Resolution" },
  { value: "≥8 hr",    label: "Battery" },
  { value: "50–100mm", label: "Cup Fit" },
  { value: "<8k LKR",  label: "Unit Cost" },
  { value: "0–60°C",   label: "Temp Range" },
];

function StatStrip() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {STATS.map((s, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-3.5 text-center">
          <div className="text-lg font-bold font-mono text-indigo-700">{s.value}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// About this project - numbered paragraphs
// ─────────────────────────────────────────────
const ABOUT_PARAS = [
  "Globally, an estimated 285 million people live with visual impairment, of whom 39 million are fully blind. Among the most persistent challenges these individuals face are routine household tasks - such as measuring liquids accurately during cooking, medicine preparation, or beverage making. The absence of a visual reference forces reliance on another person or risking dangerous measurement errors.",
  "FeelFill is a low-cost, non-contact, capacitive liquid-level sensing device that provides real-time multi-modal feedback through voice announcements and haptic vibration to guide a visually impaired user to pour the exact required volume. The device is self-contained, battery-powered, and designed to clip onto any standard cup, making it universally applicable and affordable.",
  "Developed through the Design Thinking framework - grounded in a specific persona (Chamari Perera, 34, a fully blind home-maker from Galle) and validated by empathy research - the design satisfies all six stated design criteria: no visual display, non-contact sensing, universal cup fit, battery operation, under 8,000 LKR unit cost, and no smartphone or digital literacy required.",
];

// ─────────────────────────────────────────────
// Key Features - icon grid
// ─────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Volume2 size={18} />,
    title: "Voice Feedback at 4 Levels",
    body: "DFPlayer Mini + 8Ω speaker announces fill levels at 25%, 50%, 75%, and 100% - giving real-time audio guidance throughout the pour.",
  },
  {
    icon: <Vibrate size={18} />,
    title: "Haptic Near-Full Warning",
    body: "Vibration motor fires at 95% capacity - giving the user time to stop pouring before overflow, even in noisy kitchen environments.",
  },
  {
    icon: <Radar size={18} />,
    title: "Non-Contact Capacitive Sensing",
    body: "External copper-tape electrode strip detects liquid level through the cup wall - no liquid contact required, fully hygienic and safe with hot liquids.",
  },
  {
    icon: <Cpu size={18} />,
    title: "ESP32 + DFPlayer Architecture",
    body: "ESP32 microcontroller reads capacitive ADC, applies threshold logic, and drives the DFPlayer Mini voice module and vibration motor through UART and GPIO.",
  },
  {
    icon: <BatteryCharging size={18} />,
    title: "8+ Hour Battery Life",
    body: "18650 Li-ion 3.7V / 3000 mAh cell with USB-C charging via TP4056. Deep-sleep between pours reduces idle current to under 1 mA.",
  },
  {
    icon: <Ruler size={18} />,
    title: "Universal Cup Fit",
    body: "Adjustable silicone sleeve fits cups from 50mm to 100mm outer diameter. Snap-fit ABS enclosure requires no tools for attachment.",
  },
  {
    icon: <DollarSign size={18} />,
    title: "Affordable - Under 8,000 LKR",
    body: "Full BOM cost estimated at 5,100–7,800 LKR per unit. Target batch production cost drops to ~2,500 LKR at 500 units.",
  },
  {
    icon: <Accessibility size={18} />,
    title: "Inclusive Design",
    body: "No screen, no smartphone, no literacy required. Single Start button operation. Non-stigmatising, neutral clip-on form for public and home use.",
  },
];

// ─────────────────────────────────────────────
// System architecture - code-style block
// ─────────────────────────────────────────────
function ArchitectureDiagram() {
  return (
    <div className="font-mono text-[11.5px] bg-gray-950 text-gray-300 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-800 text-[10px] text-gray-500 tracking-widest uppercase">
        Signal path
      </div>
      <div className="p-4 space-y-1.5 leading-relaxed overflow-x-auto">
        <div><span className="text-indigo-400">Liquid rises</span> → dielectric field changes at copper-tape electrode</div>
        <div><span className="text-indigo-400">Capacitive sensor</span> → output voltage rises</div>
        <div><span className="text-emerald-400">ESP32 ADC</span> (GPIO 34, 12-bit) → reads voltage every 200ms</div>
        <div><span className="text-amber-400">Firmware</span> → maps voltage → fill percentage</div>
        <div><span className="text-violet-400">Threshold check</span> → 25% / 50% / 75% / 95% / 100%</div>
        <div><span className="text-indigo-400">UART → DFPlayer Mini</span> → voice clip playback</div>
        <div><span className="text-amber-400">GPIO 27 → vibration motor</span> → haptic alert</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Fill feedback table
// ─────────────────────────────────────────────
function FeedbackTable() {
  const rows = [
    { level: "25%",  icon: "🔊", label: "Voice", detail: '"Quarter full"' },
    { level: "50%",  icon: "🔊", label: "Voice", detail: '"Half full"' },
    { level: "75%",  icon: "🔊", label: "Voice", detail: '"Three quarters"' },
    { level: "95%",  icon: "📳", label: "Vibration", detail: "Near-full warning" },
    { level: "100%", icon: "🔊📳", label: "Voice + Vibration", detail: '"Full"' },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Level</th>
            <th className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Feedback</th>
            <th className="text-left py-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Detail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-indigo-700">{r.level}</td>
              <td className="py-2.5 pr-4 text-gray-600 text-[12px]">{r.icon} {r.label}</td>
              <td className="py-2.5 text-gray-400 text-[12px] font-mono">{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// Circuit design reference
// ─────────────────────────────────────────────
function CircuitDesign() {
  return (
    <div className="rounded-xl bg-gray-950 p-4 font-mono text-[11px] text-gray-400 leading-relaxed overflow-x-auto">
      <div className="text-gray-600 mb-2">// GPIO wiring reference</div>
      <div><span className="text-indigo-400">GPIO 34 (ADC1_CH6)</span> ← Capacitive sensor OUT &nbsp;·&nbsp; sensor VCC → 3.3V</div>
      <div><span className="text-emerald-400">GPIO 25 / 26 (UART2)</span> ↔ DFPlayer Mini TX/RX &nbsp;·&nbsp; DFPlayer 5V supply</div>
      <div><span className="text-amber-400">GPIO 27</span> → 1kΩ base resistor → 2N2222 NPN → vibration motor</div>
      <div><span className="text-violet-400">GPIO 32 / 33 / 35</span> → Start / Reset / Mode buttons (internal pull-ups)</div>
      <div className="mt-2 text-gray-600">// Power rail</div>
      <div>18650 Li-ion → TP4056 → 5V boost converter → 3.3V LDO → ESP32</div>
      <div className="mt-2 text-yellow-600">⚠ Sealed ABS enclosure provides IPX4 splash resistance. Firmware includes watchdog recovery and audio-alerted sensor fault detection.</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export function FeelFillDetail() {
  const [activeTab, setActiveTab] = useState("architecture");

  const tabs = [
    { id: "architecture", label: "System architecture" },
    { id: "feedback",     label: "Fill feedback" },
    { id: "circuit",      label: "Circuit design" },
  ];

  return (
    <div className="space-y-8">

      {/* ── Quote ── */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
        <p className="text-indigo-800 text-base leading-relaxed italic">
          "Restoring kitchen independence for 39 million blind individuals - one accurate pour at a time."
        </p>
      </div>

      {/* ── Stat strip ── */}
      <StatStrip />

      {/* ── About this project ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>About this project</SectionLabel>
        <div className="space-y-5">
          {ABOUT_PARAS.map((para, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-[11px] font-mono font-bold text-indigo-300 flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-gray-600 leading-[1.8] text-[0.97rem]">{para}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Key Features ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Key Features</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{f.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Technical detail tabs ── */}
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
          {activeTab === "architecture" && (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Liquid level changes are sensed capacitively and converted into voice + haptic feedback
                through the ESP32's ADC and threshold logic.
              </p>
              <ArchitectureDiagram />
            </>
          )}
          {activeTab === "feedback" && (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Five fill thresholds trigger distinct audio and/or haptic responses as the cup fills.
              </p>
              <FeedbackTable />
            </>
          )}
          {activeTab === "circuit" && (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Full GPIO mapping and power rail for the ESP32, DFPlayer Mini, vibration motor, and
                control buttons.
              </p>
              <CircuitDesign />
            </>
          )}
        </div>
      </div>

      {/* ── Design for Manufacture & Sustainability ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Design for Manufacture &amp; Sustainability</SectionLabel>
        <div className="space-y-4">
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            <span className="font-semibold text-gray-800">Manufacturability:</span> a single two-layer PCB
            (100mm × 60mm) with SMD components and a copper-tape electrode needs no specialist tooling.
          </p>
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            <span className="font-semibold text-gray-800">Assembly:</span> a snap-fit ABS shell with no
            screws and an adjustable silicone band fits any cup in under 3 minutes.
          </p>
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            <span className="font-semibold text-gray-800">Cost:</span> first prototype 5,100–7,800 LKR;
            a batch of 500 units targets roughly 2,500 LKR unit cost.
          </p>
          <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
            <span className="font-semibold text-gray-800">Reliability &amp; sustainability:</span>
            non-contact sensing eliminates corrosion, giving an MTBF above 100,000 cycles, with
            firmware updatable via USB. The ABS/recycled-PLA, RoHS-compliant enclosure includes a
            deep-sleep idle mode.
          </p>
        </div>
      </div>

    </div>
  );
}
