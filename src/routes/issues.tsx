import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Plus } from "lucide-react";
import { AddIssueDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { IssueStatusBadge, IssueTone } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, useSthal } from "@/lib/store";

export const Route = createFileRoute("/issues")({ component: IssuesPage });

function IssuesPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const issues = useSthal((s) => s.issues);
  const updateIssue = useSthal((s) => s.updateIssue);
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const list = [...issues]
    .filter((i) => ids.includes(i.siteId))
    .sort((a, b) => {
      const rank = { open: 0, in_progress: 1, closed: 2 };
      return rank[a.status] - rank[b.status] || b.date.localeCompare(a.date);
    });

  return (
    <div>
      <PageHeader
        kicker={t(lang, "issues")}
        title={t(lang, "issues")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addIssue")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState
          icon={<AlertTriangle className="size-8" />}
          title={t(lang, "emptyIssues")}
          hint={t(lang, "allCaughtHint")}
        />
      ) : (
        <div className="grid gap-3">
          {list.map((i) => {
            const site = findSite(sites, i.siteId);
            return (
              <Card key={i.id}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <IssueTone severity={i.severity} lang={lang} />
                      <IssueStatusBadge status={i.status} lang={lang} />
                    </div>
                    <h2 className="mt-2 font-medium">{lang === "mr" ? i.titleMr : i.title}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {site ? siteName(site, lang) : ""} · {i.location} · {formatDate(i.date, lang)}
                    </p>
                    <p className="mt-1 text-xs text-subtle">
                      {t(lang, "assignee")}: {i.assignee || "—"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {i.status === "open" ? (
                      <Button variant="outline" size="sm" onClick={() => updateIssue(i.id, { status: "in_progress" })}>
                        {t(lang, "startWork")}
                      </Button>
                    ) : null}
                    {i.status !== "closed" ? (
                      <Button size="sm" onClick={() => updateIssue(i.id, { status: "closed" })}>
                        {t(lang, "markClosed")}
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <AddIssueDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
