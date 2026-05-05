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
  name: "Danerd",
  description:
    "Locally built and tested prebuilt gaming PCs serving Waukegan, Lake County, and the North Chicago suburbs.",
  url: SITE_URL,
  telephone: "+1-555-000-0000",
  email: "contact@example.com",
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
          <p className="mt-6 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
            Placeholder — your bio goes here. Who you are, how you got into
            building PCs, why you started doing this locally.
          </p>
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
                Placeholder — what makes these builds different. Your standards,
                your testing process, why a local builder beats a big retailer.
              </p>
              <p>
                Placeholder — your approach to component selection, build
                quality, cable management, whatever matters to you.
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
                  href="tel:+15550000000"
                  className="transition-colors hover:text-text-primary"
                >
                  (555) 000-0000
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">Email</span>
                <a
                  href="mailto:contact@example.com"
                  className="transition-colors hover:text-text-primary"
                >
                  contact@example.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">
                  Response time
                </span>
                <span>Usually within 24 hours.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">Hours</span>
                <span>Placeholder — your availability here.</span>
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
