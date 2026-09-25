import { useEffect, useState } from "react";
import { fetchReviews } from "../lib/reviewsApi";
import { videos as fallbackVideos } from "../data/videos";
import type { Video } from "../data/videos";

/** Loads published review videos, starting from the static list. */
export function useReviews() {
  const [items, setItems] = useState<Video[]>(fallbackVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchReviews()
      .then((data) => {
        if (active) setItems(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { items, loading };
}
