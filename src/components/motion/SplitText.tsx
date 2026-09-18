"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered text reveal, section 10's first request.
 *
 * Each line sits in a clipped box and rises from below, so the line above
 * appears to uncover it. The full string stays in the DOM as real text via
 * aria-label, with the animated pieces hidden from the accessibility tree,
 * so the split is presentational only.
 */
export function SplitText({
  lines,
  className,
  lineClassName,
  delay = 0,
  gap = 0.07,
  as = "h2",
  animateOnLoad = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  gap?: number;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnLoad?: boolean;
}) {
  const reduced = useReducedMotion();
  const Plain = as;
  const text = lines.join(" ");

  if (reduced) {
    return (
      <Plain className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Plain>
    );
  }

  const MotionTag = motion[as];
  const trigger = animateOnLoad
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: IN_VIEW };

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          // pb/-mb gives descenders room inside the clip mask.
          className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "108%" },
              visible: { y: "0%", transition: { duration: 0.62, ease: EASE_OUT } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
