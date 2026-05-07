import type { Metadata } from "next";
import { AccentRule } from "@/components/accent-rule";
import { ContactSection } from "@/components/contact-section";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About — Local PC Builder Serving Lake County, IL",
  description:
    "About the builder behind these prebuilt gaming PCs. Service area covers Waukegan, Gurnee, Libertyville, Lake Forest, North Chicago, and Lake County.",
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SLATE.",
  description:
    "Locally built and tested prebuilt gaming PCs serving Waukegan, Lake County, and the North Chicago suburbs.",
  url: SITE_URL,
  telephone: "+1-244-338-5301",
  email: "danielbohon@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Waukegan",
    addressRegion: "IL",
    postalCode: "60085",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.3636,
    longitude: -87.8448,
  },
  areaServed: [
    { "@type": "City", name: "Waukegan" },
    { "@type": "City", name: "Gurnee" },
    { "@type": "City", name: "Libertyville" },
    { "@type": "City", name: "Lake Forest" },
    { "@type": "City", name: "North Chicago" },
    { "@type": "AdministrativeArea", name: "Lake County, IL" },
  ],
  priceRange: "$$–$$$",
};

const SERVICE_AREA = [
  "Waukegan",
  "Gurnee",
  "Libertyville",
  "Lake Forest",
  "North Chicago",
  "Lake County broadly",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      {/* Intro */}
      <Section>
        <div className="max-w-2xl">
          <AccentRule className="mb-6" />
          <h1 className="font-sans text-4xl font-extrabold text-text-primary sm:text-5xl">
            About
          </h1>
          <div className="mt-6 flex flex-col gap-4 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
            <p>
              I&apos;ve been building PCs for myself and friends for over 10
              years. What started as a hobby turned into something I couldn&apos;t
              stop doing — every friend group has that one person everyone calls
              when they need a PC built. Eventually it made sense to make it
              official.
            </p>
            <p>
              I started SLATE. because I wanted to make high-performance gaming
              PCs genuinely affordable for people in Lake County. No bloatware,
              no upsells, no big-box markup — just well-researched builds from
              someone who actually cares about the hardware.
            </p>
          </div>
        </div>
      </Section>

      {/* Why buy from me + Service area */}
      <Section className="border-t border-border bg-surface">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <AccentRule />
            <h2 className="font-sans text-2xl font-bold text-text-primary sm:text-3xl">
              Why buy from me
            </h2>
            <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-text-secondary">
              <p>
                I obsess over performance per dollar. Every build starts with
                research — I track deals on new and used parts, know which
                components punch above their price point, and won&apos;t spec a
                build around parts that don&apos;t earn their place. You get the
                most performance your budget allows, not the most margin I can
                squeeze out of it.
              </p>
              <p>
                The details matter too. Cable management, airflow, component
                compatibility, thermal testing before delivery — I treat every
                build like it&apos;s going in my own rig. If I wouldn&apos;t be
                proud to put my name on it, it doesn&apos;t ship.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <AccentRule />
              <h2 className="font-sans text-2xl font-bold text-text-primary sm:text-3xl">
                Service area
              </h2>
              <ul className="flex flex-wrap gap-2">
                {SERVICE_AREA.map((city) => (
                  <li
                    key={city}
                    className="border border-border px-3 py-1 font-sans text-sm text-text-secondary"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 font-sans text-sm text-text-secondary">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">Phone</span>
                <a
                  href="tel:+12243385301"
                  className="transition-colors hover:text-text-primary"
                >
                  (224) 338-5301
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">Email</span>
                <a
                  href="mailto:contact@example.com"
                  className="transition-colors hover:text-text-primary"
                >
                  danielbohon@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">
                  Response time
                </span>
                <span>Usually within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact form */}
      <ContactSection />
    </>
  );
}
