import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { AddDprDialog, AddIssueDialog } from "@/components/forms";
import { IssueStatusBadge, IssueTone, QualityBadge, SafetyTypeBadge, SiteStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daysUntil, formatDate, formatNumber } from "@/lib/format";
import { t } from "@/lib/i18n";
import { siteLocation, siteName, siteType } from "@/lib/names";
import { materialBalance, siteProgress, useSthal } from "@/lib/store";

export const Route = createFileRoute("/sites/$siteId")({ component: SiteDetail });

function SiteDetail() {
  const { siteId } = Route.useParams();
 const work = useSthal(
  useShallow((s) => s.work.filter((w) => w.siteId === siteId))
);

const materials = useSthal(
  useShallow((s) => s.materials.filter((m) => m.siteId === siteId))
);

const dprs = useSthal(
  useShallow((s) => s.dprs.filter((d) => d.siteId === siteId))
);

const issues = useSthal(
  useShallow((s) => s.issues.filter((i) => i.siteId === siteId))
);

const quality = useSthal(
  useShallow((s) => s.quality.filter((q) => q.siteId === siteId))
);

const safety = useSthal(
  useShallow((s) => s.safety.filter((x) => x.siteId === siteId))
);

const labor = useSthal(
  useShallow((s) => s.labor.filter((l) => l.siteId === siteId))
);
  const [dprOpen, setDprOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);

  if (!site) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">{t(lang, "noneMatch")}</p>
        <Link to="/sites" className="mt-3 inline-block text-sm text-primary hover:underline">
          {t(lang, "back")}
        </Link>
      </div>
    );
  }

  const pct = siteProgress(work, site.id);
  const left = daysUntil(site.targetDate);
  const scope = lang === "mr" ? site.scopeMr : site.scope;

  return (
    <div>
      <Link
        to="/sites"
        className="mb-4 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        {t(lang, "sites")}
      </Link>

      <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <div className="relative h-44 overflow-hidden bg-sheet md:h-56">
          <img src={site.image} alt="" className="size-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-semibold tracking-tight">
                  {siteName(site, lang)}
                </h1>
                <SiteStatusBadge status={site.status} lang={lang} />
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                <MapPin className="size-3.5" />
                {siteLocation(site, lang)} · {siteType(site, lang)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIssueOpen(true)}>
                {t(lang, "addIssue")}

              </Button>
              <Button onClick={() => setDprOpen(true)}>{t(lang, "logDpr")}</Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <Meta label={t(lang, "client")} value={site.client} />
            <Meta label={t(lang, "contractor")} value={site.contractor} />
            <Meta label={t(lang, "engineer")} value={site.engineer} />
            <Meta
              label={t(lang, "target")}
              value={
                left >= 0
                  ? `${formatDate(site.targetDate, lang)} · ${left} ${t(lang, "daysLeft")}`
                  : `${formatDate(site.targetDate, lang)} · ${Math.abs(left)} ${t(lang, "delayedBy")}`
              }
            />
          </div>
          <p className="mt-4 text-sm text-muted">{scope}</p>
          <div className="mt-4 flex items-center gap-3">
            <Progress value={pct} className="flex-1" />
            <span className="font-mono text-sm tabular-nums">{pct}%</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="work" className="mt-6">
        <TabsList>
          <TabsTrigger value="work">{t(lang, "work")}</TabsTrigger>
          <TabsTrigger value="dpr">{t(lang, "dpr")}</TabsTrigger>
          <TabsTrigger value="materials">{t(lang, "materials")}</TabsTrigger>
      <TabsTrigger value="labor">{t(lang, "labor")}</TabsTrigger>
          <TabsTrigger value="quality">{t(lang, "quality")}</TabsTrigger>
          <TabsTrigger value="safety">{t(lang, "safety")}</TabsTrigger>
          <TabsTrigger value="issues">{t(lang, "issues")}</TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="text-left text-xs tracking-wide text-muted">
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 font-medium">{t(lang, "name")}</th>
                    <th className="px-5 py-3 font-medium">{t(lang, "unit")}</th>
                    <th className="px-5 py-3 text-right font-medium">{t(lang, "planned")}</th>
                    <th className="px-5 py-3 text-right font-medium">{t(lang, "done")}</th>
                    <th className="px-5 py-3 font-medium">{t(lang, "progress")}</th>
                  </tr>
                </thead>
                <tbody>
                  {work.map((w) => {
                    const p = w.planned ? Math.round((w.done / w.planned) * 100) : 0;
                    return (
                      <tr key={w.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3">{lang === "mr" ? w.nameMr : w.name}</td>
                        <td className="px-5 py-3 text-muted">{w.unit}</td>
                        <td className="px-5 py-3 text-right font-mono tabular-nums">
                          {formatNumber(w.planned)}
                        </td>
                        <td className="px-5 py-3 text-right font-mono tabular-nums">
                          {formatNumber(w.done)}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={p} className="w-24" />
                            <span className="w-10 text-right font-mono text-xs tabular-nums">{p}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dpr">
          <div className="grid gap-3">
            {dprs.map((d) => (
              <Card key={d.id}>
                <CardContent>
                  <p className="text-xs text-muted">{formatDate(d.date, lang)}</p>
                  <p className="mt-1 text-sm">{lang === "mr" ? d.workSummaryMr : d.workSummary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="materials">
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted">
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 font-medium">{t(lang, "item")}</th>
                    <th className="px-5 py-3 text-right font-medium">{t(lang, "balance")}</th>
                    <th className="px-5 py-3 font-medium">{t(lang, "unit")}</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => {
                    const bal = materialBalance(m);
                    const low = bal <= m.reorderAt;
                    return (
                      <tr key={m.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3">{lang === "mr" ? m.nameMr : m.name}</td>
                        <td className={`px-5 py-3 text-right font-mono tabular-nums ${low ? "text-danger" : ""}`}>
                          {formatNumber(bal)}
                        </td>
                        <td className="px-5 py-3 text-muted">{m.unit}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="labor">
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {labor.slice(0, 12).map((l) => (
                <div key={l.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <div>
                    <p>{lang === "mr" ? l.tradeMr : l.trade}</p>
                    <p className="text-xs text-muted">{formatDate(l.date, lang)}</p>
                  </div>
                  <p className="font-mono tabular-nums">
                    {l.present}/{l.planned}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quality">
          <div className="grid gap-3">
            {quality.map((q) => (
              <Card key={q.id}>
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{lang === "mr" ? q.titleMr : q.title}</p>
                    <p className="text-sm text-muted">
                      {q.location} · {formatDate(q.date, lang)}
                    </p>
                  </div>
                  <QualityBadge result={q.result} lang={lang} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="safety">
          <div className="grid gap-3">
            {safety.map((s) => (
              <Card key={s.id}>
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{lang === "mr" ? s.titleMr : s.title}</p>
                    <p className="text-sm text-muted">{s.action}</p>
                  </div>
                  <SafetyTypeBadge type={s.type} lang={lang} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="issues">
          <div className="grid gap-3">
            {issues.map((i) => (
              <Card key={i.id}>
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{lang === "mr" ? i.titleMr : i.title}</p>
                    <p className="text-sm text-muted">
                      {i.location} · {i.assignee}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <IssueTone severity={i.severity} lang={lang} />
                    <IssueStatusBadge status={i.status} lang={lang} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddDprDialog open={dprOpen} onOpenChange={setDprOpen} defaultSiteId={site.id} />
      <AddIssueDialog open={issueOpen} onOpenChange={setIssueOpen} />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}
