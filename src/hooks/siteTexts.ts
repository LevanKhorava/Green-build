import { createContext, useContext } from "react";
import { defaultTexts } from "../data/siteTexts";

export const SiteTextsContext =
  createContext<Record<string, string>>(defaultTexts);

/** `const t = useText(); t("home.hero.title")` */
export function useText() {
  const texts = useContext(SiteTextsContext);
  return (key: string) => texts[key] ?? defaultTexts[key] ?? "";
}
