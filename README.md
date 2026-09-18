# FORGE

Landing page built from the brand brief in [`brief/brand-brief.png`](brief/brand-brief.png).

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## How the brief was read

The brief grants creative freedom on layout and composition but is specific about
identity. Three lines from it drove most of the decisions:

**"A spark, not a flood."** Forge Green appears once per screen and never twice.
It marks the primary action, the active schedule tab, and a single rule beside the
manifesto. Everything else is black, bone and steel. This is enforced in
[`Button.tsx`](src/components/ui/Button.tsx): `green` is the primary variant and
every secondary action is an outline.

**"Not cheesy. Not overly motivational."** That rules out the entire vocabulary a
gym site normally reaches for. No "crush your goals", no "unleash", no exclamation
marks. The copy is short declaratives with specific numbers, and it says who the
place is not for. One testimonial is about being told no.

**"Real people, real work."** The photography direction bans smiling at camera,
generic muscular photos, bright commercial gyms and influencer retouching. That is
carried into [IMAGE-BRIEF.md](IMAGE-BRIEF.md) as explicit negative prompts.

---

## Structure

```
src/
├─ app/                     layout, page, globals
├─ components/
│  ├─ sections/             Hero, Manifesto, Programs, Stats,
│  │                        Coaches, Facility, Schedule,
│  │                        Testimonials, FinalCta
│  ├─ shell/                Nav, Footer
│  ├─ motion/               SplitText, Reveal, Counter, Magnetic
│  └─ ui/                   Layout, Button, Frame
├─ data/content.ts          all copy and schedule data
└─ lib/                     fonts, motion tokens, image registry
```

Design tokens are in [`globals.css`](src/app/globals.css) under `@theme`.

---

## Section 10 coverage

Every interaction the brief asks for, and where it lives.

| Asked for | Where |
|---|---|
| Scroll-triggered text reveals | `SplitText`, on every display heading |
| Animated number counters | `Counter`, in Stats |
| Smooth horizontal galleries | Facility strip |
| Hover image transitions | Programs, where three rows share one frame |
| Interactive schedule tabs | Schedule, as a real tablist |
| Magnetic CTA buttons | `Magnetic`, on every button |
| Subtle parallax | Hero at 14%, Facility frames at 6% |
| Fast and purposeful motion | Nothing runs past 380ms |

**Avoided, as instructed:** no bouncing, no idle loops, no transition over 400ms,
no effect without a reason.

Two implementation notes:

- **Magnetic buttons run on MotionValues, not state.** Tracking a cursor through
  `useState` re-renders the tree on every pointer move and collapses on anything
  but a fast desktop.
- **The facility gallery is a native scroll container, not a scroll hijack.** A
  pinned section converting vertical wheel input into horizontal movement traps
  the page and is hostile on a trackpad. An `overflow-x` strip gets wheel,
  trackpad, touch, drag and keyboard for free.

---

## Theme

One theme, locked: the page is black end to end, with a **single** deliberate
inversion to Bone White for the manifesto. That is a composition device used once,
not alternating light and dark sections. It lands there because the manifesto is
the one moment the brand speaks rather than demonstrates.

---

## Accessibility

- Schedule is a real tablist: roving tabindex, arrow keys, Home and End,
  `aria-controls` wiring each tab to its panel.
- Coach philosophy panels are always in the DOM and revealed on focus as well as
  hover, so the content is not hover-only.
- Hero copy sits over an unknown photograph, so two scrims guarantee contrast
  regardless of what lands there.
- Every animated component checks `useReducedMotion` and renders a static
  equivalent with identical content.
- Focus ring is Forge Green at 2px, never removed.

---

## Known gaps

**Photography.** Thirteen slots, nothing shot. Each renders a designed dark
placeholder rather than a broken box. See [IMAGE-BRIEF.md](IMAGE-BRIEF.md) for the
shot list and the generation preamble.

**This is the landing page only.** The brief lists five pages: Home, Training,
Coaches, Facility, Schedule. Home is built, and the other four exist here as
sections rather than routes. The content for them is already structured in
`data/content.ts`, so promoting a section to a page is mostly routing.

**Forms.** There is no enquiry form. The CTAs open mail and phone links. Adding a
booking form is a separate piece of work.

**Fictional.** FORGE is not a real business. Addresses, numbers, coaches
and member stories are illustrative, and the footer says so.
