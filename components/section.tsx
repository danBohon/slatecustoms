import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  containerClassName?: string;
};

export function Section({
  className = "",
  containerClassName = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`.trim()} {...rest}>
      <div
        className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${containerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
