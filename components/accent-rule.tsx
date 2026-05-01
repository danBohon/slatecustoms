type AccentRuleProps = {
  className?: string;
};

export function AccentRule({ className = "" }: AccentRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-12 bg-[var(--color-accent)] ${className}`.trim()}
    />
  );
}
