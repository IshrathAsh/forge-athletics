"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { days, schedule, type ScheduleKind } from "@/data/content";

/**
 * Interactive schedule with a day selector, section 09.
 *
 * Built as a real tablist: roving tabindex, arrow keys, Home and End, and
 * aria-controls wiring the tab to its panel. A row of buttons that only
 * respond to clicks is the usual shortcut here and it locks out the keyboard.
 *
 * The green underline is a shared layoutId so it slides between days rather
 * than cutting, which is the one place motion carries meaning in this
 * component.
 */
const KIND_STYLE: Record<ScheduleKind, string> = {
  Strength: "text-forge-green",
  Performance: "text-bone",
  Conditioning: "text-bone-muted",
  Open: "text-bone-dim",
};

export function Schedule() {
  const reduced = useReducedMotion();
  const [day, setDay] = useState<string>("Mon");
  const baseId = useId();
  const entries = schedule[day];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = days.indexOf(day as (typeof days)[number]);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % days.length;
    if (e.key === "ArrowLeft") next = (i - 1 + days.length) % days.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = days.length - 1;
    if (next === null) return;
    e.preventDefault();
    const target = days[next];
    setDay(target);
    document.getElementById(`${baseId}-tab-${target}`)?.focus();
  };

  return (
    <Section id="schedule" spacing="base" className="border-t border-ink-600 bg-ink-850">
      <Container>
        <SectionHead
          index="04 / Schedule"
          title="This week on the floor."
          intro="Coached sessions are capped at twelve. Open floor is exactly that: the room, the equipment, and a coach on hand if you want one."
        />

        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Day of the week"
            onKeyDown={onKeyDown}
            className="flex gap-1 overflow-x-auto border-b border-ink-600 no-scrollbar"
          >
            {days.map((d) => {
              const selected = d === day;
              return (
                <button
                  key={d}
                  id={`${baseId}-tab-${d}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setDay(d)}
                  className={cn(
                    "relative min-h-12 shrink-0 px-5 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-150",
                    selected ? "text-bone" : "text-bone-dim hover:text-bone-muted",
                  )}
                >
                  {d}
                  {selected ? (
                    <motion.span
                      layoutId={`${baseId}-underline`}
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-forge-green"
                      transition={reduced ? { duration: 0 } : SPRING}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-live="polite"
            className="min-h-[22rem] pt-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={day}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
                className="flex flex-col"
              >
                {entries.map((entry) => (
                  <li
                    key={`${entry.time}-${entry.name}`}
                    className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-ink-600 py-5 transition-colors duration-150 hover:bg-ink-800 md:grid-cols-[6rem_1fr_auto_8rem] md:gap-x-8"
                  >
                    <span className="tabular font-[family-name:var(--font-display)] text-xl leading-none">
                      {entry.time}
                    </span>

                    <span className="flex flex-col gap-1 md:gap-0">
                      <span className="text-base font-medium">{entry.name}</span>
                      <span className="text-sm text-bone-dim md:hidden">
                        {entry.coach}, {entry.kind}
                      </span>
                    </span>

                    <span className={cn("label hidden md:block", KIND_STYLE[entry.kind])}>
                      {entry.kind}
                    </span>

                    <span className="hidden text-sm text-bone-muted md:block md:text-right">
                      {entry.coach}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
