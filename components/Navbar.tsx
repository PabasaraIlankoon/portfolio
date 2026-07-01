"use client";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop - 120;
        if (window.scrollY >= top) setActiveSection(sec.id);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - offset,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  const initial = personalInfo.name.charAt(0);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent-light to-accent-green flex items-center justify-center text-bg font-bold text-sm shadow-[0_6px_18px_-6px_rgba(108,99,255,0.6)] group-hover:scale-105 transition-transform duration-200">
              {initial}
            </span>
            <span className="font-semibold text-text text-base">{personalInfo.name}</span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className={`nav-link ${activeSection === item.href.replace("#", "") ? "active" : ""} text-xs font-medium uppercase tracking-widest`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors">
              <Linkedin size={18} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full font-medium text-bg bg-gradient-to-r from-accent via-accent-light to-accent-green bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_10px_24px_-10px_rgba(108,99,255,0.6)]"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-muted hover:text-text transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-2xl font-semibold text-muted hover:text-accent-light transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-6 mt-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors">
              <Github size={22} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors">
              <Linkedin size={22} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full font-medium text-bg bg-gradient-to-r from-accent via-accent-light to-accent-green"
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
