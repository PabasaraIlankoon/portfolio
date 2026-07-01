"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Award, ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";
import { achievements, certifications } from "@/lib/data";

export default function Achievements() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const total = achievements.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const isPdf = (path?: string) => path?.toLowerCase().endsWith(".pdf");
  const firstImage = (img?: string | string[]) => Array.isArray(img) ? img[0] : img;
  const allImages = (img?: string | string[]) => Array.isArray(img) ? img : img ? [img] : [];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 400);
  };

  const prev = () => goTo(mod(current - 1));
  const next = () => goTo(mod(current + 1));

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => goTo(mod(current + 1)), 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, current]);

  const handleManualNav = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
    setTimeout(() => setPaused(false), 100);
  };

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleManualNav(next);
      else handleManualNav(prev);
    }
  };

  const badgeCls = (type: string) => {
    if (type === "Winner") return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    if (type === "Award")  return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    return "bg-white/10 text-white/70 border border-white/15";
  };

  const a = achievements[current];
  const imgs = allImages(a.image);

  // Desktop peek slots
  const slots = [
    { index: mod(current - 1), position: "left"   as const },
    { index: current,          position: "center" as const },
    { index: mod(current + 1), position: "right"  as const },
  ];

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <X size={18} />
          </button>
          {isPdf(lightbox) ? (
            <iframe
              src={lightbox}
              className="w-full max-w-4xl h-[88vh] rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightbox}
                alt="Certificate"
                width={1400}
                height={1000}
                className="object-contain rounded-2xl w-full h-auto max-h-[88vh]"
              />
            </div>
          )}
        </div>
      )}

      <section id="achievements" className="pt-8 pb-14 px-4 md:px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-0">Recognition</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Achievements</h2>
          <p className="text-muted max-w-2xl mb-10">
            Competition results and credentials across engineering, AI, and sport.
          </p>

          {/* ── Carousel ── */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-sm font-semibold text-text">Selected highlights</span>
            </div>

            {/* ── MOBILE: single card + swipe ── */}
            {isMobile ? (
              <div
                className="relative"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Mobile card */}
                <div className="rounded-2xl border border-accent/25 bg-[#0d1117] overflow-hidden">
                  {/* Image strip on top for mobile */}
                  {imgs.length > 0 && (
                    <div className={`flex w-full ${imgs.length > 1 ? "h-44" : "h-48"}`}>
                      {imgs.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setLightbox(img)}
                          className={`group relative overflow-hidden bg-bg/60 flex-1 ${idx > 0 ? "border-l border-border/40" : ""}`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <Image
                            src={img}
                            alt={`${a.title} certificate`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Info below image */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${badgeCls(a.type)}`}>
                        {a.type === "Winner" ? "🏆 " : a.type === "Award" ? "🎖 " : ""}
                        {a.type.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-subtle">{a.year}</span>
                      <span className="text-xs font-mono text-subtle">·</span>
                      <span className="text-xs font-mono text-subtle">{a.org}</span>
                    </div>
                    <h3 className="font-bold text-text text-lg leading-tight mb-2">{a.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{a.description}</p>

                    {imgs.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {imgs.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setLightbox(img)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border border-accent/30 text-accent-light bg-accent/5 hover:bg-accent/15 transition-all"
                          >
                            <ZoomIn size={12} />
                            {imgs.length > 1
                              ? idx === 0 ? "View certificate" : "View photo"
                              : "View certificate"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile nav row */}
                <div className="flex items-center justify-between mt-4 px-1">
                  <button
                    onClick={() => handleManualNav(prev)}
                    className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {achievements.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleManualNav(() => goTo(i))}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === current ? "bg-accent w-6" : "bg-border w-1.5 hover:bg-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleManualNav(next)}
                    className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Swipe hint */}
                <p className="text-center text-[11px] text-subtle font-mono mt-2">
                  swipe to browse
                </p>
              </div>
            ) : (
              /* ── DESKTOP: original 3-slot carousel ── */
              <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <button
                  onClick={() => handleManualNav(prev)}
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-all shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-4 px-6">
                  {slots.map(({ index, position }) => {
                    const item = achievements[index];
                    const isCenter = position === "center";
                    const thumb = firstImage(item.image);
                    const itemImgs = allImages(item.image);

                    return (
                      <div
                        key={`${position}-${index}`}
                        onClick={() => !isCenter && handleManualNav(() => goTo(index))}
                        style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        className={`
                          rounded-2xl border overflow-hidden flex-shrink-0
                          ${isCenter
                            ? "flex-1 border-accent/25 bg-[#0d1117] cursor-default"
                            : "w-48 opacity-40 scale-95 border-border bg-card/60 cursor-pointer hover:opacity-60"
                          }
                        `}
                      >
                        {isCenter ? (
                          <div className="flex flex-col md:flex-row min-h-[260px]">
                            <div className="flex-1 p-7 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${badgeCls(item.type)}`}>
                                    {item.type === "Winner" ? "🏆 " : item.type === "Award" ? "🎖 " : ""}
                                    {item.type.toUpperCase()}
                                  </span>
                                  <span className="text-xs font-mono text-subtle">{item.year}</span>
                                  <span className="text-xs font-mono text-subtle">·</span>
                                  <span className="text-xs font-mono text-subtle">{item.org}</span>
                                </div>
                                <h3 className="font-bold text-text text-xl leading-tight mb-3">{item.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                              </div>
                              {itemImgs.length > 0 && (
                                <div className="flex gap-2 mt-5 flex-wrap">
                                  {itemImgs.map((img, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => { e.stopPropagation(); setLightbox(img); }}
                                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border border-accent/30 text-accent-light bg-accent/5 hover:bg-accent/15 hover:border-accent/50 transition-all"
                                    >
                                      <ZoomIn size={12} />
                                      {itemImgs.length > 1
                                        ? idx === 0 ? "View certificate" : "View photo"
                                        : "View certificate"}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {itemImgs.length > 0 && (
                              <div className={`flex-shrink-0 border-l border-border/40 ${itemImgs.length > 1 ? "flex" : "block"} md:w-64 w-full`}>
                                {itemImgs.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setLightbox(img); }}
                                    className={`group relative overflow-hidden bg-bg/60 ${itemImgs.length > 1 ? "flex-1" : "w-full h-full min-h-[200px] md:min-h-0"} ${idx > 0 ? "border-l border-border/40" : ""}`}
                                  >
                                    <Image src={img} alt={`${item.title} certificate`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                                          <ZoomIn size={16} className="text-white" />
                                        </div>
                                        <span className="text-white text-[11px] font-medium">
                                          {itemImgs.length > 1 ? (idx === 0 ? "Certificate" : "Photo") : "View full"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 border border-white/20 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity">
                                      <ExternalLink size={11} className="text-white" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col min-h-[180px]">
                            {thumb && (
                              <div className="relative w-full h-32 flex-shrink-0 bg-bg/40">
                                <Image src={thumb} alt={item.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                              </div>
                            )}
                            <div className="p-3 flex flex-col flex-1 justify-center">
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                                item.type === "Winner" ? "text-yellow-400" :
                                item.type === "Award" ? "text-amber-400" : "text-muted"
                              }`}>
                                {item.type.toUpperCase()}
                              </span>
                              <p className="font-semibold text-text text-xs leading-snug line-clamp-2">{item.title}</p>
                              <p className="text-subtle text-[10px] font-mono mt-1.5">{item.year}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => handleManualNav(next)}
                  aria-label="Next"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-all shadow-md"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="flex justify-center gap-2 mt-5">
                  {achievements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleManualNav(() => goTo(i))}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === current ? "bg-accent w-6" : "bg-border w-1.5 hover:bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Certifications ── */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-px bg-accent" />
              <span className="text-sm font-semibold text-text">Certifications</span>
            </div>

            <div className="space-y-0">
              {certifications.map((c, i) => (
                <div key={i} className="flex gap-4 md:gap-5 items-start">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mt-0.5">
                      <Award size={14} className="text-accent-light" />
                    </div>
                    {i < certifications.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2 min-h-[2.5rem]" />
                    )}
                  </div>

                  <div className="pb-8 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-subtle">{c.year}</span>
                      <span className="text-xs font-mono text-subtle">/</span>
                      <span className="text-xs font-mono text-subtle uppercase">{c.org}</span>
                    </div>
                    <div className="font-bold text-text text-base mb-1">{c.title}</div>
                    <p className="text-muted text-sm mt-1 leading-relaxed mb-3">{c.description}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {c.image && (
                        <button
                          onClick={() => setLightbox(c.image!)}
                          className="relative w-20 h-14 rounded-lg overflow-hidden border border-border bg-bg/40 flex-shrink-0 group hover:border-accent/40 transition-colors"
                        >
                          {isPdf(c.image) ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
                              <span className="text-[9px] font-mono font-bold text-muted">PDF</span>
                              <ZoomIn size={12} className="text-muted group-hover:text-text transition-colors" />
                            </div>
                          ) : (
                            <>
                              <Image src={c.image} alt={`${c.title} certificate`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <ZoomIn size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </>
                          )}
                        </button>
                      )}
                      <div className="flex flex-col gap-1.5">
                        {c.image && (
                          <button
                            onClick={() => setLightbox(c.image!)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text transition-colors"
                          >
                            View certificate <ZoomIn size={11} />
                          </button>
                        )}
                        {c.credentialUrl && (
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-light hover:text-accent transition-colors"
                          >
                            Verify credential <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
