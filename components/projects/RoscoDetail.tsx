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
  Ruler,
  Waypoints,
  TrendingUp,
} from "lucide-react";

const HARDWARE_IMAGES = [
  { src: "/images/rosco-chassis.jpg",  caption: "Laser-cut acrylic chassis" },
  { src: "/images/rosco-brackets.jpg", caption: "3D-printed sensor brackets" },
];

const ROBOT_IMAGES = [
  { src: "/images/rosco.jpg",       caption: "Assembled LineStorm robot" },
  { src: "/images/rosco-robot.jpg", caption: "Robot on the competition track" },
];

const DIAGRAM_IMAGES: { src: string; caption: string }[] = [
  // { src: "/images/rosco/block_diagram.jpg", caption: "Hardware block diagram" },
  // { src: "/images/rosco/control_flow.jpg",  caption: "FSM control flowchart" },
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
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-violet-500 ring-1 ring-violet-300" : "border-gray-200 opacity-60 hover:opacity-90"}`}
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
    <div className={`rounded-xl border p-4 text-center ${accent ? "bg-violet-50 border-violet-200" : "bg-white border-gray-200"}`}>
      <div className={`text-2xl font-bold font-mono mb-0.5 ${accent ? "text-violet-700" : "text-gray-900"}`}>{value}</div>
      <div className="text-[11px] font-semibold text-gray-700">{label}</div>
      {sub && <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub}</div>}
    </div>
  );
}

function ModesTable() {
  const rows = [
    { mode: "Line following", sensor: "8-element IR array", desc: "PID-based path tracking on a marked track" },
    { mode: "Wall following", sensor: "VL53L0X ToF",        desc: "Millimetre-accurate distance through a corridor maze" },
    { mode: "Ramp navigation", sensor: "MPU6050 IMU",       desc: "Gradient detection with motor power compensation" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Mode", "Sensor", "Description"].map((h) => (
              <th key={h} className="text-left py-2 pr-4 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
              <td className="py-2.5 pr-4 text-[12px] font-semibold text-violet-700 whitespace-nowrap">{r.mode}</td>
              <td className="py-2.5 pr-4 font-mono text-[12px] text-gray-500 whitespace-nowrap">{r.sensor}</td>
              <td className="py-2.5 text-[12px] text-gray-600">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HardwareTable() {
  const rows = [
    { component: "ESP32-S3",             purpose: "Main MCU running the FSM" },
    { component: "TB6612FNG",            purpose: "Dual H-bridge motor driver" },
    { component: "N20 geared DC motors", purpose: "Drivetrain (6V)" },
    { component: "8-element IR array",   purpose: "Line sensing" },
    { component: "VL53L0X (×N)",         purpose: "Wall distance sensing" },
    { component: "MPU6050",              purpose: "Orientation & ramp pitch" },
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
              <td className="py-2.5 pr-4 font-mono text-[12px] text-violet-700">{r.component}</td>
              <td className="py-2.5 text-gray-600 text-[12px]">{r.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StructureBlock() {
  return (
    <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] text-gray-300 leading-relaxed overflow-x-auto">
      <div className="text-gray-600 mb-1">// repository layout</div>
      <div><span className="text-violet-400">firmware/ROSCO25_Robot.ino</span>  — main FSM-based sketch</div>
      <div><span className="text-amber-400">firmware/config.h</span>          — pin definitions & tuning constants</div>
      <div><span className="text-emerald-400">firmware/sensors/</span>          — sensor driver stubs & helpers</div>
      <div><span className="text-sky-400">firmware/control/</span>            — FSM, PID & behaviour code</div>
      <div><span className="text-gray-400">docs/</span>                      — block diagram, CAD photos, flowchart</div>
      <div><span className="text-gray-400">platformio.ini</span>             — board: esp32-s3-devkitc-1</div>
    </div>
  );
}

const HIGHLIGHTS = [
  {
    icon: <Waypoints size={18} className="text-violet-500" />,
    title: "Three navigation modes, one FSM",
    body: "A single finite state machine switches between line following, wall following, and ramp navigation depending on which section of the course the robot is in.",
  },
  {
    icon: <Ruler size={18} className="text-emerald-500" />,
    title: "Millimetre-accurate wall sensing",
    body: "The VL53L0X time-of-flight sensor gives precise distance readings through the corridor maze, letting the robot hug walls without scraping them.",
  },
  {
    icon: <TrendingUp size={18} className="text-amber-500" />,
    title: "IMU-based ramp stability",
    body: "The MPU6050 detects gradient changes on the ramp and adjusts motor power in real time, keeping speed consistent without tipping.",
  },
  {
    icon: <Cpu size={18} className="text-sky-500" />,
    title: "Encoder-based differential steering",
    body: "Encoder feedback on both drive wheels enables accurate distance measurement and tight differential steering through sharp corners.",
  },
];

export function RoscoDetail() {
  return (
    <div className="space-y-8">

      {/* ── 1. The challenge ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>The challenge</SectionLabel>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem] mb-4">
          Built for ROSCO'25, an inter-university robotics competition
          organised by the Institution of Mechanical Engineers Student
          Chapter and the Electronics, Robotics and Innovation Club of KDU.
        </p>
        <p className="text-gray-600 leading-[1.8] text-[0.97rem]">
          The robot codenamed LineStorm had to master three distinct
          navigation modes under time pressure: a marked line, a corridor
          maze, and a gradient ramp.
        </p>
        <div className="mt-6">
          <ModesTable />
        </div>
      </div>


      {/* ── 3. Chassis gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Chassis &amp; brackets</SectionLabel>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          Laser-cut acrylic chassis with custom 3D-printed motor mounts
          and sensor brackets.
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
            { value: "3",         label: "Navigation modes", sub: "line · wall · ramp",    accent: true },
            { value: "8-ch",      label: "IR array",         sub: "PID line following" },
            { value: "VL53L0X",   label: "ToF sensor",       sub: "wall distance",         accent: true },
            { value: "MPU6050",   label: "IMU",              sub: "ramp gradient" },
            { value: "ESP32-S3",  label: "Microcontroller",  sub: "main FSM",              accent: true },
            { value: "TB6612FNG", label: "Motor driver",     sub: "N20 motors" },
            { value: "Encoders",  label: "Odometry",         sub: "differential steering", accent: true },
            { value: "Acrylic",   label: "Chassis material", sub: "laser-cut" },
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

      {/* ── 9. Robot & track gallery ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <SectionLabel>Robot &amp; competition track</SectionLabel>
        <AppleGallery images={ROBOT_IMAGES} aspect="aspect-[16/9]" />
      </div>

    </div>
  );
}