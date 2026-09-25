import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config";

/** An unfilled or malformed URL must not count as configured. */
function isUsableUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function createSupabaseClient(): SupabaseClient | null {
  if (!isUsableUrl(SUPABASE_URL) || !SUPABASE_ANON_KEY) return null;
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    // A bad key or URL must never take the whole site down — the public
    // pages fall back to the static list in src/data/news.ts instead.
    console.error("[supabase] client could not be created:", err);
    return null;
  }
}

export const supabase = createSupabaseClient();

export const isSupabaseConfigured = supabase !== null;
