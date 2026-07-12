"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

/** Renders nothing — just wires up the IntersectionObserver that
 *  powers the .animate-on-scroll fade-up effect across the site. */
export default function RevealInit() {
  useScrollReveal();
  return null;
}