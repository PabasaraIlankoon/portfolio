"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Github,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  ZoomIn,
  Camera,
  Cpu,
  Gauge,
  ScanLine,
  Mountain,
  Bot,
} from "lucide-react";

// ─────────────────────────────────────────────
// CAD / chassis gallery — already uploaded
// ─────────────────────────────────────────────
const HARDWARE_IMAGES = [
  { src: "/images/chassis_solidworks.jpg",   caption: "Chassis CAD model — SolidWorks" },
  { src: "/images/chassis_photo.jpg",        caption: "Laser-cut acrylic chassis — assembled" },
  { src: "/images/mars-robot-brackets.jpg",  caption: "3D-printed arm brackets" },
];

// ─────────────────────────────────────────────
// Robot / arena / team gallery — already uploaded
// ─────────────────────────────────────────────
const ROBOT_IMAGES = [
  { src: "/images/mars-robot.jpg",        caption: "Assembled robot — full hardware stack" },
  { src: "/images/mars_robot_arena.jpg",  caption: "Competition arena — grid layout" },
  { src: "/images/mars-robot-team.jpg",   caption: "Team at the competition" },
];

// ─────────────────────────────────────────────
// PLACEHOLDER — add close-up electronics / wiring photos here
// Save to /public/images/ and update the array below:
//   mars-robot-electronics.jpg — ESP32-S3 + driver wiring close-up
//   mars-robot-competition.jpg — robot mid-run during competition
// ─────────────────────────────────────────────


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

  if (images.length === 0) {
    return (
      <div className={`relative w-full ${aspect} rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-300`}>
        <Camera size={22} />
        <span className="text-[11px] font-mono text-gray-400">Add photos here</span>
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
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-rose-500 ring-1 ring-rose-300" : "border-gray-200 opacity-60 hover:opacity-90"}`}
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
    <div className={`rounded-xl border p-4 text-center ${accent ? "bg-rose-50 border-rose-200" : "bg-white border-gray-200"}`}>
      <div className={`text-2xl font-bold font-mono mb-0.5 ${accent ? "text-rose-700" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Competition tasks table
// ─────────────────────────────────────────────
function TasksTable() {
  const rows = [
    { n: "1", task: "Plantation",        desc: "Navigate a 6×4 grid, detect green-sticker plant cells, collect yellow/white potatoes" },
    { n: "2", task: "Muddy Road & Ramp",  desc: "Avoid randomly placed white-wall obstacles, climb and descend a 20° ramp (90 cm base)" },
    { n: "3", task: "Collection & Sort",  desc: "Scan a binary barcode (3 cm = 0, 6 cm = 1), sort good/bad potatoes into red/blue baskets" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["#", "Task", "Description"].map((h) => (
              <th key={h} className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 font-mono text-[12px] font-semibold text-rose-700">{r.n}</td>
              <td className="py-2.5 pr-4 text-[12px] font-semibold text-gray-700 whitespace-nowrap">{r.task}</td>
              <td className="py-2.5 text-[12px] text-gray-600">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hardware table
// ─────────────────────────────────────────────
function HardwareTable() {
  const rows = [
    { component: "ESP32-S3",                purpose: "Main processor, PWM, I2C, interrupts" },
    { component: "TB6612FNG",                purpose: "Dual DC motor H-bridge driver" },
    { component: "TT DC motors + encoders",  purpose: "Differential drive with odometry" },
    { component: "TCS34725 (I2C)",           purpose: "Ball colour & green sticker detection" },
    { component: "8-ch reflective IR array",  purpose: "Line following & barcode reading" },
    { component: "HC-SR04 ×3",               purpose: "Front / left / right obstacle sensing" },
    { component: "MPU6050 (I2C)",            purpose: "Yaw correction & ramp pitch detection" },
    { component: "MG90S ×4",                 purpose: "Arm (shoulder, elbow, gripper) & sort gate" },
    { component: "2S LiPo (7.4V) → 5V reg",  purpose: "Self-contained power, ≤24V supply" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Component</th>
            <th className="text-left py-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-rose-700">{r.component}</td>
              <td className="py-2.5 text-gray-600 text-[12px]">{r.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


const HIGHLIGHTS = [
  {
    icon: <Bot size={18} className="text-rose-500" />,
    title: "Fully autonomous, three-task run",
    body: "A single state machine takes the robot from grid navigation through obstacle avoidance and ramp climbing to barcode-guided sorting, with zero human input once it starts.",
  },
  {
    icon: <ScanLine size={18} className="text-amber-500" />,
    title: "Four-sensor fusion for navigation",
    body: "IR array, ultrasonic, IMU, and colour sensor data are fused in real time on the ESP32-S3, driving both the line-following PID loop and the obstacle-avoidance logic.",
  },
  {
    icon: <Mountain size={18} className="text-emerald-500" />,
    title: "Ramp climb & descent via IMU pitch",
    body: "The MPU6050 detects the 20° ramp gradient and triggers a dedicated climb routine, then switches to controlled descent once the pitch passes the peak.",
  },
  {
    icon: <Gauge size={18} className="text-sky-500" />,
    title: "Encoder-based odometry",
    body: "TB6612FNG motor drivers with encoder feedback give precise wheel odometry, supporting accurate dead-reckoning across the 6×4 grid.",
  },
  {
    icon: <Cpu size={18} className="text-violet-500" />,
    title: "SolidWorks chassis, 3D-printed arm",
    body: "The frame was modelled in SolidWorks and laser-cut for rigidity, while the 2-DOF gripper arm was 3D printed in PLA for fast iteration between competition runs.",
  },
];

// ═══════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════
export function MarsRobotDetail() {
  return (
    <div className="space-y-8">

      {/* ── 1. Problem / challenge ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The challenge</SectionLabel>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem] mb-4">
          The Mars Robot Challenge: Greenhouse Survival Edition simulates
          greenhouse operations on Mars — adapted from SLRC 2025 (University
          Category) under the ET 2223 Embedded Systems course at KDU.
        </p>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
          The robot has to navigate a grid, collect potatoes, cross a muddy
          obstacle course, climb a ramp, read a barcode, and sort potatoes
          into the correct baskets — without any human input.
        </p>
        <div className="mt-6">
          <TasksTable />
        </div>
      </div>

      

      {/* ── 3. CAD & chassis gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Chassis &amp; CAD</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Frame modelled in SolidWorks, laser-cut from acrylic, with
          3D-printed brackets mounting the arm and sensor suite.
        </p>
        <AppleGallery images={HARDWARE_IMAGES} aspect="aspect-[16/9]" />
      </div>

      {/* ── 4. Hardware table ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Hardware stack</SectionLabel>
        <HardwareTable />
      </div>

      
      {/* ── 7. Performance metrics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>System at a glance</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "6×4",   label: "Grid size",        sub: "Plantation task",        accent: true },
            { value: "20°",   label: "Ramp angle",       sub: "90 cm base" },
            { value: "4",     label: "Sensor types",     sub: "IR · ultrasonic · IMU · colour", accent: true },
            { value: "4",     label: "Servos",           sub: "arm + sort gate" },
            { value: "3",     label: "Competition tasks", sub: "sequential FSM",         accent: true },
            { value: "7.4V",  label: "Battery",          sub: "2S LiPo" },
            { value: "ESP32-S3", label: "Microcontroller", sub: "main processor",        accent: true },
            { value: "PID",   label: "Line control",     sub: "Kp / Ki / Kd tuned" },
          ].map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── 8. Feature highlights ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>What makes this work</SectionLabel>
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

      {/* ── 9. Robot, arena & team gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Robot, arena &amp; team</SectionLabel>
        <AppleGallery images={ROBOT_IMAGES} aspect="aspect-[16/9]" />
      </div>

    

    </div>
  );
}
