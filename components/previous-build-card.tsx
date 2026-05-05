import Image from "next/image";
import type { PreviousBuild } from "@/types/builds";
import { SpecList } from "./spec-list";

type Props = {
  build: PreviousBuild;
};

export function PreviousBuildCard({ build }: Props) {
  const heroPhoto = build.photos[0];
  const formattedPrice = `$${build.soldPrice.toLocaleString("en-US")}`;

  return (
    <article className="flex h-full flex-col border border-border bg-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-sans text-base font-bold leading-tight text-[var(--color-text-primary)]">
            {build.title}
          </h3>
          <p className="whitespace-nowrap font-mono text-base font-bold text-[var(--color-accent)]">
            {formattedPrice}
          </p>
        </div>
        <p className="font-sans text-sm text-[var(--color-text-secondary)]">
          {build.useCase}
        </p>
        <details className="group border-t border-[var(--color-border)] pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
            <span>
              <span className="group-open:hidden">See specs</span>
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
          <div className="mt-3 flex flex-col gap-4">
            <SpecList specs={build.specs} />
            {build.customerNote && (
              <p className="font-sans text-sm text-[var(--color-text-secondary)]">
                {build.customerNote}
              </p>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
