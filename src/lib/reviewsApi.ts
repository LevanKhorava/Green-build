import { supabase } from "./supabase";
import { videos as fallbackVideos } from "../data/videos";
import type { Video } from "../data/videos";

export interface ReviewInput {
  youtubeId: string;
  title: string;
  author: string;
}

interface ReviewRow {
  id: string;
  youtube_id: string;
  title: string;
  author: string;
}

const TABLE = "reviews";
const COLUMNS = "id, youtube_id, title, author";

const toVideo = (row: ReviewRow): Video => ({
  id: row.id,
  youtubeId: row.youtube_id,
  title: row.title,
  author: row.author,
});

const toRow = (input: ReviewInput) => ({
  youtube_id: input.youtubeId.trim(),
  title: input.title.trim(),
  author: input.author.trim(),
});

/** Public read. Falls back to the static list when the database is unavailable. */
export async function fetchReviews(): Promise<Video[]> {
  if (!supabase) return fallbackVideos;

  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[reviews] fetch failed, using static fallback:", error.message);
    return fallbackVideos;
  }

  return (data as ReviewRow[]).map(toVideo);
}

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase არ არის კონფიგურირებული.");
  }
  return supabase;
}

export async function createReview(input: ReviewInput): Promise<Video> {
  const { data, error } = await requireClient()
    .from(TABLE)
    .insert(toRow(input))
    .select(COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return toVideo(data as ReviewRow);
}

export async function updateReview(
  id: string,
  input: ReviewInput,
): Promise<Video> {
  const { data, error } = await requireClient()
    .from(TABLE)
    .update(toRow(input))
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return toVideo(data as ReviewRow);
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await requireClient().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
