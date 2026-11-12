"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts the number inside a value like "50+", "<1 yr" or "4.5x" up from 0
 * once it scrolls into view. Values without a number render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
    if (!el || !match || !inView || reduce) return;
    const [, prefix, num, suffix] = match;
    const target = Number(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  // Server/initial render shows the final value, so no-JS and SEO see real numbers.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
