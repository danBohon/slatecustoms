export type BuildTier = "budget" | "mid" | "enthusiast";

export type BuildStatus = "available" | "reserved" | "sold";

export interface BuildPhoto {
  src: string;
  alt: string;
}

export interface BuildSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  psu: string;
  cooling: string;
  case: string;
  os?: string;
}

interface BuildBase {
  slug: string;
  title: string;
  tier: BuildTier;
  useCase: string;
  specs: BuildSpecs;
  photos: BuildPhoto[];
}

export interface CurrentBuild extends BuildBase {
  price: number;
  status: Extract<BuildStatus, "available" | "reserved">;
}

export interface PreviousBuild extends BuildBase {
  soldPrice: number;
  soldDate: string;
  customerNote?: string;
  status: Extract<BuildStatus, "sold">;
}
