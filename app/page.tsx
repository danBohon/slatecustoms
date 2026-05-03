import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { CurrentBuildsSection } from "@/components/current-builds-section";
import { PreviousBuildsSection } from "@/components/previous-builds-section";

export const metadata: Metadata = {
  title: "Prebuilt Gaming PCs in Waukegan, IL — Budget to Mid-Tier Builds",
  description:
    "Locally built and tested prebuilt gaming PCs serving Waukegan, Lake County, and the North Chicago suburbs. Custom enthusiast-tier builds available on commission.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CurrentBuildsSection />
      <PreviousBuildsSection />
    </>
  );
}
