import type { BuildSpecs } from "@/types/builds";

const SPEC_LABELS: Record<keyof BuildSpecs, string> = {
  cpu: "CPU",
  gpu: "GPU",
  ram: "RAM",
  storage: "Storage",
  motherboard: "Motherboard",
  psu: "PSU",
  cooling: "Cooling",
  fans: "Fans",
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
  "fans",
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
            <dt className="text-text-secondary">
              {SPEC_LABELS[key]}
            </dt>
            <dd className="text-text-primary">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
