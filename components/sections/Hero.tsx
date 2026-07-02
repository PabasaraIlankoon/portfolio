"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";

/** Cycles through personalInfo.roles with a typewriter effect. */
function useTypewriter(words: string[], typingSpeed = 55, pauseMs = 1800, deletingSpeed = 30) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
      }, deleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pauseMs, deletingSpeed]);

  return text;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const typedRole = useTypewriter(personalInfo.roles);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cursor-reactive ambient glow — a soft light that follows the pointer
  // across the hero section, layered behind the content.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty("--mouse-x", `${x}%`);
      section.style.setProperty("--mouse-y", `${y}%`);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      style={{
        backgroundImage:
          "radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(108,99,255,0.14), transparent 65%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

        <div className="pt-28 md:pt-0">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-accent-green" />
            <span className="text-accent-green text-xs font-medium uppercase tracking-widest">
              {personalInfo.roles[0]}
            </span>
            <span className="w-1 h-1 rounded-full bg-subtle" />
            <span className="text-subtle text-xs font-medium uppercase tracking-widest">
              {personalInfo.roles[1]}
            </span>
          </div>

          <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.04em] mb-6">
            {personalInfo.tagline.map((line, i) => {
              const isLast = i === personalInfo.tagline.length - 1;
              return (
                <span
                  key={i}
                  className={`block ${
                    isLast ? "gradient-text-animated heading-glow-pulse" : i === 1 ? "text-muted" : "text-text"
                  }`}
                >
                  {line}
                  {isLast && (
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-green ml-2 align-middle animate-pulse2" />
                  )}
                </span>
              );
            })}
          </h1>

          {/* Live typewriter role line, echoing the badge above */}
          <div
            className={`flex items-center gap-1.5 mb-5 h-6 transition-all duration-700 delay-[250ms] |{mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-accent-light font-mono text-sm">$</span>
            <span className="text-muted font-mono text-sm">{typedRole}</span>
            <span className="typing-caret text-accent-light" />
          </div>

          <p className="text-muted text-base leading-relaxed mb-3 max-w-lg">
            Building intelligent systems at the intersection of{" "}
            <strong className="text-text font-semibold">embedded hardware</strong> and{" "}
            <strong className="text-text font-semibold">machine intelligence</strong>. Currently
            pursuing Electronic and Telecommunication Engineering at{" "}
            <a href="https://www.kdu.ac.lk" target="_blank" rel="noopener noreferrer" className="underline decoration-subtle hover:decoration-accent-light text-text">
              KDU
            </a>{" "}
            while researching{" "}
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }} className="underline decoration-subtle hover:decoration-accent-light text-text">
              AI-based wildlife safety systems
            </a>
            .
          </p>

          <p className="text-subtle text-xs font-mono mb-10 whitespace-pre-line leading-relaxed">
            {personalInfo.bio2}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("#projects")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent via-accent-light to-accent-green bg-[length:200%_auto] text-bg font-semibold text-sm hover:-translate-y-0.5 hover:bg-right shadow-[0_14px_34px_-16px_rgba(108,99,255,0.7)] transition-all duration-500"
            >
              View Work
            </button>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              className="px-6 py-3 rounded-full border border-border text-muted font-semibold text-sm hover:border-accent hover:text-accent-light hover:-translate-y-0.5 transition-all duration-200"
            >
              Resume
            </a>
            <span className="w-px h-6 bg-border" />
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent-light hover:-translate-y-0.5 transition-all duration-200 inline-block">
              <Github size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent-light hover:-translate-y-0.5 transition-all duration-200 inline-block">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="relative hidden md:block h-screen self-stretch -mr-6 md:-mr-[max(0px,calc((100vw-72rem)/2))]">
          <div className="absolute inset-0 right-0 left-[-5%]">
            <Image src={personalInfo.photo} alt={personalInfo.name} fill className="object-cover object-top" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/10 to-transparent" />
          </div>
        </div>

        <div className="md:hidden relative w-full h-80 rounded-2xl overflow-hidden">
          <Image src={personalInfo.photo} alt={personalInfo.name} fill className="object-cover object-top" priority />
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle z-10 hover:text-accent-light transition-colors">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
