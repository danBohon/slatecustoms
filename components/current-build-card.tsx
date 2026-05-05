import Image from "next/image";
import type { CurrentBuild } from "@/types/builds";
import { SpecList } from "./spec-list";

type Props = {
  build: CurrentBuild;
  priority?: boolean;
};

export function CurrentBuildCard({ build, priority = false }: Props) {
  const heroPhoto = build.photos[0];
  const additionalPhotos = build.photos.slice(1);
  const formattedPrice = `$${build.price.toLocaleString("en-US")}`;
  const subject = `Interested in: ${formattedPrice} ${build.title}`;
  const ctaHref = `?subject=${encodeURIComponent(subject)}#contact`;

  return (
    <article className="flex h-full flex-col border border-border bg-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <header className="flex flex-col gap-2">
          <h3 className="font-sans text-xl font-bold leading-tight text-[var(--color-text-primary)]">
            {build.title}
          </h3>
          <p className="font-sans text-sm text-[var(--color-text-secondary)]">
            {build.useCase}
          </p>
        </header>
        <p className="font-mono text-3xl font-bold tracking-tight text-[var(--color-accent)]">
          {formattedPrice}
        </p>
        <SpecList specs={build.specs} keys={["cpu", "gpu", "ram"]} />
        <details className="group border-t border-[var(--color-border)] pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
            <span>
              <span className="group-open:hidden">Show full specs</span>
              <span className="hidden group-open:inline">Hide specs</span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-base leading-none text-[var(--color-text-secondary)]"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="mt-4 flex flex-col gap-5">
            <SpecList specs={build.specs} />
            {additionalPhotos.length > 0 && (
              <ul className="grid grid-cols-2 gap-2">
                {additionalPhotos.map((photo) => (
                  <li
                    key={photo.src}
                    className="relative aspect-[4/3] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
        <a
          href={ctaHref}
          className="mt-auto inline-flex items-center justify-center border border-[var(--color-accent)] px-6 py-3 font-sans text-sm font-medium uppercase tracking-wide text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-hover)] hover:text-[var(--color-accent-hover)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
        >
          Inquire about this build
        </a>
      </div>
    </article>
  );
}
