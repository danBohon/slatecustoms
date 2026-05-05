import { Suspense } from "react";
import { AccentRule } from "./accent-rule";
import { ContactForm } from "./contact-form";
import { Section } from "./section";

function ContactFormFallback() {
  return (
    <div className="h-64 w-full animate-pulse bg-surface-2" aria-hidden="true" />
  );
}

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-4 lg:w-72 lg:shrink-0">
          <AccentRule />
          <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl">
            Get in Touch
          </h2>
          <p className="font-sans text-sm text-text-secondary sm:text-base">
            Interested in a build or want to talk about a custom commission?
            Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <div className="flex-1">
          <Suspense fallback={<ContactFormFallback />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
