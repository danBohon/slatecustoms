import { getCurrentBuilds } from "@/lib/builds";
import { AccentRule } from "./accent-rule";
import { CurrentBuildCard } from "./current-build-card";
import { Section } from "./section";

export function CurrentBuildsSection() {
  const builds = getCurrentBuilds();

  return (
    <Section id="current-builds">
      <div className="mb-10 flex flex-col gap-4">
        <AccentRule />
        <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl">
          Current Builds
        </h2>
      </div>
      {builds.length === 0 ? (
        <p className="font-sans text-text-secondary">
          No builds available right now — check back soon.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build, index) => (
            <li key={build.slug} className="flex flex-col">
              <CurrentBuildCard build={build} priority={index === 0} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
