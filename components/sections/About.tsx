"use client";
import { useState } from "react";
import { education, leadership, coursework, personalInfo } from "@/lib/data";

const tabs = ["Overview", "Education", "Leadership", "Coursework"];

export default function About() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label mb-3">About Me</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Building intelligent systems where<br />
          <em className="not-italic text-accent-light">software meets hardware.</em>
        </h2>
        <p className="text-muted max-w-2xl mb-12">
          Core profile and background. My work focuses on edge AI, embedded intelligence, and building systems that operate reliably in the real world.
        </p>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-text border-accent"
                  : "text-muted border-transparent hover:text-text"
              }`}
            >
              {tab}
            </button>
          ))}
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
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: "6+", l: "Projects" },
                { v: "5", l: "Certifications" },
                { v: "2", l: "Degrees (in progress)" },
                { v: "IEEE", l: "ComSoc KDU Chairman" },
                { v: "IET", l: "Member" },
                { v: "2024", l: "Started KDU" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="text-xl font-bold text-text mb-1">{s.v}</div>
                  <div className="text-xs text-subtle">{s.l}</div>
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
              <span key={i} className="px-4 py-2 bg-card border border-border rounded-lg text-muted text-sm hover:border-accent/40 hover:text-accent-light transition-all cursor-default">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
