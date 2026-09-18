import { Container } from "@/components/ui/Layout";
import { brand, contact } from "@/data/content";

/**
 * Footer. Section 09: location, social, contact.
 *
 * The two brief lines, "Strength builds character" and "Discipline creates
 * freedom", sit on the bottom rule where the brief itself puts them.
 */
export function Footer() {
  return (
    <footer className="border-t border-ink-600 bg-ink-950">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none">
              {brand.name}
            </span>
            <p className="max-w-[26ch] text-sm text-bone-muted">
              Strength and conditioning. {brand.city}, since {brand.established}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label">Location</h2>
            <address className="not-italic text-sm leading-relaxed text-bone-muted">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label">Hours</h2>
            <dl className="flex flex-col gap-2 text-sm">
              {contact.hours.map((row) => (
                <div key={row.days} className="flex flex-col">
                  <dt className="text-bone-muted">{row.days}</dt>
                  <dd className="tabular text-bone">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label">Contact</h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-bone transition-colors duration-150 hover:text-forge-green"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="tabular text-bone transition-colors duration-150 hover:text-forge-green"
                >
                  {contact.phone}
                </a>
              </li>
              {contact.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone-muted transition-colors duration-150 hover:text-forge-green"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-600 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label">Strength builds character</p>
          <p className="label">Discipline creates freedom</p>
          <p className="label text-bone-dim">
            Est. {brand.established} / For a stronger tomorrow
          </p>
        </div>

        <p className="mt-6 max-w-[60ch] text-xs text-bone-dim">
          A concept site built from a brand brief. {brand.full} is not a real business, and the
          addresses, numbers and member stories on this page are illustrative.
        </p>
      </Container>
    </footer>
  );
}
