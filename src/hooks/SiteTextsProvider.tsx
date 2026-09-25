import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fetchTexts } from "../lib/textsApi";
import { defaultTexts } from "../data/siteTexts";
import { SiteTextsContext } from "./siteTexts";

const CACHE_KEY = "greenbuild.siteTexts";

/** Last known overrides, so edited copy doesn't flash back to the defaults. */
function readCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeCache(overrides: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(overrides));
  } catch {
    // Private mode / blocked storage — the site works without the cache.
  }
}

export const SiteTextsProvider = ({ children }: { children: ReactNode }) => {
  const [overrides, setOverrides] = useState<Record<string, string>>(readCache);

  useEffect(() => {
    let active = true;

    fetchTexts().then((data) => {
      if (!active) return;
      setOverrides(data);
      writeCache(data);
    });

    return () => {
      active = false;
    };
  }, []);

  const texts = useMemo(() => ({ ...defaultTexts, ...overrides }), [overrides]);

  return (
    <SiteTextsContext.Provider value={texts}>
      {children}
    </SiteTextsContext.Provider>
  );
};
