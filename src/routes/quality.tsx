import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, ShieldCheck } from "lucide-react";
import { AddQualityDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { QualityBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, useSthal } from "@/lib/store";

export const Route = createFileRoute("/quality")({ component: QualityPage });

function QualityPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const quality = useSthal(useShallow((s) => s.quality.filter((q) => q.siteId === siteId)));
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const list = [...quality]
    .filter((q) => ids.includes(q.siteId))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <PageHeader
        kicker={t(lang, "field")}
        title={t(lang, "quality")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addQuality")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={<ShieldCheck className="size-8" />} title={t(lang, "emptyQuality")} />
      ) : (
        <div className="grid gap-3">
          {list.map((q) => {
            const site = findSite(sites, q.siteId);
            return (
              <Card key={q.id}>
                <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{lang === "mr" ? q.titleMr : q.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {site ? siteName(site, lang) : ""} · {q.location} · {formatDate(q.date, lang)}
                    </p>
                    {q.notes ? <p className="mt-2 text-sm">{q.notes}</p> : null}
                    <p className="mt-1 text-xs text-subtle">
                      {t(lang, "inspector")}: {q.inspector}
                    </p>
                  </div>
                  <QualityBadge result={q.result} lang={lang} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <AddQualityDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
