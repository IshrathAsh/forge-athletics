import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { testimonials } from "@/data/content";

/**
 * Testimonials. Section 09 asks for short, impactful stories.
 *
 * Three at once rather than a carousel: these are four lines each, and a
 * carousel would add arrows, dots and a live region to show one short quote
 * at a time. Each one names a specific thing that happened, which is what
 * separates a reference from praise.
 */
export function Testimonials() {
  return (
    <Section spacing="base">
      <Container>
        <SectionHead index="05 / Members" title="What people actually say." />

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3" gap={0.08}>
          {testimonials.map((item) => (
            <RevealItem key={item.name} as="article" className="flex h-full flex-col">
              <span aria-hidden className="font-[family-name:var(--font-display)] text-5xl leading-none text-forge-green">
                &ldquo;
              </span>
              <blockquote className="mt-3 text-lg leading-relaxed text-bone/85">
                {item.quote}
              </blockquote>
              <footer className="mt-auto flex flex-col gap-0.5 border-t border-ink-600 pt-4 text-sm">
                <cite className="not-italic font-medium text-bone">{item.name}</cite>
                <span className="text-bone-dim">{item.detail}</span>
              </footer>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
