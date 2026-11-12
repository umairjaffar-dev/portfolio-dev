"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Momentum ("inertia") scrolling via Lenis. Same-page hash links (including
 * `/#id` and the logo's `/#top`) glide to their target. Skipped entirely for
 * reduced-motion users, who keep native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Let nested scroll areas (modal body, dialogs) scroll natively.
      prevent: (node) => node.closest("[data-lenis-prevent], [role='dialog']") !== null,
    });

    // Pause page scrolling while a modal has locked the body (Radix sets data-scroll-locked).
    const lockObserver = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    });
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      // `#top` goes to the very top; sections already carry `scroll-mt-20`, which Lenis honours.
      lenis.scrollTo(url.hash === "#top" ? 0 : target);
      history.pushState(null, "", url.hash);
    };
    // Capture phase: runs before next/link's handler, which then sees defaultPrevented and skips its jump.
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lockObserver.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
