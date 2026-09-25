import { supabase, isSupabaseConfigured } from "./supabase";
import { news as fallbackNews } from "../data/news";
import type { NewsItem } from "../data/news";

export interface NewsInput {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

interface NewsRow {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
}

const TABLE = "news";

const toItem = (row: NewsRow): NewsItem => ({
  id: row.id,
  title: row.title,
  description: row.description,
  date: row.date,
  imageUrl: row.image_url,
});

const toRow = (input: NewsInput) => ({
  title: input.title.trim(),
  description: input.description.trim(),
  date: input.date,
  image_url: input.imageUrl.trim(),
});

/** Public read. Falls back to the static list when the database is unavailable. */
export async function fetchNews(): Promise<NewsItem[]> {
  if (!supabase) return fallbackNews;

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, title, description, date, image_url")
    .order("date", { ascending: false });

  if (error) {
    console.error("[news] fetch failed, using static fallback:", error.message);
    return fallbackNews;
  }

  return (data as NewsRow[]).map(toItem);
}

function requireClient() {
  if (!supabase) {
    throw new Error(
      "Supabase არ არის კონფიგურირებული — შეავსეთ VITE_SUPABASE_URL და VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
}

export async function createNews(input: NewsInput): Promise<NewsItem> {
  const { data, error } = await requireClient()
    .from(TABLE)
    .insert(toRow(input))
    .select("id, title, description, date, image_url")
    .single();

  if (error) throw new Error(error.message);
  return toItem(data as NewsRow);
}

export async function updateNews(
  id: string,
  input: NewsInput,
): Promise<NewsItem> {
  const { data, error } = await requireClient()
    .from(TABLE)
    .update(toRow(input))
    .eq("id", id)
    .select("id, title, description, date, image_url")
    .single();

  if (error) throw new Error(error.message);
  return toItem(data as NewsRow);
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await requireClient().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export { isSupabaseConfigured };
