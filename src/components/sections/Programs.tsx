"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { programs } from "@/data/content";

/**
 * Training programmes.
 *
 * Two inputs drive the active row, and they compose rather than fight:
 *
 *   scroll  as the section passes, the active programme advances, so the
 *           sticky frame changes while you read down the list
 *   hover   pointing at a row takes over at once, and releases on exit
 *
 * Hover wins while it is happening, which is what a user expects: a
 * deliberate pointer action should beat an ambient one. On touch, where there
 * is no hover, scroll alone drives it, which is the reason for doing it this
 * way rather than hover-only.
 *
 * The progress rule on the left reads the same MotionValue as the active row,
 * so the indicator and the content cannot drift apart at any scroll speed.
 */
export function Programs() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Starts once the section is well into view and finishes before it leaves,
  // so all three get a turn on screen rather than the last one arriving as
  // the section exits.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 75%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.floor(v * programs.length);
    setScrolled(Math.min(programs.length - 1, Math.max(0, i)));
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const active = hovered ?? scrolled;

  return (
    <Section id="training" ref={ref} spacing="base">
      <Container>
        <Reveal>
          <SectionHead
            index="01 / Training"
            title={
              <>
                Three ways to
                <br />
                get stronger.
              </>
            }
            intro="Every member runs one of these. Which one depends on what you are training for, not on what is fashionable."
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex gap-6">
            {/* Scroll progress rule, bound to the same value as the active
                row so the two can never disagree. */}
            <div className="relative hidden w-px shrink-0 bg-ink-600 md:block">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-forge-green"
                style={reduced ? { scaleY: 1 } : { scaleY: railScale }}
              />
            </div>

            <ul className="flex flex-1 flex-col border-t border-ink-600">
              {programs.map((program, i) => {
                const isActive = active === i;
                return (
                  <motion.li
                    key={program.n}
                    className="border-b border-ink-600"
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={IN_VIEW}
                    transition={{ duration: 0.38, ease: EASE_OUT, delay: i * 0.08 }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      aria-expanded={isActive}
                      className="group grid w-full grid-cols-[auto_1fr] gap-x-5 py-4 text-left md:gap-x-8"
                    >
                      <span
                        className={cn(
                          "label pt-2 transition-colors duration-150",
                          isActive ? "text-forge-green" : "text-bone-dim",
                        )}
                      >
                        {program.n}
                      </span>

                      <span className="flex flex-col gap-2.5">
                        <motion.span
                          className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.4vw,2.5rem)] uppercase leading-[0.95] tracking-[-0.015em]"
                          animate={{ opacity: isActive ? 1 : 0.5 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                        >
                          {program.name}
                        </motion.span>

                        <span className="max-w-[48ch] text-bone-muted">{program.summary}</span>

                        {/* Inline frame for touch and narrow screens, where
                            the shared panel beside the list is not shown. */}
                        <span className="mt-2 block lg:hidden">
                          <Frame
                            src={program.image}
                            alt={`${program.name} training at Forge`}
                            label={program.name}
                            aspect="aspect-[16/10]"
                            sizes="100vw"
                          />
                        </span>

                        <span className="mt-1 flex flex-col gap-1.5">
                          {program.points.map((point) => (
                            <span key={point} className="flex items-start gap-3 text-sm text-bone-muted">
                              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-ink-500" />
                              {point}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Shared frame. Sticky, so it stays beside whichever row is live. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] overflow-hidden">
                {programs.map((program, i) => (
                  <motion.div
                    key={program.n}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }}
                    aria-hidden={active !== i}
                  >
                    <Frame
                      src={program.image}
                      alt={`${program.name} training at Forge`}
                      label={program.name}
                      aspect="h-full w-full"
                      sizes="45vw"
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="label mt-4 text-bone-dim" aria-live="polite">
                {programs[active].n} / {programs[active].name}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
