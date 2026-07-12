import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-10 px-6 bg-[#07070d] animate-fade-up">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 glass-card border border-accent/10 bg-[#090a12] p-6 rounded-[2rem] shadow-[0_40px_100px_-72px_rgba(108,99,255,0.2)] animate-fade-up">
        <div>
          <div className="font-bold text-text mb-1">
            {personalInfo.name}
          </div>
          <p className="text-subtle text-xs">
            Electronic &amp; Telecom. Engineer · KDU Sri Lanka · {personalInfo.affiliation}
          </p>
        </div>
        <div className="flex items-center gap-4 text-subtle">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors"><Github size={16} /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors"><Linkedin size={16} /></a>
          <a href={`mailto:${personalInfo.email}`} className="hover:text-text transition-colors"><Mail size={16} /></a>
        </div>
        <p className="text-subtle text-xs">
          © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}