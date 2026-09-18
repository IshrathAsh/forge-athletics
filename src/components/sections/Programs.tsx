"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { programs } from "@/data/content";

/** Visible height of the pinned panel. */
const PANEL = "h-[min(750px,100svh)]";

/**
 * Training programmes.
 *
 * Pinned: the panel sticks at 750px while the page scrolls past it, and the
 * scroll position selects which programme is showing. Only one is on screen
 * at a time, which is what makes the whole section fit 750px without cutting
 * any of the copy. The previous version stacked all three in a list and ran
 * to 1197px.
 *
 * The scroll drives real content here, not a decorative reveal: the image,
 * the name, the summary and the bullet points all change. That is the test
 * for whether pinning is worth the scroll distance it costs.
 *
 * Pinning is gated to large screens. On a phone the panel would fill the
 * viewport and trap the reader, so below 1024px it falls back to a plain
 * stacked list, which is also what reduced-motion users get at every size.
 */
export function Programs() {
  const reduced = useReducedMotion();
  const canPin = useMediaQuery("(min-width: 1024px)");

  if (reduced || !canPin) return <StackedPrograms />;
  return <PinnedPrograms />;
}

function StackedPrograms() {
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
          intro="Every member runs one of these. Which one depends on what you are training for."
        />

        <ul className="mt-10 flex flex-col gap-12">
          {programs.map((program) => (
            <li key={program.n} className="flex flex-col gap-4 border-t border-ink-600 pt-6">
              <span className="label text-forge-green">{program.n}</span>
              <h3 className="text-[clamp(1.75rem,7vw,2.5rem)]">{program.name}</h3>
              <Frame
                src={program.image}
                alt={`${program.name} training at Forge`}
                label={program.name}
                aspect="aspect-[16/10]"
                sizes="100vw"
              />
              <p className="text-bone-muted">{program.summary}</p>
              <ul className="flex flex-col gap-1.5">
                {program.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-bone-muted">
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-ink-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function PinnedPrograms() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // One viewport of scroll per programme, plus a little so the last one is
  // readable before the panel releases.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.floor(v * programs.length);
    setIndex(Math.min(programs.length - 1, Math.max(0, i)));
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const program = programs[index];

  return (
    <section id="training" ref={ref} className="relative h-[300vh]">
      <div className={cn("sticky top-0 flex items-center overflow-hidden", PANEL)}>
        <Container className="w-full">
          <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-14">
            <div>
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
                />
              </Reveal>

              {/* The panel reserves its height so swapping programmes never
                  shifts the layout under the reader. */}
              <div className="relative mt-8 min-h-[15rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={program.n}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                    className="flex flex-col gap-3"
                  >
                    <h3 className="text-[clamp(2rem,4vw,3rem)] leading-[0.95]">{program.name}</h3>
                    <p className="max-w-[46ch] text-bone-muted">{program.summary}</p>
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {program.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-bone-muted">
                          <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-ink-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step markers. Also the accessible announcement of state,
                  since the scroll position itself announces nothing. */}
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-px flex-1 bg-ink-600">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full origin-left bg-forge-green"
                    style={{ scaleX: railScale }}
                  />
                </div>
                <ul className="flex gap-3">
                  {programs.map((p, i) => (
                    <li
                      key={p.n}
                      aria-current={i === index}
                      className={cn(
                        "label transition-colors duration-200",
                        i === index ? "text-forge-green" : "text-bone-dim",
                      )}
                    >
                      {p.n}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="sr-only" aria-live="polite">
                Showing programme {index + 1} of {programs.length}: {program.name}
              </p>
            </div>

            <div className="relative h-[560px] w-full overflow-hidden">
              {programs.map((p, i) => (
                <motion.div
                  key={p.n}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: index === i ? 1 : 0, scale: index === i ? 1 : 1.04 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  aria-hidden={index !== i}
                >
                  <Frame
                    src={p.image}
                    alt={`${p.name} training at Forge`}
                    label={p.name}
                    aspect="h-full w-full"
                    sizes="45vw"
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
