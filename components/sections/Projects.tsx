"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/data";

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    completed: { label: "Completed", color: "text-accent-green bg-accent-green/10 border-accent-green/25" },
    ongoing: { label: "Ongoing", color: "text-amber-400 bg-amber-400/10 border-amber-400/25" },
    research: { label: "Research", color: "text-accent-light bg-accent/10 border-accent/25" },
  };
  const s = map[status];
  return (
    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${s.color}`}>
      {s.label}
    </span>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filtered =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-14 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="section-label mb-0">Projects</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          What I&apos;ve Built
        </h2>
        <p className="text-muted max-w-2xl mb-10">
          Selected work across AI, embedded systems, IoT, and robotics.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-accent text-white"
                  : "bg-card border border-border text-muted hover:border-accent/40 hover:text-accent-light"
              }`}
            >
              {cat}
              {cat !== "All Projects" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({projects.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Uniform project grid — every card same size/shape */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-44 bg-bg overflow-hidden flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-light/5 flex items-center justify-center -z-10">
                  <span className="text-4xl opacity-30">⚡</span>
                </div>
                {/* Badges overlay */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  {project.featured && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-accent-light border border-accent/20">
                      Featured
                    </span>
                  )}
                  <StatusBadge status={project.status} />
                </div>
                <div className="absolute top-3 right-3 font-mono text-xs text-subtle bg-black/60 px-2 py-0.5 rounded">
                  {project.year}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    View Details →
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="font-mono text-xs text-subtle mb-2">
                  {String(project.id).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-accent-light transition-colors">{project.title}</h3>
                <p className="text-accent-light text-sm font-medium mb-3">{project.subtitle}</p>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>
                {project.highlight && (
                  <p className="text-accent-green text-xs font-mono mb-4 flex items-center gap-1.5 line-clamp-1">
                    <span className="w-1 h-1 rounded-full bg-accent-green flex-shrink-0" />
                    {project.highlight}
                  </p>
                )}

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="pill">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-accent-light font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                    View details <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
