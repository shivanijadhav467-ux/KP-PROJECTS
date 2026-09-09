import type { Lang, Site } from "./types";

export function siteName(site: Site, lang: Lang) {
  return lang === "mr" ? site.nameMr : site.name;
}

export function siteLocation(site: Site, lang: Lang) {
  return lang === "mr" ? site.locationMr : site.location;
}

export function siteType(site: Site, lang: Lang) {
  return lang === "mr" ? site.typeMr : site.type;
}

export function findSite(sites: Site[], id: string) {
  return sites.find((s) => s.id === id);
}
