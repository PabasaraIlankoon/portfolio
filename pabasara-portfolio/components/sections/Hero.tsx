"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";

function useTypewriter(words: string[], typingSpeed = 55, pauseMs = 1400, deletingSpeed = 30) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pauseMs, deletingSpeed]);

  return text;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const typedRole = useTypewriter(personalInfo.roles || [""]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

        <div className="pt-28 md:pt-0">
          {/* Eyebrow — fades in first */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          >
            <span className="w-6 h-px bg-accent-green" />
            <span className="text-accent-green text-xs font-medium uppercase tracking-widest">
              {personalInfo.roles[0]}
            </span>
            <span className="w-1 h-1 rounded-full bg-subtle animate-pulse2" />
            <span className="text-subtle text-xs font-medium uppercase tracking-widest">
              {personalInfo.roles[1]}
            </span>
          </div>

          {/* Headline — each line animates in with a stagger, and the
              final line now cycles through the site's living-gradient
              palette instead of sitting in flat text-muted. */}
          <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.04em] mb-6">
            {personalInfo.tagline.map((line, i) => {
              const isLast = i === personalInfo.tagline.length - 1;
              return (
                <span
                  key={i}
                  className={`block transition-all duration-700 ${
                    isLast ? "gradient-text-animated" : "text-text"
                  } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
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
            className={`flex items-center gap-1.5 mb-5 h-6 transition-all duration-700 delay-[250ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-accent-light font-mono text-sm">$</span>
            <span className="text-muted font-mono text-sm">{typedRole}</span>
            <span className="typing-caret text-accent-light" />
          </div>


          <p
            className={`text-muted text-base leading-relaxed mb-3 max-w-lg transition-all duration-700 delay-[400ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Building intelligent systems at the intersection of{" "}
            <strong className="text-text font-semibold">embedded hardware</strong> and{" "}
            <strong className="text-text font-semibold">machine intelligence</strong>. Currently
            pursuing Electronic and Telecommunication Engineering at{" "}
            <a href="https://www.kdu.ac.lk" target="_blank" rel="noopener noreferrer" className="underline decoration-subtle hover:decoration-accent-light text-text transition-colors">
              KDU
            </a>{" "}
            while researching{" "}
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }} className="underline decoration-subtle hover:decoration-accent-light text-text transition-colors">
              AI-based wildlife safety systems
            </a>
            .
          </p>

          <p
            className={`text-subtle text-xs font-mono mb-10 whitespace-pre-line leading-relaxed transition-all duration-700 delay-[500ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {personalInfo.bio2}
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-[600ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="px-6 py-3 rounded-full bg-text text-bg font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(108,99,255,0.5)] transition-all duration-200"
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

        {/* Profile image block — left exactly as-is, untouched */}
        <div className="relative hidden md:block h-screen self-stretch -mr-6 md:-mr-[max(0px,calc((100vw-72rem)/2))]">
          <div className="absolute inset-0 right-0 left-[-2%]">
            <Image src={personalInfo.photo} alt={personalInfo.name} fill className="object-cover object-top" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/10 to-transparent" />
          </div>
        </div>

        <div className="md:hidden relative w-full h-80 rounded-2xl overflow-hidden">
          <Image src={personalInfo.photo} alt={personalInfo.name} fill className="object-cover object-top" priority />
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle z-10">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}