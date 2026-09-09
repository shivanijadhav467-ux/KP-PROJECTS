import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Plus } from "lucide-react";
import { AddSafetyDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SafetySevBadge, SafetyTypeBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, useSthal } from "@/lib/store";

export const Route = createFileRoute("/safety")({ component: SafetyPage });

function SafetyPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const safety = useSthal((s) => s.safety);
  const updateSafety = useSthal((s) => s.updateSafety);
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const list = [...safety]
    .filter((s) => ids.includes(s.siteId))
    .sort((a, b) => Number(a.closed) - Number(b.closed) || b.date.localeCompare(a.date));

  return (
    <div>
      <PageHeader
        kicker={t(lang, "field")}
        title={t(lang, "safety")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addSafety")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          icon={<HardHat className="size-8" />}
          title={t(lang, "emptySafety")}
          hint={t(lang, "safetyOkHint")}
        />
      ) : (
        <div className="grid gap-3">
          {list.map((s) => {
            const site = findSite(sites, s.siteId);
            return (
              <Card key={s.id} className={s.closed ? "opacity-70" : ""}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <SafetyTypeBadge type={s.type} lang={lang} />
                      <SafetySevBadge severity={s.severity} lang={lang} />
                    </div>
                    <h2 className="mt-2 font-medium">{lang === "mr" ? s.titleMr : s.title}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {site ? siteName(site, lang) : ""} · {formatDate(s.date, lang)}
                    </p>
                    <p className="mt-2 text-sm">{s.action}</p>
                  </div>
                  {!s.closed ? (
                    <Button size="sm" onClick={() => updateSafety(s.id, { closed: true })}>
                      {t(lang, "markClosed")}
                    </Button>
                  ) : (
                    <p className="text-xs text-muted">{t(lang, "closed")}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <AddSafetyDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
