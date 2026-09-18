"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { programs } from "@/data/content";

/**
 * Training programmes.
 *
 * Section 10 asks for hover image transitions, so the three programmes share
 * one image frame and hovering a row swaps what is in it. That is a real use
 * of the interaction rather than decoration: it keeps all three summaries
 * readable at once while still giving each one a picture.
 *
 * On touch and at narrow widths there is no hover, so the layout falls back
 * to each programme carrying its own image inline.
 */
export function Programs() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <Section id="training" spacing="base">
      <Container>
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

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Rows. The list is the primary content; the image follows it. */}
          <ul className="flex flex-col border-t border-ink-600">
            {programs.map((program, i) => {
              const isActive = active === i;
              return (
                <li key={program.n} className="border-b border-ink-600">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group grid w-full grid-cols-[auto_1fr] gap-x-5 py-7 text-left md:gap-x-8"
                  >
                    <span
                      className={cn(
                        "label pt-2 transition-colors duration-150",
                        isActive ? "text-forge-green" : "text-bone-dim",
                      )}
                    >
                      {program.n}
                    </span>

                    <span className="flex flex-col gap-3">
                      <span
                        className={cn(
                          "font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-[0.9] tracking-[-0.015em] transition-colors duration-150",
                          isActive ? "text-bone" : "text-bone/55",
                        )}
                      >
                        {program.name}
                      </span>

                      <span className="max-w-[48ch] text-bone-muted">{program.summary}</span>

                      {/* Inline image for touch and narrow screens, where the
                          shared frame beside the list is not visible. */}
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
                </li>
              );
            })}
          </ul>

          {/* Shared frame. Sticky so it stays beside whichever row is hovered. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden">
                {programs.map((program, i) => (
                  <motion.div
                    key={program.n}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT }}
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

              <motion.p
                key={active}
                className="label mt-4 text-bone-dim"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={IN_VIEW}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {programs[active].n} / {programs[active].name}
              </motion.p>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[52ch] text-sm text-bone-dim">
            Not sure which applies to you. Book an assessment and we will tell you, including if the
            answer is that you do not need us yet.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
