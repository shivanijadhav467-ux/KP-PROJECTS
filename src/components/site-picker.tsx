import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { useSthal } from "@/lib/store";

export function SitePicker({ className }: { className?: string }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const siteFilter = useSthal((s) => s.siteFilter);
  const setSiteFilter = useSthal((s) => s.setSiteFilter);

  return (
    <Select value={siteFilter} onValueChange={setSiteFilter}>
      <SelectTrigger className={className} aria-label={t(lang, "filterSite")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t(lang, "allSites")}</SelectItem>
        {sites.map((site) => (
          <SelectItem key={site.id} value={site.id}>
            {lang === "mr" ? site.nameMr : site.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
