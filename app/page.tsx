import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { CurrentBuildsSection } from "@/components/current-builds-section";
import { PreviousBuildsSection } from "@/components/previous-builds-section";
import { CommissionsSection } from "@/components/commissions-section";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Prebuilt Gaming PCs in Waukegan, IL — Local Pickup or Shipped",
  description:
    "Hand-built gaming PCs from a local builder in Lake County, IL. Local pickup or shipped to your door. Custom enthusiast commissions available.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CurrentBuildsSection />
      <PreviousBuildsSection />
      <CommissionsSection />
      <ContactSection />
    </>
  );
}
