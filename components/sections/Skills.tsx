"use client";
import { useState } from "react";
import { skills, coursework } from "@/lib/data";

export default function Skills() {
  const [active, setActive] = useState(0);
  const skill = skills[active];

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label mb-0 animate-on-scroll">Skills</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-on-scroll" style={{ transitionDelay: "60ms" }}>
          What I <span className="gradient-text-animated heading-glow-pulse">work with</span>
        </h2>
        <p className="text-muted max-w-2xl mb-10 animate-on-scroll" style={{ transitionDelay: "120ms" }}>
          Technical areas shaped by real project work — not just coursework.
        </p>

        {/* Technical Skills (coursework) */}
        <div className="mb-12 animate-on-scroll" style={{ transitionDelay: "160ms" }}>
          <div className="text-xs font-mono text-subtle uppercase tracking-widest mb-3">
            Technical Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {coursework.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 bg-card border border-border rounded-lg text-muted text-xs font-mono hover:border-accent/40 hover:text-accent-light hover:-translate-y-0.5 transition-all cursor-default"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-on-scroll grid md:grid-cols-3 gap-0 border border-border rounded-2xl overflow-hidden" style={{ transitionDelay: "200ms" }}>
          {/* Sidebar */}
          <div className="border-r border-border">
            {skills.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 border-b border-border last:border-0 transition-all duration-200 group relative overflow-hidden ${
                  active === i ? "bg-accent/10" : "hover:bg-card"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${
                    active === i ? "bg-gradient-to-b from-accent via-accent-light to-accent-green" : "bg-transparent"
                  }`}
                />
                <div className="text-[10px] font-mono text-subtle mb-1">{s.label}</div>
                <div className={`font-semibold text-sm ${active === i ? "text-text" : "text-muted group-hover:text-text"}`}>
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="col-span-2 p-8">
            <div className="text-xs font-mono text-subtle mb-2">{skill.label}</div>
            <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
            <p className="text-muted leading-relaxed mb-6 text-sm">{skill.description}</p>

            {/* Primary tools */}
            <div className="mb-5">
              <div className="text-xs font-mono text-subtle uppercase tracking-widest mb-3">
                Tools I use most
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 bg-accent/10 border border-accent/25 rounded-lg text-accent-light text-xs font-mono font-medium hover:border-accent/50 hover:bg-accent/15 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Extra tools */}
            {skill.extra.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {skill.extra.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-card border border-border rounded-lg text-muted text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Publication badge (Research Experience only) */}
            {skill.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-green/30 bg-accent-green/8 text-accent-green text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse2" />
                {skill.badge}
              </div>
            )}

            {/* Research bullet points (Research Experience only) */}
            {skill.points && (
              <ul className="mb-6 space-y-2">
                {skill.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent to-accent-green mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* Context note */}
            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-mono text-subtle mb-1">{skill.context}</div>
                <p className="text-muted text-sm leading-relaxed">{skill.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}