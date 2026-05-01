import type { BuildSpecs } from "@/types/builds";

const SPEC_LABELS: Record<keyof BuildSpecs, string> = {
  cpu: "CPU",
  gpu: "GPU",
  ram: "RAM",
  storage: "Storage",
  motherboard: "Motherboard",
  psu: "PSU",
  cooling: "Cooling",
  case: "Case",
  os: "OS",
};

const SPEC_ORDER: (keyof BuildSpecs)[] = [
  "cpu",
  "gpu",
  "ram",
  "storage",
  "motherboard",
  "psu",
  "cooling",
  "case",
  "os",
];

type SpecListProps = {
  specs: BuildSpecs;
  keys?: (keyof BuildSpecs)[];
  className?: string;
};

export function SpecList({
  specs,
  keys = SPEC_ORDER,
  className = "",
}: SpecListProps) {
  return (
    <dl
      className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm ${className}`.trim()}
    >
      {keys.map((key) => {
        const value = specs[key];
        if (value === undefined) return null;
        return (
          <div key={key} className="contents">
            <dt className="text-[var(--color-text-secondary)]">
              {SPEC_LABELS[key]}
            </dt>
            <dd className="text-[var(--color-text-primary)]">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
