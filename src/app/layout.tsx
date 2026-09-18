import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";

const SITE_URL = "https://forge-athletics.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FORGE | Strength and performance training, Hyderabad",
    template: "%s · FORGE",
  },
  description:
    "Premium strength and conditioning in Jubilee Hills, Hyderabad. Coached strength, conditioning and performance programmes, written and reviewed. Established 2018.",
  keywords: [
    "strength training Hyderabad",
    "powerlifting gym Hyderabad",
    "olympic lifting Hyderabad",
    "strength and conditioning India",
    "performance training Jubilee Hills",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "FORGE",
    title: "FORGE | Strength and performance training, Hyderabad",
    description:
      "Coached strength, conditioning and performance programmes. Jubilee Hills, Hyderabad. Established 2018.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FORGE",
    description: "Strength and performance training, Hyderabad.",
  },
  robots: { index: true, follow: true },
};

/** The page is dark end to end, so the browser chrome should match it. */
export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

/** LocalBusiness data. A gym is a physical place and search treats it as one. */
const schema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "FORGE",
  url: SITE_URL,
  description:
    "Premium strength and conditioning facility in Hyderabad, offering coached strength, conditioning and performance programmes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 14, Road No. 36, Jubilee Hills",
    addressLocality: "Hyderabad",
    postalCode: "500033",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  telephone: "+91 40 2354 8800",
  foundingDate: "2018",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Static object defined above. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-forge-green focus:px-5 focus:py-3 focus:text-forge-black"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
