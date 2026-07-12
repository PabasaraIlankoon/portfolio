"use client";
import { useEffect } from "react";

/**
 * Watches every element carrying `.animate-on-scroll` and adds
 * `.visible` the first time it enters the viewport, triggering the
 * fade-up transition already defined in globals.css. Re-scans on
 * every route/content change since it's called from a top-level
 * client component that lives for the life of the page.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const els = document.querySelectorAll(".animate-on-scroll:not(.visible)");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}