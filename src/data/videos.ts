export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  author: string;
}

/**
 * Fallback list, shown when Supabase is not configured or unreachable.
 * Everything managed through /admin/reviews lives in the database instead.
 */
export const videos: Video[] = [
  { id: "static-1", youtubeId: "Dv6Ewpn2w5g", title: "ვიდეო 1", author: "ანა ნაზარიანი" },
  { id: "static-2", youtubeId: "5hmAV373oRA", title: "ვიდეო 2", author: "დიმიტრი კრემერი" },
  { id: "static-3", youtubeId: "R4Y0kHgCK6s", title: "ვიდეო 3", author: "ზურაბ გონაშვილი" },
  { id: "static-4", youtubeId: "n7jltvM_UKw", title: "ვიდეო 4", author: "მაია გიორგაძე" },
  { id: "static-5", youtubeId: "rBfxflgmIF4", title: "ვიდეო 5", author: "თეიმურ გომელაური" },
];

export const thumbnailUrl = (youtubeId: string) =>
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

export const embedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

/** Accepts a bare id or any YouTube URL (watch, youtu.be, embed, shorts). */
export function parseYoutubeId(input: string): string {
  const value = input.trim();
  if (!value) return "";
  if (!value.includes("/") && !value.includes("?")) return value;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;

    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  } catch {
    return value;
  }
}
