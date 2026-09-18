import { Container, Section } from "@/components/ui/Layout";
import { Counter } from "@/components/motion/Counter";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { stats } from "@/data/content";

/**
 * Statistics, section 09.
 *
 * Counters animate on entry. The founding year does not: a number ticking up
 * to 2018 reads as a bug rather than as a count, so it is rendered flat.
 */
export function Stats() {
  return (
    <Section spacing="tight" className="border-y border-ink-600 bg-ink-850">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4" gap={0.07}>
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col gap-2">
              <dd className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-[-0.02em]">
                {"plain" in stat && stat.plain ? (
                  <span className="tabular">{stat.value}</span>
                ) : (
                  <Counter to={stat.value} />
                )}
              </dd>
              <dt className="label">{stat.label}</dt>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
