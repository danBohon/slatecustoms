import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  BuildPhoto,
  BuildSpecs,
  BuildTier,
  CurrentBuild,
  PreviousBuild,
} from "@/types/builds";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const CURRENT_DIR = path.join(CONTENT_ROOT, "current-builds");
const PREVIOUS_DIR = path.join(CONTENT_ROOT, "previous-builds");

const VALID_TIERS: readonly BuildTier[] = ["budget", "mid", "enthusiast"];
const REQUIRED_SPEC_KEYS: readonly (keyof BuildSpecs)[] = [
  "cpu",
  "gpu",
  "ram",
  "storage",
  "motherboard",
  "psu",
  "cooling",
  "case",
];

export function getCurrentBuilds(): CurrentBuild[] {
  return readBuildDir(CURRENT_DIR, parseCurrentBuild).sort(
    (a, b) => a.price - b.price,
  );
}

export function getPreviousBuilds(): PreviousBuild[] {
  return readBuildDir(PREVIOUS_DIR, parsePreviousBuild).sort((a, b) =>
    b.soldDate.localeCompare(a.soldDate),
  );
}

function readBuildDir<T>(
  dir: string,
  parse: (data: Record<string, unknown>, slug: string, file: string) => T,
): T[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const file = path.join(dir, name);
      const slug = name.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);
      return parse(data as Record<string, unknown>, slug, file);
    });
}

function parseCurrentBuild(
  data: Record<string, unknown>,
  slug: string,
  file: string,
): CurrentBuild {
  const status = requireString(data, "status", file);
  if (status !== "available" && status !== "reserved") {
    throw new Error(
      `[${file}] Invalid "status": expected "available" or "reserved", got "${status}"`,
    );
  }
  return {
    slug,
    title: requireString(data, "title", file),
    tier: requireTier(data, file),
    useCase: requireString(data, "useCase", file),
    specs: requireSpecs(data, file),
    photos: requirePhotos(data, file),
    price: requireNumber(data, "price", file),
    status,
  };
}

function parsePreviousBuild(
  data: Record<string, unknown>,
  slug: string,
  file: string,
): PreviousBuild {
  const status = requireString(data, "status", file);
  if (status !== "sold") {
    throw new Error(
      `[${file}] Invalid "status": expected "sold", got "${status}"`,
    );
  }
  const customerNote = data.customerNote;
  if (customerNote !== undefined && typeof customerNote !== "string") {
    throw new Error(`[${file}] "customerNote" must be a string when present`);
  }
  return {
    slug,
    title: requireString(data, "title", file),
    tier: requireTier(data, file),
    useCase: requireString(data, "useCase", file),
    specs: requireSpecs(data, file),
    photos: requirePhotos(data, file),
    soldPrice: requireNumber(data, "soldPrice", file),
    soldDate: requireSoldDate(data, file),
    status,
    ...(customerNote !== undefined ? { customerNote } : {}),
  };
}

function requireString(
  data: Record<string, unknown>,
  key: string,
  file: string,
): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[${file}] Missing or empty required string field "${key}"`);
  }
  return value;
}

function requireNumber(
  data: Record<string, unknown>,
  key: string,
  file: string,
): number {
  const value = data[key];
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`[${file}] Missing or invalid required number field "${key}"`);
  }
  return value;
}

function requireTier(
  data: Record<string, unknown>,
  file: string,
): BuildTier {
  const value = requireString(data, "tier", file);
  if (!VALID_TIERS.includes(value as BuildTier)) {
    throw new Error(
      `[${file}] Invalid "tier": expected one of ${VALID_TIERS.join(", ")}, got "${value}"`,
    );
  }
  return value as BuildTier;
}

function requireSpecs(
  data: Record<string, unknown>,
  file: string,
): BuildSpecs {
  const specs = data.specs;
  if (!specs || typeof specs !== "object" || Array.isArray(specs)) {
    throw new Error(`[${file}] Missing or invalid required object field "specs"`);
  }
  const specsRecord = specs as Record<string, unknown>;
  const result: BuildSpecs = {
    cpu: requireString(specsRecord, "cpu", `${file} > specs`),
    gpu: requireString(specsRecord, "gpu", `${file} > specs`),
    ram: requireString(specsRecord, "ram", `${file} > specs`),
    storage: requireString(specsRecord, "storage", `${file} > specs`),
    motherboard: requireString(specsRecord, "motherboard", `${file} > specs`),
    psu: requireString(specsRecord, "psu", `${file} > specs`),
    cooling: requireString(specsRecord, "cooling", `${file} > specs`),
    case: requireString(specsRecord, "case", `${file} > specs`),
  };
  if (specsRecord.os !== undefined) {
    if (typeof specsRecord.os !== "string") {
      throw new Error(`[${file}] "specs.os" must be a string when present`);
    }
    result.os = specsRecord.os;
  }
  // Surface unexpected spec keys so typos don't go silent
  for (const key of Object.keys(specsRecord)) {
    if (!REQUIRED_SPEC_KEYS.includes(key as keyof BuildSpecs) && key !== "os") {
      throw new Error(`[${file}] Unknown "specs" field "${key}"`);
    }
  }
  return result;
}

function requirePhotos(
  data: Record<string, unknown>,
  file: string,
): BuildPhoto[] {
  const photos = data.photos;
  if (!Array.isArray(photos) || photos.length === 0) {
    throw new Error(`[${file}] "photos" must be a non-empty array`);
  }
  return photos.map((photo, index) => {
    if (!photo || typeof photo !== "object" || Array.isArray(photo)) {
      throw new Error(`[${file}] photos[${index}] must be an object`);
    }
    const p = photo as Record<string, unknown>;
    return {
      src: requireString(p, "src", `${file} > photos[${index}]`),
      alt: requireString(p, "alt", `${file} > photos[${index}]`),
    };
  });
}

function requireSoldDate(
  data: Record<string, unknown>,
  file: string,
): string {
  const value = data.soldDate;
  // YAML parses unquoted dates into Date objects; quoted dates stay strings.
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error(`[${file}] "soldDate" is an invalid date`);
    }
    return value.toISOString().slice(0, 10);
  }
  const str = requireString(data, "soldDate", file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    throw new Error(
      `[${file}] "soldDate" must be ISO date format YYYY-MM-DD, got "${str}"`,
    );
  }
  return str;
}
