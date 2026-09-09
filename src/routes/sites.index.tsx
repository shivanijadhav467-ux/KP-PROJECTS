import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, Plus } from "lucide-react";
import { AddSiteDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SiteStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { daysUntil, formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { siteLocation, siteName, siteType } from "@/lib/names";
import { siteProgress, useSthal } from "@/lib/store";

export const Route = createFileRoute("/sites/")({ component: SitesPage });

function SitesPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const work = useSthal((s) => s.work);
  const siteFilter = useSthal((s) => s.siteFilter);
  const [open, setOpen] = useState(false);
  const list = siteFilter === "all" ? sites : sites.filter((s) => s.id === siteFilter);

  return (
    <div>
      <PageHeader
        kicker={t(lang, "sites")}
        title={t(lang, "sites")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addSite")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          icon={<Building2 className="size-8" />}
          title={t(lang, "emptySites")}
          action={
            <Button onClick={() => setOpen(true)}>
              <Plus />
              {t(lang, "addSite")}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((site) => {
            const pct = siteProgress(work, site.id);
            const left = daysUntil(site.targetDate);
            return (
              <Link key={site.id} to="/sites/$siteId" params={{ siteId: site.id }} className="group">
                <Card className="overflow-hidden transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]">
                  <div className="relative aspect-16/9 overflow-hidden bg-sheet">
                    <img
                      src={site.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-3 left-3">
                      <SiteStatusBadge status={site.status} lang={lang} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="font-display text-lg font-semibold tracking-tight">
                      {siteName(site, lang)}
                    </h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                      <MapPin className="size-3.5" />
                      {siteLocation(site, lang)}
                    </p>
                    <p className="mt-1 text-xs text-subtle">{siteType(site, lang)}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted">{t(lang, "progress")}</span>
                      <span className="font-mono tabular-nums">{pct}%</span>
                    </div>
                    <Progress value={pct} className="mt-2" />
                    <p className="mt-3 text-xs text-subtle">
                      {t(lang, "target")} {formatDate(site.targetDate, lang)}
                      {" · "}
                      {left >= 0
                        ? `${left} ${t(lang, "daysLeft")}`
                        : `${Math.abs(left)} ${t(lang, "delayedBy")}`}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      <AddSiteDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
