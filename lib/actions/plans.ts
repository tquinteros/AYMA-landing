"use server";

import { neon } from "@neondatabase/serverless";

/** Matches membership cards; DB columns: snake_case + `features` as jsonb or text[]. */
export type Plan = {
  /** Integer serial or UUID string — do not use `Number()` on UUIDs. */
  id: number | string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tag?: string | null;
  bottomText?: string | null;
};

type PlanRow = {
  id: unknown;
  name: string;
  description: string;
  price: string | number | null;
  features: unknown;
  tag: string | null;
  bottom_text: string | null;
};

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parsePlanId(value: unknown): number | string {
  if (value == null) return "";
  if (typeof value === "bigint") {
    const n = Number(value);
    return Number.isSafeInteger(n) ? n : value.toString();
  }
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const t = value.trim();
    if (/^\d+$/.test(t)) {
      const n = Number(t);
      return Number.isSafeInteger(n) ? n : t;
    }
    return t;
  }
  return String(value);
}

function mapRow(row: PlanRow): Plan {
  return {
    id: parsePlanId(row.id),
    name: String(row.name),
    description: String(row.description),
    price: Number(row.price ?? 0),
    features: parseFeatures(row.features),
    tag: row.tag ?? undefined,
    bottomText: row.bottom_text ?? undefined,
  };
}

function getSql() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL is not set");
  return neon(url);
}

/** Fetch all plans for SSR / Server Components. */
export async function getPlans(): Promise<Plan[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, description, price, features, tag, bottom_text
    FROM plans
    ORDER BY id ASC
  `;
  return (rows as PlanRow[]).map(mapRow);
}
