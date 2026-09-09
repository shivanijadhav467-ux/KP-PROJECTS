import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ClipboardList,
  HardHat,
  Package,
  Plus,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AddDprDialog } from "@/components/forms";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IssueTone, SiteStatusBadge, WeatherLabel } from "@/components/status-badge";
import { formatDate, formatDay, lastDays } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import {
  filteredSiteIds,
  laborToday,
  materialBalance,
  siteProgress,
  useSthal,
} from "@/lib/store";
import { todayISO } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const work = useSthal((s) => s.work);
  const labor = useSthal((s) => s.labor);
  const dprs = useSthal((s) => s.dprs);
  const materials = useSthal((s) => s.materials);
  const issues = useSthal((s) => s.issues);
  const safety = useSthal((s) => s.safety);
  const siteFilter = useSthal((s) => s.siteFilter);
  const [dprOpen, setDprOpen] = useState(false);

  const ids = filteredSiteIds(siteFilter, sites);
  const today = todayISO();
  const active = sites.filter((s) => ids.includes(s.id) && s.status !== "completed");
  const openIssues = issues.filter((i) => ids.includes(i.siteId) && i.status !== "closed");
  const alerts = materials.filter(
    (m) => ids.includes(m.siteId) && materialBalance(m) <= m.reorderAt,
  );
  const laborCount = laborToday(labor, ids, today);
  const todayDprs = dprs.filter((d) => d.date === today && ids.includes(d.siteId));
  const missingDpr = active.filter((s) => !todayDprs.some((d) => d.siteId === s.id));
  const openSafety = safety.filter((s) => ids.includes(s.siteId) && !s.closed);
  const recent = [...dprs]
    .filter((d) => ids.includes(d.siteId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const days = lastDays(7);
  const chart = days.map((iso) => {
    const dayLabor = labor
      .filter((l) => l.date === iso && ids.includes(l.siteId))
      .reduce((a, l) => a + l.present, 0);
    const fallback = dprs
      .filter((d) => d.date === iso && ids.includes(d.siteId))
      .reduce((a, d) => a + d.laborCount, 0);
    const dt = new Date(iso + "T00:00:00");
    return {
      label: lang === "mr" ? `${dt.getDate()}` : dt.toLocaleDateString("en-IN", { weekday: "short" }),
      labor: dayLabor || fallback,
    };
  });

  const overall =
    ids.length === 0
      ? 0
      : Math.round(ids.reduce((a, id) => a + siteProgress(work, id), 0) / ids.length);

  return (
    <div>
      <PageHeader
        kicker={formatDay(today, lang)}
        title={t(lang, "greeting")}
        action={
          <Button onClick={() => setDprOpen(true)}>
            <Plus />
            {t(lang, "logDpr")}
          </Button>
        }
      />
      <p className="-mt-3 mb-6 text-sm text-muted">{t(lang, "greetingSub")}</p>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={t(lang, "activeSites")} value={String(active.length)} hint={t(lang, "sites")} />
        <Kpi
          label={t(lang, "laborOnSite")}
          value={String(laborCount)}
          hint={t(lang, "men")}
        />
        <Kpi
          label={t(lang, "openIssues")}
          value={String(openIssues.length)}
          hint={openIssues.some((i) => i.severity === "critical") ? t(lang, "critical") : t(lang, "issues")}
          warn={openIssues.length > 0}
        />
        <Kpi
          label={t(lang, "stockAlerts")}
          value={String(alerts.length)}
          hint={alerts.length ? t(lang, "belowReorder") : t(lang, "ok")}
          warn={alerts.length > 0}
        />
      </div>

      {missingDpr.length > 0 ? (
        <Card className="mb-5">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-warn-bg text-warn">
              <ClipboardList className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{t(lang, "noDprToday")}</p>
              <p className="text-sm text-muted">
                {missingDpr.map((s) => siteName(s, lang)).join(" · ")} — {t(lang, "noDprTodayHint")}
              </p>
            </div>
            <Button onClick={() => setDprOpen(true)} className="shrink-0">
              {t(lang, "logDpr")}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardContent>
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest text-muted uppercase">
                  {t(lang, "overallProgress")}
                </p>
                <p className="mt-1 font-mono text-3xl font-medium tabular-nums">{overall}%</p>
              </div>
              <p className="text-sm text-muted">{t(lang, "weeklyWork")}</p>
            </div>
            <Progress value={overall} className="mb-6" />
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} barSize={18}>
                  <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "var(--color-sheet)" }}
                    contentStyle={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="labor" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {sites
                .filter((s) => ids.includes(s.id))
                .map((s) => {
                  const pct = siteProgress(work, s.id);
                  return (
                    <li key={s.id} className="flex items-center gap-3 py-3">
                      <img
                        src={s.image}
                        alt=""
                        className="size-11 rounded-sm object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to="/sites/$siteId"
                            params={{ siteId: s.id }}
                            className="truncate font-medium hover:underline"
                          >
                            {siteName(s, lang)}
                          </Link>
                          <SiteStatusBadge status={s.status} lang={lang} />
                        </div>
                        <Progress value={pct} className="mt-2" />
                      </div>
                      <span className="font-mono text-sm tabular-nums text-muted">{pct}%</span>
                    </li>
                  );
                })}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardContent>
              <SectionHead title={t(lang, "recentDpr")} to="/dpr" lang={lang} />
              {recent.length === 0 ? (
                <EmptyState icon={<ClipboardList className="size-6" />} title={t(lang, "emptyDpr")} />
              ) : (
                <ul className="divide-y divide-border">
                  {recent.map((d) => {
                    const site = findSite(sites, d.siteId);
                    return (
                      <li key={d.id} className="py-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">
                            {site ? siteName(site, lang) : d.siteId}
                          </p>
                          <span className="text-xs text-muted">{formatDate(d.date, lang)}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">
                          {lang === "mr" ? d.workSummaryMr : d.workSummary}
                        </p>
                        <p className="mt-1 text-xs text-subtle">
                          {WeatherLabel({ weather: d.weather, lang })} · {d.laborCount} {t(lang, "men")}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionHead title={t(lang, "openIssues")} to="/issues" lang={lang} />
              {openIssues.length === 0 ? (
                <EmptyState
                  icon={<AlertTriangle className="size-6" />}
                  title={t(lang, "allCaught")}
                  hint={t(lang, "allCaughtHint")}
                />
              ) : (
                <ul className="divide-y divide-border">
                  {openIssues.slice(0, 4).map((i) => {
                    const site = findSite(sites, i.siteId);
                    return (
                      <li key={i.id} className="flex items-start justify-between gap-2 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {lang === "mr" ? i.titleMr : i.title}
                          </p>
                          <p className="text-xs text-muted">
                            {site ? siteName(site, lang) : ""} · {i.location}
                          </p>
                        </div>
                        <IssueTone severity={i.severity} lang={lang} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Mini
          icon={<Package className="size-4" />}
          title={t(lang, "materialWatch")}
          to="/materials"
          empty={alerts.length === 0}
          emptyTitle={t(lang, "stockOk")}
          emptyHint={t(lang, "stockOkHint")}
        >
          {alerts.slice(0, 3).map((m) => (
            <p key={m.id} className="flex justify-between py-1.5 text-sm">
              <span className="truncate">{lang === "mr" ? m.nameMr : m.name}</span>
              <span className="font-mono tabular-nums text-danger">
                {materialBalance(m)} {m.unit}
              </span>
            </p>
          ))}
        </Mini>
        <Mini
          icon={<Users className="size-4" />}
          title={t(lang, "todaysLabor")}
          to="/labor"
          empty={laborCount === 0}
          emptyTitle={t(lang, "emptyLabor")}
        >
          {labor
            .filter((l) => l.date === today && ids.includes(l.siteId))
            .slice(0, 5)
            .map((l) => (
              <p key={l.id} className="flex justify-between py-1.5 text-sm">
                <span>{lang === "mr" ? l.tradeMr : l.trade}</span>
                <span className="font-mono tabular-nums">
                  {l.present}/{l.planned}
                </span>
              </p>
            ))}
        </Mini>
        <Mini
          icon={<HardHat className="size-4" />}
          title={t(lang, "safetyPulse")}
          to="/safety"
          empty={openSafety.length === 0}
          emptyTitle={t(lang, "safetyOk")}
          emptyHint={t(lang, "safetyOkHint")}
        >
          {openSafety.slice(0, 3).map((s) => (
            <p key={s.id} className="py-1.5 text-sm">
              {lang === "mr" ? s.titleMr : s.title}
            </p>
          ))}
        </Mini>
      </div>

      <AddDprDialog open={dprOpen} onOpenChange={setDprOpen} />
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-medium tracking-wide text-muted">{label}</p>
        <p className={`mt-2 font-mono text-3xl font-medium tabular-nums ${warn ? "text-danger" : "text-ink"}`}>
          {value}
        </p>
        <p className="mt-1 text-xs text-subtle">{hint}</p>
      </CardContent>
    </Card>
  );
}

function SectionHead({ title, to, lang }: { title: string; to: string; lang: "en" | "mr" }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="text-xs font-medium tracking-widest text-muted uppercase">{title}</p>
      <Link to={to} className="text-xs font-medium text-primary hover:underline">
        {t(lang, "viewAll")}
      </Link>
    </div>
  );
}

function Mini({
  icon,
  title,
  to,
  children,
  empty,
  emptyTitle,
  emptyHint,
}: {
  icon: ReactNode;
  title: string;
  to: string;
  children: ReactNode;
  empty: boolean;
  emptyTitle: string;
  emptyHint?: string;
}) {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-muted uppercase">
            {icon}
            {title}
          </p>
          <Link to={to} className="text-xs font-medium text-primary hover:underline">
            →
          </Link>
        </div>
        {empty ? (
          <p className="py-4 text-sm text-muted">
            {emptyTitle}
            {emptyHint ? <span className="mt-1 block text-xs text-subtle">{emptyHint}</span> : null}
          </p>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
