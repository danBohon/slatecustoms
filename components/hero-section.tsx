export function HeroSection() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 sm:gap-10">
        <h1 className="font-sans text-6xl font-extrabold uppercase leading-none tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
          SLATE.
        </h1>
        <p className="font-sans text-lg font-normal text-text-primary sm:text-xl md:text-2xl">
          Hand-built gaming PCs. Local pickup in Lake County, IL or
          we&apos;ll ship to you.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center border border-accent px-8 py-4 font-sans text-base font-medium uppercase tracking-wider text-text-primary transition-[box-shadow,border-color] duration-200 hover:border-accent-hover hover:shadow-(--shadow-accent-glow) focus:outline-none focus-visible:border-accent-hover focus-visible:shadow-(--shadow-accent-glow) sm:px-10 sm:py-5 sm:text-lg"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
