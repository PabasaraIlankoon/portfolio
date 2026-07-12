"use client";
import { useEffect } from "react";

/**
 * Watches every element carrying `.animate-on-scroll` and adds
 * `.visible` the first time it enters the viewport, triggering the
 * fade-up transition defined in globals.css.
 *
 * This hook lives in the root layout, which in Next.js's App Router
 * does NOT remount on client-side navigation — only the page content
 * inside it does. That means a plain "scan once on mount" approach
 * only ever finds the elements that existed on first load. Navigate
 * to a project page and back, and Home's sections remount with fresh
 * `.animate-on-scroll` elements that nobody is watching — so they
 * stay stuck at opacity: 0 forever (the "everything vanished" bug).
 *
 * Fix: in addition to the initial scan, a MutationObserver watches
 * the whole document for newly-inserted `.animate-on-scroll`
 * elements — which covers every future route change — and starts
 * observing each one as soon as it appears.
 */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = (el: Element) => {
      if (el.classList.contains("animate-on-scroll") && !el.classList.contains("visible")) {
        io.observe(el);
      }
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll(".animate-on-scroll:not(.visible)").forEach(observe);
    };

    // Initial pass — covers first load, and also covers any route
    // change that already happened before this effect ran.
    scan(document);

    // Ongoing pass — covers every future client-side navigation,
    // since RevealInit (and therefore this hook) never remounts.
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}