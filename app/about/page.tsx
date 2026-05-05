import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "About — Local PC Builder Serving Lake County, IL",
  description:
    "About the builder behind these prebuilt gaming PCs. Service area covers Waukegan, Gurnee, Libertyville, Lake Forest, North Chicago, and Lake County.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <h1 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl">
        About
      </h1>
      <p className="mt-6 font-sans text-text-secondary">
        Placeholder — your about content goes here.
      </p>
      <div className="mt-16">
        <Suspense>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
