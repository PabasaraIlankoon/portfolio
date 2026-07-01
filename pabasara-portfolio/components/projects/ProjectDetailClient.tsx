"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Tag,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Smartphone,
  Globe,
  BarChart3,
  Leaf,
} from "lucide-react";
import { projects } from "@/lib/data";
import { ElevisionDetail } from "@/components/projects/ElevisionDetail";
import { LankaMeshDetail } from "@/components/projects/LankaMeshDetail";
import { DigitalCommDetail } from "@/components/projects/DigitalCommDetail";
import { MarsRobotDetail } from "@/components/projects/MarsRobotdetail";
import { RoscoDetail } from "@/components/projects/RoscoDetail";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Status = "completed" | "ongoing" | "research";

// ─────────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string }> = {
    completed: { label: "Completed", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    ongoing:   { label: "Ongoing",   cls: "text-amber-700 bg-amber-50 border-amber-200" },
    research:  { label: "Research",  cls: "text-violet-700 bg-violet-50 border-violet-200" },
  };
  const s = map[status];
  return (
    <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border tracking-wide ${s.cls}`}>
      {s.label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Image — object-cover (leaf photos, hero)
// ─────────────────────────────────────────────
function ProjectImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-300">
          <Leaf size={24} />
          <span className="text-[10px] font-mono text-center px-3 leading-tight opacity-50">
            {src.split("/").pop()}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Image — object-contain (app screenshots, full image visible)
// ─────────────────────────────────────────────
function ProjectImageContain({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-300">
          <Leaf size={24} />
          <span className="text-[10px] font-mono text-center px-3 leading-tight opacity-50">
            {src.split("/").pop()}
          </span>
        </div>
      )}
    </div>
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
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        className="relative w-[88vw] max-w-5xl h-[78vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectImageContain src={images[index]} alt={`Image ${index + 1}`} />
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AgroVision prediction pipeline (id === 3)
// ─────────────────────────────────────────────
function AgroVisionPipeline() {
  const steps = [
    { icon: <Leaf size={16} />,        label: "Upload",      sub: "Leaf photo"         },
    { icon: <Layers size={16} />,      label: "Preprocess",  sub: "Crop · normalise"   },
    { icon: <Cpu size={16} />,         label: "Inference",   sub: "EfficientNetB0"     },
    { icon: <BarChart3 size={16} />,   label: "Structure",   sub: "Label · score"      },
    { icon: <CheckCircle2 size={16} />,label: "Result card", sub: "Treatment · advice" },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
          How it works
        </p>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-0 flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  i === 2
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : i === 4
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}>
                  {s.icon}
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{s.label}</div>
                  <div className="text-[10px] text-gray-400 font-mono whitespace-nowrap">{s.sub}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-12 h-px bg-gray-200 mb-6 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mx-6 mb-6">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
          <Globe size={14} className="text-indigo-500 flex-shrink-0" />
          <span className="text-[11px] font-mono text-gray-600">Web app</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
          <Smartphone size={14} className="text-indigo-500 flex-shrink-0" />
          <span className="text-[11px] font-mono text-gray-600">Mobile app (offline)</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Comparison table (id === 3)
// ─────────────────────────────────────────────
function ComparisonTable({
  comparisons,
  onImageClick,
}: {
  comparisons: { photo: string; result: string; caption: string }[];
  onImageClick: (i: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
        <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
          Detection results
        </p>
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-gray-200 inline-block" />
            Leaf photo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-indigo-100 inline-block" />
            App result
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {comparisons.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_1.4fr_1fr] gap-4 p-5 items-start hover:bg-gray-50/60 transition-colors">
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in group"
              onClick={() => onImageClick(i * 2)}
            >
              <ProjectImage src={c.photo} alt={`Leaf sample ${i + 1}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-indigo-100 bg-gray-50 cursor-zoom-in group"
              onClick={() => onImageClick(i * 2 + 1)}
            >
              <ProjectImageContain src={c.result} alt={`Result ${i + 1}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="pl-1 pt-1">
              <div className="text-sm font-semibold text-gray-800 mb-1 leading-snug">
                {c.caption.split(" — ")[0]}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {c.caption.split(" — ")[1] ?? ""}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  c.caption.toLowerCase().includes("healthy") ? "bg-emerald-400" : "bg-indigo-400"
                }`} />
                <span className="text-[10px] font-mono text-gray-400">
                  {c.caption.toLowerCase().includes("healthy") ? "No disease detected" : "Disease detected"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AgroVision plain-language highlights
// ─────────────────────────────────────────────
const AGROVISION_HIGHLIGHTS = [
  {
    icon: "🌿",
    title: "Upload a leaf photo — get an instant diagnosis",
    body: "Point your phone at any tomato leaf and receive a clear result within seconds: what disease was found, how confident the system is, and what it means for your crop.",
  },
  {
    icon: "🔬",
    title: "Recognises 10 conditions, including a healthy class",
    body: "The system is trained on bacterial, fungal, viral, and pest-related leaf conditions — and can also confidently confirm that a leaf is healthy, so you never act on a false alarm.",
  },
  {
    icon: "💊",
    title: "Every result comes with treatment and prevention advice",
    body: "Rather than just naming a disease, the app explains the likely cause, suggests treatment steps, and offers guidance on preventing it from spreading to other plants.",
  },
  {
    icon: "📱",
    title: "Works offline in the field",
    body: "The mobile app runs entirely on your device — no internet connection needed. Useful in remote farmland where connectivity is unreliable.",
  },
  {
    icon: "🤝",
    title: "A tool to support farmers, not replace agronomists",
    body: "Results are framed as guidance rather than final verdicts. Uncertain cases are flagged with a prompt to seek a second opinion, reflecting an honest approach to the limits of AI.",
  },
];

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function ProjectDetailClient({ id }: { id: string }) {
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 font-mono text-sm">project not found.</p>
          <Link href="/#projects" className="text-indigo-600 hover:underline text-sm">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const isElevision = project.id === 1;
  const isLankaMesh = project.id === 2;
  const isAgroVision = project.id === 3;
  const isDigitalComm = project.id === 4;
  const isMarsRobot = project.id === 5;
  const isRosco = project.id === 6;

  // Projects with a fully custom detail component — skip the generic
  // "About this project" + highlights block entirely for these.
  const hasCustomDetail =
    isElevision || isLankaMesh || isDigitalComm || isMarsRobot || isRosco;

  const comparisonImages: string[] = project.comparisons
    ? project.comparisons.flatMap((c) => [c.photo, c.result])
    : [];

  const openComparisonLightbox = (i: number) => {
    setLightboxImages(comparisonImages);
    setLightboxIndex(i);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + lightboxImages.length) % lightboxImages.length : null
    );
  const nextImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % lightboxImages.length : null
    );

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <div className="min-h-screen bg-[#f8f8f7]">

        {/* ── Sticky nav ── */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={15} />
              Back to Projects
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-all"
              >
                <Github size={14} />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* ── Hero banner ── */}
        <div className="relative w-full h-[52vh] min-h-[320px] max-h-[520px] overflow-hidden bg-gray-900">
          <div className="absolute inset-0 scale-105">
            <ProjectImage src={project.image} alt={project.title} priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/55 via-gray-900/45 to-gray-900/80" />
          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-end pb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 tracking-wide">
                {project.category}
              </span>
              <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border tracking-wide ${
                project.status === "completed"
                  ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
                  : project.status === "research"
                  ? "bg-violet-500/20 border-violet-400/30 text-violet-300"
                  : "bg-amber-500/20 border-amber-400/30 text-amber-300"
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              {project.featured && (
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 tracking-wide">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
              {project.title}
            </h1>
            <p className="text-indigo-300 font-medium text-base md:text-lg">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">

            {/* ════════════ LEFT COLUMN ════════════ */}
            <div className="space-y-8 min-w-0">

              {/* ── Fully custom detail components ── */}
              {isElevision && <ElevisionDetail />}
              {isLankaMesh && <LankaMeshDetail />}
              {isDigitalComm && <DigitalCommDetail />}
              {isMarsRobot && <MarsRobotDetail />}
              {isRosco && <RoscoDetail />}

              {!hasCustomDetail && (
                <>
                  {/* Description — plain text only, no inline images */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                    <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">
                      About this project
                    </p>
                    <div className="space-y-4">
                      {project.longDescription.split("\n\n").map((para, i) => (
                        <p key={i} className="text-gray-600 leading-[1.8] text-[0.97rem]">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* AgroVision: How it works pipeline */}
                  {isAgroVision && <AgroVisionPipeline />}

                  {/* AgroVision: Comparison table */}
                  {isAgroVision && project.comparisons && project.comparisons.length > 0 && (
                    <ComparisonTable
                      comparisons={project.comparisons}
                      onImageClick={openComparisonLightbox}
                    />
                  )}

                  {/* Highlights */}
                  {isAgroVision ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                      <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-6">
                        What makes this useful
                      </p>
                      <div className="space-y-5">
                        {AGROVISION_HIGHLIGHTS.map((h, i) => (
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
                  ) : (
                    project.highlights && project.highlights.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                        <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">
                          Key highlights
                        </p>
                        <ul className="space-y-3">
                          {project.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 text-sm leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </>
              )}
            </div>

            {/* ════════════ RIGHT SIDEBAR ════════════ */}
            <div className="space-y-5">

              {/* Tech stack */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Details
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={13} className="text-indigo-400 flex-shrink-0" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Tag size={13} className="text-indigo-400 flex-shrink-0" />
                    {project.category}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={13} className="text-indigo-400 flex-shrink-0" />
                    Sri Lanka
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all text-sm"
                  >
                    <Github size={15} />
                    View on GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 text-gray-600 font-semibold rounded-xl transition-all text-sm"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Highlight callout */}
              {project.highlight && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                    <p className="text-emerald-700 text-xs leading-relaxed font-mono">
                      {project.highlight}
                    </p>
                  </div>
                </div>
              )}

              {/* AgroVision: detectable conditions */}
              {isAgroVision && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Detectable conditions
                  </p>
                  <ul className="space-y-2">
                    {[
                      { name: "Bacterial spot",        type: "bacterial" },
                      { name: "Early blight",          type: "fungal"    },
                      { name: "Late blight",           type: "fungal"    },
                      { name: "Leaf mold",             type: "fungal"    },
                      { name: "Septoria leaf spot",    type: "fungal"    },
                      { name: "Spider mite damage",    type: "pest"      },
                      { name: "Target spot",           type: "fungal"    },
                      { name: "Tomato mosaic virus",   type: "viral"     },
                      { name: "Yellow leaf curl virus",type: "viral"     },
                      { name: "Healthy",               type: "healthy"   },
                    ].map((d, i) => (
                      <li key={i} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            d.type === "healthy"   ? "bg-emerald-400" :
                            d.type === "bacterial" ? "bg-orange-400"  :
                            d.type === "viral"     ? "bg-purple-400"  :
                            d.type === "pest"      ? "bg-amber-400"   :
                            "bg-red-400"
                          }`} />
                          {d.name}
                        </div>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          d.type === "healthy"   ? "bg-emerald-50 text-emerald-600" :
                          d.type === "bacterial" ? "bg-orange-50 text-orange-600"   :
                          d.type === "viral"     ? "bg-purple-50 text-purple-600"   :
                          d.type === "pest"      ? "bg-amber-50 text-amber-600"     :
                          "bg-red-50 text-red-600"
                        }`}>
                          {d.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* ── Other projects ── */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <p className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-6">
              Other projects
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="relative h-28 bg-gray-100 overflow-hidden">
                      <ProjectImage src={p.image} alt={p.title} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-mono text-gray-400 mb-1">
                        {String(p.id).padStart(2, "0")} · {p.year}
                      </div>
                      <div className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {p.description}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}