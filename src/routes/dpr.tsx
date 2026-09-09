import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Cloud, CloudRain, Plus, Sun, Thermometer } from "lucide-react";
import { AddDprDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, useSthal } from "@/lib/store";
import type { Weather } from "@/lib/types";

export const Route = createFileRoute("/dpr")({ component: DprPage });

const ICONS: Record<Weather, typeof Sun> = {
  clear: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  hot: Thermometer,
};

function DprPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const dprs = useSthal((s) => s.dprs);
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const list = [...dprs]
    .filter((d) => ids.includes(d.siteId))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  return (
    <div>
      <PageHeader
        kicker={t(lang, "dprFor")}
        title={t(lang, "dpr")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addDpr")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="size-8" />}
          title={t(lang, "emptyDpr")}
          action={
            <Button onClick={() => setOpen(true)}>
              <Plus />
              {t(lang, "addDpr")}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {list.map((d) => {
            const site = findSite(sites, d.siteId);
            const Icon = ICONS[d.weather];
            const work = lang === "mr" ? d.workSummaryMr : d.workSummary;
            const delays = lang === "mr" ? d.delaysMr : d.delays;
            const remarks = lang === "mr" ? d.remarksMr : d.remarks;
            return (
              <Card key={d.id}>
                <CardContent className="grid gap-4 md:grid-cols-[1fr_12rem]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-base font-semibold">
                        {site ? siteName(site, lang) : d.siteId}
                      </p>
                      <span className="text-xs text-muted">{formatDate(d.date, lang)}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Icon className="size-3.5" />
                        {t(lang, d.weather)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{work}</p>
                    <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-muted">{t(lang, "laborCount")}</dt>
                        <dd className="font-mono tabular-nums">
                          {d.laborCount} {t(lang, "men")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted">{t(lang, "engineer")}</dt>
                        <dd>{d.engineer || "—"}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-muted">{t(lang, "delays")}</dt>
                        <dd>{delays || "—"}</dd>
                      </div>
                      {remarks ? (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-muted">{t(lang, "remarks")}</dt>
                          <dd>{remarks}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                  {d.photos[0] ? (
                    <img
                      src={d.photos[0]}
                      alt=""
                      className="h-40 w-full rounded-md object-cover md:h-full"
                    />
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-md bg-sheet text-xs text-muted md:h-auto">
                      {t(lang, "noPhoto")}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <AddDprDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
