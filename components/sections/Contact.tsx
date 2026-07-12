"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    const sub = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${sub}&body=${body}`;
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label mb-0 animate-on-scroll">Contact</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-on-scroll" style={{ transitionDelay: "60ms" }}>
          Get In <span className="gradient-text-animated heading-glow-pulse">Touch</span>
        </h2>
        <p className="text-muted max-w-xl mb-16 animate-on-scroll" style={{ transitionDelay: "120ms" }}>
          Open to internships, research collaborations, and engineering-focused conversations.
          Share your message and I&apos;ll get back soon.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — Info */}
          <div className="animate-on-scroll" style={{ transitionDelay: "160ms" }}>
            <p className="text-lg font-semibold mb-8 text-text/90 leading-snug">
              Let&apos;s build something{" "}
              <em className="not-italic text-accent-light">precise, useful, and a little ambitious.</em>
            </p>

            <div className="space-y-4 mb-10">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-muted hover:text-text transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <Mail size={16} className="text-accent" />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 text-muted hover:text-text transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <Phone size={16} className="text-accent" />
                </div>
                <span className="text-sm">{personalInfo.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center">
                  <MapPin size={16} className="text-accent" />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: personalInfo.github, icon: <Github size={16} />, label: "GitHub" },
                { href: personalInfo.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
                { href: personalInfo.resumeUrl, icon: <FileText size={16} />, label: "Resume" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-muted hover:border-accent/40 hover:text-accent-light hover:-translate-y-0.5 transition-all text-sm"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            className="animate-on-scroll bg-card border border-border rounded-2xl p-7 space-y-5"
            style={{ transitionDelay: "220ms" }}
          >
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-subtle uppercase tracking-widest">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-glow w-full bg-bg border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-subtle focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-subtle uppercase tracking-widest">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-glow w-full bg-bg border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-subtle focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-subtle uppercase tracking-widest">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-glow w-full bg-bg border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-subtle focus:outline-none focus:border-accent transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent via-accent-light to-accent-green bg-[length:200%_auto] hover:bg-right text-white font-semibold py-3 rounded-xl transition-all duration-500 text-sm hover:-translate-y-0.5 shadow-[0_14px_34px_-16px_rgba(108,99,255,0.7)]"
            >
              <Send size={15} />
              Send Message
            </button>
            {status === "sent" && (
              <p className="text-center text-accent-green text-sm font-mono">✓ Opening email client...</p>
            )}
            {status === "error" && (
              <p className="text-center text-red-400 text-sm font-mono">Please fill in all fields.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}