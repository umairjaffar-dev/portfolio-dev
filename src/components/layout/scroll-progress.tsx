"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/** The whole page maps to this much "footage", so the timecode reads like a recording. */
const PAGE_SECONDS = 10 * 60;

const pad = (n: number) => String(n).padStart(2, "0");
const timecode = (p: number) => {
  const s = Math.round(p * PAGE_SECONDS);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
};

/** Thin cyan progress bar pinned to the bottom edge of the navbar. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
      style={{ scaleX: reduce ? scrollYProgress : spring }}
    />
  );
}

/** "● REC 00:04:12" that advances with scroll progress. Decorative. */
export function RecTimecode({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const textRef = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (textRef.current) textRef.current.textContent = timecode(p);
  });
  return (
    <span aria-hidden="true" className={className}>
      <span className="inline-block size-1.5 animate-live-pulse rounded-full bg-alert" />
      <span>REC</span>
      <span ref={textRef} className="tabular-nums">
        {timecode(0)}
      </span>
    </span>
  );
}
