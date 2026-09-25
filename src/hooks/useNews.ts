import { useEffect, useState } from "react";
import { fetchNews } from "../lib/newsApi";
import { news as fallbackNews } from "../data/news";
import type { NewsItem } from "../data/news";

/** Loads published news for the public pages, starting from the static list. */
export function useNews() {
  const [items, setItems] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchNews()
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
