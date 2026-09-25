import { supabase } from "./supabase";

const TABLE = "site_texts";

interface TextRow {
  key: string;
  value: string;
}

/** Only the overridden keys — defaults live in src/data/siteTexts.ts. */
export async function fetchTexts(): Promise<Record<string, string>> {
  if (!supabase) return {};

  const { data, error } = await supabase.from(TABLE).select("key, value");

  if (error) {
    console.error("[texts] fetch failed, using defaults:", error.message);
    return {};
  }

  return Object.fromEntries((data as TextRow[]).map((r) => [r.key, r.value]));
}

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase არ არის კონფიგურირებული.");
  }
  return supabase;
}

/** Upserts the given keys; an empty value is stored as-is. */
export async function saveTexts(entries: Record<string, string>) {
  const rows = Object.entries(entries).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));
  if (rows.length === 0) return;

  const { error } = await requireClient()
    .from(TABLE)
    .upsert(rows, { onConflict: "key" });

  if (error) throw new Error(error.message);
}

/** Deletes overrides so the defaults apply again. */
export async function resetTexts(keys: string[]) {
  if (keys.length === 0) return;

  const { error } = await requireClient().from(TABLE).delete().in("key", keys);
  if (error) throw new Error(error.message);
}
