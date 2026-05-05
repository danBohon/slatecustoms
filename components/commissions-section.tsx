import { AccentRule } from "./accent-rule";
import { Section } from "./section";

export function CommissionsSection() {
  return (
    <Section id="commissions" className="bg-surface">
      <div className="flex max-w-2xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <AccentRule />
          <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl">
            Custom Commissions
          </h2>
        </div>
        <div className="flex flex-col gap-4 font-sans text-base text-text-secondary sm:text-lg">
          <p>
            Placeholder — your pitch goes here. Tell buyers what an
            enthusiast-tier commission looks like: the process, the build
            quality, why they should come to you instead of a big retailer.
          </p>
          <p>
            Placeholder — budget range, lead time, what you need from them to
            get started.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex w-fit items-center justify-center border border-accent px-8 py-4 font-sans text-base font-medium uppercase tracking-wider text-text-primary transition-[box-shadow,border-color] duration-200 hover:border-[var(--color-accent-hover)] hover:shadow-[var(--shadow-accent-glow)] focus:outline-none focus-visible:border-[var(--color-accent-hover)] focus-visible:shadow-[var(--shadow-accent-glow)]"
        >
          Start a conversation
        </a>
      </div>
    </Section>
  );
}
