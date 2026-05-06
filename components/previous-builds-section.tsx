import { getPreviousBuilds } from "@/lib/builds";
import { AccentRule } from "./accent-rule";
import { PreviousBuildCard } from "./previous-build-card";
import { Section } from "./section";

export function PreviousBuildsSection() {
  const builds = getPreviousBuilds();

  if (builds.length === 0) return null;

  return (
    <Section id="previous-builds">
      <div className="mb-10 flex flex-col gap-4">
        <AccentRule />
        <div className="flex flex-col gap-2">
          <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl">
            Previous Builds
          </h2>
          <p className="font-sans text-sm text-text-secondary sm:text-base">
            Completed and sold builds — a record of the work.
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 [&:has(details[open])]:items-start">
        {builds.map((build) => (
          <li key={build.slug} className="flex flex-col">
            <PreviousBuildCard build={build} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
