import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { AddLaborDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, useSthal } from "@/lib/store";
import { todayISO } from "@/lib/utils";

export const Route = createFileRoute("/labor")({ component: LaborPage });

function LaborPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const labor = useSthal((s) => s.labor);
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const today = todayISO();
  const list = [...labor]
    .filter((l) => ids.includes(l.siteId))
    .sort((a, b) => b.date.localeCompare(a.date));
  const todays = list.filter((l) => l.date === today);
  const present = todays.reduce((a, l) => a + l.present, 0);
  const planned = todays.reduce((a, l) => a + l.planned, 0);

  return (
    <div>
      <PageHeader
        kicker={t(lang, "field")}
        title={t(lang, "labor")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addLabor")}
          </Button>
        }
      />
      <Card className="mb-4">
        <CardContent className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-muted">{t(lang, "todaysLabor")}</p>
            <p className="mt-1 font-mono text-3xl font-medium tabular-nums">
              {present}
              <span className="text-lg text-muted">/{planned}</span>
            </p>
          </div>
          <div className="w-full max-w-xs">
            <Progress value={planned ? (present / planned) * 100 : 0} />
          </div>
        </CardContent>
      </Card>
      {list.length === 0 ? (
        <EmptyState icon={<Users className="size-8" />} title={t(lang, "emptyLabor")} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {list.map((l) => {
              const site = findSite(sites, l.siteId);
              const pct = l.planned ? Math.round((l.present / l.planned) * 100) : 0;
              return (
                <div key={l.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{lang === "mr" ? l.tradeMr : l.trade}</p>
                    <p className="text-xs text-muted">
                      {site ? siteName(site, lang) : ""} · {formatDate(l.date, lang)}
                    </p>
                  </div>
                  <div className="hidden w-28 sm:block">
                    <Progress value={pct} />
                  </div>
                  <p className="w-16 text-right font-mono text-sm tabular-nums">
                    {l.present}/{l.planned}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
      <AddLaborDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
