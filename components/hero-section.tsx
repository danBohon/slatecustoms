export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 sm:gap-10">
        <h1 className="font-sans text-6xl font-extrabold uppercase leading-none tracking-tight text-[var(--color-text-primary)] sm:text-7xl md:text-8xl lg:text-9xl">
          DANERD
        </h1>
        <p className="font-sans text-lg font-normal text-[var(--color-text-primary)] sm:text-xl md:text-2xl">
          Hand-built, locally tested gaming PCs.
        </p>
        <p className="font-sans text-sm font-medium text-[var(--color-text-secondary)] sm:text-base">
          Waukegan, IL — serving Lake County and the North Chicago suburbs.
        </p>
        <div className="mt-2 flex flex-col items-center gap-4 sm:gap-5">
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-[var(--color-accent)] px-8 py-4 font-sans text-base font-medium uppercase tracking-wider text-[var(--color-text-primary)] transition-[box-shadow,border-color] duration-200 hover:border-[var(--color-accent-hover)] hover:shadow-[var(--shadow-accent-glow)] focus:outline-none focus-visible:border-[var(--color-accent-hover)] focus-visible:shadow-[var(--shadow-accent-glow)] sm:px-10 sm:py-5 sm:text-lg"
          >
            Get in touch
          </a>
          <p className="font-sans text-sm text-[var(--color-text-secondary)] sm:text-base">
            Want an enthusiast-tier build?{" "}
            <a
              href="#contact"
              className="font-medium text-[var(--color-text-primary)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent-hover)]"
            >
              Ask about a custom commission
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
