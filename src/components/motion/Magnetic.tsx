"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic CTA, requested explicitly in section 10 of the brief.
 *
 * Driven by MotionValues outside the React render cycle. Tracking a cursor
 * through useState re-renders the tree on every pointer move and collapses on
 * anything but a fast desktop.
 *
 * Pointer only. It adds nothing for keyboard or touch and takes nothing away
 * from them, since the control's own focus and press states carry the
 * feedback.
 */
export function Magnetic({
  children,
  className,
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        rawX.set(Math.max(-strength, Math.min(strength, (dx / (r.width / 2)) * strength)));
        rawY.set(Math.max(-strength, Math.min(strength, (dy / (r.height / 2)) * strength)));
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
