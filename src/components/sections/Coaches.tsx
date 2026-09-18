"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { coaches } from "@/data/content";

/**
 * Coaches. Large portraits with hover detail, as section 09 specifies.
 *
 * The philosophy line slides up over the portrait on hover. It is also
 * revealed on focus, and it is always present in the DOM rather than being
 * inserted on hover, so keyboard and screen reader users get the same
 * content. On touch, where there is no hover, the panel sits open.
 */
export function Coaches() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="coaches" spacing="base">
      <Container>
        <SectionHead
          index="02 / Coaches"
          title="Who you will be corrected by."
          intro="Seven coaches on staff. These four run the programmes. All of them still train, and all of them still compete or have."
        />

        <RevealGroup
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.07}
        >
          {coaches.map((coach, i) => {
            const open = active === i;
            return (
              <RevealItem key={coach.name} as="article">
                <div
                  className="group relative overflow-hidden"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  role="group"
                  aria-label={`${coach.name}, ${coach.role}`}
                >
                  <motion.div
                    animate={reduced ? undefined : { scale: open ? 1.04 : 1 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <Frame
                      src={coach.image}
                      alt={`${coach.name}, ${coach.role} at Forge`}
                      label={coach.name.split(" ")[0]}
                      aspect="aspect-square"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      // Monochrome at rest, full colour on hover or focus.
                      // Longer than the house 220ms on purpose: a slow bloom
                      // of colour reads as deliberate where a fast one reads
                      // as a glitch.
                      imgClassName={cn(
                        "transition-[filter] duration-500 ease-out",
                        open ? "grayscale-0" : "grayscale",
                      )}
                    />
                  </motion.div>

                  {/* Philosophy panel. Always rendered; only its transform
                      changes, so nothing is hidden from assistive tech. */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-forge-black/92 p-4 backdrop-blur-sm"
                    initial={false}
                    animate={reduced ? { y: 0 } : { y: open ? "0%" : "101%" }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <p className="text-sm leading-relaxed text-bone/85">{coach.philosophy}</p>
                    <p className="label mt-3 text-forge-green">{coach.credential}</p>
                  </motion.div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-ink-600 pt-3">
                  <h3 className="text-xl leading-none">{coach.name}</h3>
                  <span className="tabular label shrink-0">{coach.since}</span>
                </div>
                <p className="mt-1.5 text-sm text-bone-muted">{coach.role}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
