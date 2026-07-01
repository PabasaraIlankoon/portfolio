"use client";
import { useEffect, useRef, useState } from "react";
import { education, leadership, coursework, personalInfo } from "@/lib/data";

const tabs = ["Overview", "Education", "Leadership", "Coursework"];

export default function About() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  return (
    <section id="about" className="py-28 px-6 bg-[#07070d] animate-fade-up">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <div className="section-label mb-0">About Me</div>
        <div className="border-glow bg-card glass-card rounded-[2rem] p-10 shadow-[0_40px_100px_-70px_rgba(108,99,255,0.35)] mb-12 border border-accent/10 bg-gradient-to-br from-[#0d0e1b] to-[#08101f]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            <span className="gradient-text-animated">Building</span> intelligent systems where<br />
            <em className="not-italic gradient-text-animated">software meets hardware.</em>
          </h2>
          <p className="text-muted max-w-2xl mb-0">
            Core profile and background. My work focuses on edge AI, embedded intelligence, and building systems that operate reliably in the real world.
          </p>
        </div>

        {/* Tabs with a sliding gradient indicator */}
        <div className="relative flex gap-0 border-b border-border mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[tab] = el;
              }}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors duration-200 -mb-px ${
                activeTab === tab ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {tab}
            </button>
          ))}
          <span
            className="tab-indicator"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>

        {/* Tab content */}
        {activeTab === "Overview" && (
          <div className="grid md:grid-cols-2 gap-10 animate-fade-in">
            <div>
              <p className="text-muted leading-relaxed mb-6 text-base">
                {personalInfo.bio} Experienced in developing innovative engineering solutions through
                projects involving AI-powered detection systems, embedded hardware integration,
                cloud-connected applications, and long-range communication networks.
              </p>
              <p className="text-muted leading-relaxed text-base">
                Proficient in Python, C++, Raspberry Pi, ESP32, OpenCV, YOLO and related technologies,
                with strong analytical, problem-solving, and teamwork skills demonstrated through
                multidisciplinary engineering projects.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[
                { v: "10+", l: "Projects" },
                { v: "5", l: "Certifications" },
                { v: "2", l: "Degrees (in progress)" },
                { v: "IET", l: "Member" },
                { v: "2024", l: "Started KDU" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="border-glow glass-card p-6 rounded-3xl border border-accent/10 shadow-[0_20px_60px_-40px_rgba(108,99,255,0.25)] animate-fade-up hover:-translate-y-1 transition-transform duration-300"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-text mb-2">{s.v}</div>
                  <div className="text-sm text-subtle">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Education" && (
          <div className="space-y-5 animate-fade-in">
            {education.map((edu, i) => (
              <div key={i} className="flex gap-5 p-5 bg-card border border-border rounded-xl card-hover">
                <div className="text-2xl flex-shrink-0 mt-1">{edu.icon}</div>
                <div>
                  <div className="font-semibold text-text">{edu.degree}</div>
                  <div className="text-muted text-sm mt-0.5">{edu.institution}</div>
                  <div className="text-subtle text-xs mt-1 font-mono">{edu.period}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Leadership" && (
          <div className="space-y-4 animate-fade-in">
            {leadership.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl card-hover">
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold text-accent-light text-sm">{item.role}</span>
                  <span className="text-muted text-sm">— {item.org}</span>
                </div>
                <span className="text-subtle text-xs font-mono flex-shrink-0">{item.period}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Coursework" && (
          <div className="flex flex-wrap gap-3 animate-fade-in">
            {coursework.map((c, i) => (
              <span key={i} className="pill text-sm px-4 py-2 cursor-default">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}