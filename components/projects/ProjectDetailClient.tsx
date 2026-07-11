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
import { FeelFillDetail } from "@/components/projects/FeelFillDetail";
import { FinFlowDetail } from "@/components/projects/FinFlowDetail";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Status = "completed" | "ongoing" | "research";

// ─────────────────────────────────────────────
// Status badge — matches eyebrow-pill / accent language
// ─────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string }> = {
    completed: { label: "Completed", cls: "text-accent-green bg-accent-green/10 border-accent-green/25" },
    ongoing:   { label: "Ongoing",   cls: "text-amber-400 bg-amber-400/10 border-amber-400/25" },
    research:  { label: "Research",  cls: "text-accent-light bg-accent/10 border-accent/25" },
  };
  const s = map[status];
  return (
    <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border tracking-wide ${s.cls}`}>
      {s.label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Image - object-cover (leaf photos, hero)
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card text-subtle">
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
// Image - object-contain (app screenshots, full image visible)
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card text-subtle">
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
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
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
    <div className="rounded-2xl border border-border bg-card overflow-hidden card-hover border-glow">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <p className="section-label mb-0">How it works</p>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-0 flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  i === 2
                    ? "bg-accent border-accent text-bg shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                    : i === 4
                    ? "bg-accent-green/10 border-accent-green/30 text-accent-green"
                    : "bg-white/[0.03] border-border text-muted"
                }`}>
                  {s.icon}
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-semibold text-white whitespace-nowrap">{s.label}</div>
                  <div className="text-[10px] text-subtle font-mono whitespace-nowrap">{s.sub}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-12 h-px bg-border mb-6 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mx-6 mb-6">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2.5">
          <Globe size={14} className="text-accent-light flex-shrink-0" />
          <span className="text-[11px] font-mono text-muted">Web app</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2.5">
          <Smartphone size={14} className="text-accent-light flex-shrink-0" />
          <span className="text-[11px] font-mono text-muted">Mobile app (offline)</span>
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
    <div className="rounded-2xl border border-border bg-card overflow-hidden card-hover border-glow">
      <div className="px-6 pt-5 pb-4 border-b border-border flex items-center justify-between">
        <p className="section-label mb-0">Detection results</p>
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-subtle">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-white/10 inline-block" />
            Leaf photo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-accent/20 inline-block" />
            App result
          </span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {comparisons.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_1.4fr_1fr] gap-4 p-5 items-start hover:bg-white/[0.02] transition-colors">
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border cursor-zoom-in group"
              onClick={() => onImageClick(i * 2)}
            >
              <ProjectImage src={c.photo} alt={`Leaf sample ${i + 1}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-accent/20 bg-white/[0.02] cursor-zoom-in group"
              onClick={() => onImageClick(i * 2 + 1)}
            >
              <ProjectImageContain src={c.result} alt={`Result ${i + 1}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="pl-1 pt-1">
              <div className="text-sm font-semibold text-white mb-1 leading-snug">
                {c.caption.split(" - ")[0]}
              </div>
              <div className="text-xs text-muted leading-relaxed">
                {c.caption.split(" - ")[1] ?? ""}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  c.caption.toLowerCase().includes("healthy") ? "bg-accent-green animate-pulse2" : "bg-accent-light animate-pulse2"
                }`} />
                <span className="text-[10px] font-mono text-subtle">
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
    title: "Upload a leaf photo - get an instant diagnosis",
    body: "Point your phone at any tomato leaf and receive a clear result within seconds: what disease was found, how confident the system is, and what it means for your crop.",
  },
  {
    icon: "🔬",
    title: "Recognises 10 conditions, including a healthy class",
    body: "The system is trained on bacterial, fungal, viral, and pest-related leaf conditions - and can also confidently confirm that a leaf is healthy, so you never act on a false alarm.",
  },
  {
    icon: "💊",
    title: "Every result comes with treatment and prevention advice",
    body: "Rather than just naming a disease, the app explains the likely cause, suggests treatment steps, and offers guidance on preventing it from spreading to other plants.",
  },
  {
    icon: "📱",
    title: "Works offline in the field",
    body: "The mobile app runs entirely on your device - no internet connection needed. Useful in remote farmland where connectivity is unreliable.",
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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-subtle mb-4 font-mono text-sm">project not found.</p>
          <Link href="/#projects" className="text-accent-light hover:underline text-sm">
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
  const isFeelFill = project.id === 7;
  const isFinFlow = project.id === 8;

  // Projects with a fully custom detail component - skip the generic
  // "About this project" + highlights block entirely for these.
  const hasCustomDetail =
    isElevision || isLankaMesh || isDigitalComm || isMarsRobot || isRosco || isFeelFill || isFinFlow;

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

      <div className="min-h-screen bg-bg grid-bg">

        {/* ── Sticky nav ── */}
        <div className="sticky top-0 z-40 bg-bg/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-muted hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft size={15} />
              Back to Projects
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-accent via-accent-light to-accent-green bg-[length:200%_auto] hover:bg-right text-bg text-sm font-semibold rounded-lg transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(108,99,255,0.6)]"
              >
                <Github size={14} />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* ── Hero banner ── */}
        <div className="relative w-full h-[52vh] min-h-[320px] max-h-[520px] overflow-hidden bg-bg">
          <div className="absolute inset-0 scale-105">
            <ProjectImage src={project.image} alt={project.title} priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/50 to-bg" />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent-green/10" />
          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-end pb-10 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 tracking-wide backdrop-blur-sm">
                {project.category}
              </span>
              <StatusBadge status={project.status} />
              {project.featured && (
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 tracking-wide">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-2 gradient-text-animated heading-glow-pulse">
              {project.title}
            </h1>
            <p className="text-accent-light font-medium text-base md:text-lg">
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
              {isFeelFill && <FeelFillDetail />}
              {isFinFlow && <FinFlowDetail />}

              {!hasCustomDetail && (
                <>
                  {/* Description - plain text only, no inline images */}
                  <div className="bg-card rounded-2xl border border-border p-6 md:p-8 card-hover border-glow animate-fade-up">
                    <p className="section-label mb-5">About this project</p>
                    <div className="space-y-4">
                      {project.longDescription.split("\n\n").map((para, i) => (
                        <p key={i} className="text-muted leading-[1.8] text-[0.97rem]">
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
                    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 card-hover border-glow">
                      <p className="section-label mb-6">What makes this useful</p>
                      <div className="space-y-5">
                        {AGROVISION_HIGHLIGHTS.map((h, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <span className="text-xl flex-shrink-0 mt-0.5">{h.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-white mb-1">{h.title}</p>
                              <p className="text-sm text-muted leading-relaxed">{h.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    project.highlights && project.highlights.length > 0 && (
                      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 card-hover border-glow">
                        <p className="section-label mb-5">Key highlights</p>
                        <ul className="space-y-3">
                          {project.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={15} className="text-accent-green flex-shrink-0 mt-0.5" />
                              <span className="text-muted text-sm leading-relaxed">{h}</span>
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
              <div className="bg-card rounded-2xl border border-border p-5 card-hover border-glow">
                <p className="section-label mb-4">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-card rounded-2xl border border-border p-5 card-hover border-glow">
                <p className="section-label mb-4">Details</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Calendar size={13} className="text-accent-light flex-shrink-0" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Tag size={13} className="text-accent-light flex-shrink-0" />
                    {project.category}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin size={13} className="text-accent-light flex-shrink-0" />
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-accent via-accent-light to-accent-green bg-[length:200%_auto] hover:bg-right text-bg font-semibold rounded-xl transition-all duration-300 text-sm shadow-[0_10px_24px_-10px_rgba(108,99,255,0.6)]"
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-card border border-border hover:border-accent/40 hover:text-accent-light text-muted font-semibold rounded-xl transition-all text-sm"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Highlight callout */}
              {project.highlight && (
                <div className="p-4 bg-accent-green/10 border border-accent-green/25 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green flex-shrink-0 mt-1.5 animate-pulse2" />
                    <p className="text-accent-green text-xs leading-relaxed font-mono">
                      {project.highlight}
                    </p>
                  </div>
                </div>
              )}

              {/* AgroVision: detectable conditions */}
              {isAgroVision && (
                <div className="bg-card rounded-2xl border border-border p-5 card-hover border-glow">
                  <p className="section-label mb-4">Detectable conditions</p>
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
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            d.type === "healthy"   ? "bg-accent-green" :
                            d.type === "bacterial" ? "bg-orange-400"  :
                            d.type === "viral"     ? "bg-purple-400"  :
                            d.type === "pest"      ? "bg-amber-400"   :
                            "bg-red-400"
                          }`} />
                          {d.name}
                        </div>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          d.type === "healthy"   ? "bg-accent-green/10 text-accent-green" :
                          d.type === "bacterial" ? "bg-orange-400/10 text-orange-300"   :
                          d.type === "viral"     ? "bg-purple-400/10 text-purple-300"   :
                          d.type === "pest"      ? "bg-amber-400/10 text-amber-300"     :
                          "bg-red-400/10 text-red-300"
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
          <div className="mt-16 pt-10 border-t border-border">
            <p className="section-label mb-6">Other projects</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="group relative bg-card border border-border rounded-xl overflow-hidden card-hover"
                  >
                    <div className="relative h-28 bg-bg overflow-hidden">
                      <ProjectImage src={p.image} alt={p.title} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-mono text-subtle mb-1">
                        {String(p.id).padStart(2, "0")} · {p.year}
                      </div>
                      <div className="font-semibold text-sm text-white mb-1 group-hover:text-accent-light transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-muted line-clamp-2 leading-relaxed">
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
