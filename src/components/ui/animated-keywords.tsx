"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CYCLE_MS = 2200;

/**
 * Keywords separated by dots. They fade in one by one, then a highlight
 * cycles across them. With reduced motion, it renders a static list.
 */
export function AnimatedKeywords({
  keywords,
  className,
}: {
  keywords: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || keywords.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % keywords.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, keywords.length]);

  return (
    <p className={cn("font-mono text-sm sm:text-base", className)}>
      <span className="sr-only">{keywords.join(", ")}</span>
      <span aria-hidden="true" className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {keywords.map((word, i) => {
          const isActive = !reduce && i === active;
          return (
            <Fragment key={word}>
              {i > 0 && <span className="text-muted/50">·</span>}
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.3 + i * 0.15, ease: "easeOut" }}
                className={cn(
                  "transition-[color,text-shadow] duration-500",
                  reduce
                    ? "text-accent"
                    : isActive
                      ? "text-accent [text-shadow:0_0_12px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                      : "text-muted",
                )}
              >
                {word}
              </motion.span>
            </Fragment>
          );
        })}
      </span>
    </p>
  );
}
