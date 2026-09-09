import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus } from "lucide-react";
import { AddMaterialDialog } from "@/components/forms";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { t } from "@/lib/i18n";
import { findSite, siteName } from "@/lib/names";
import { filteredSiteIds, materialBalance, useSthal } from "@/lib/store";

export const Route = createFileRoute("/materials")({ component: MaterialsPage });

function MaterialsPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const materials = useSthal((s) => s.materials);
  const siteFilter = useSthal((s) => s.siteFilter);
  const ids = filteredSiteIds(siteFilter, sites);
  const [open, setOpen] = useState(false);
  const list = materials.filter((m) => ids.includes(m.siteId));

  return (
    <div>
      <PageHeader
        kicker={t(lang, "field")}
        title={t(lang, "materials")}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            {t(lang, "addMaterial")}
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={<Package className="size-8" />} title={t(lang, "emptyMaterials")} />
      ) : (
        <Card>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[40rem] text-sm">
              <thead className="text-left text-xs tracking-wide text-muted">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 font-medium">{t(lang, "item")}</th>
                  <th className="px-5 py-3 font-medium">{t(lang, "filterSite")}</th>
                  <th className="px-5 py-3 text-right font-medium">{t(lang, "received")}</th>
                  <th className="px-5 py-3 text-right font-medium">{t(lang, "consumed")}</th>
                  <th className="px-5 py-3 text-right font-medium">{t(lang, "balance")}</th>
                  <th className="px-5 py-3 font-medium">{t(lang, "status")}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((m) => {
                  const site = findSite(sites, m.siteId);
                  const bal = materialBalance(m);
                  const low = bal <= m.reorderAt;
                  return (
                    <tr key={m.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3">
                        <p className="font-medium">{lang === "mr" ? m.nameMr : m.name}</p>
                        <p className="text-xs text-subtle">{m.unit}</p>
                      </td>
                      <td className="px-5 py-3 text-muted">{site ? siteName(site, lang) : ""}</td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">
                        {formatNumber(m.received)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">
                        {formatNumber(m.consumed)}
                      </td>
                      <td
                        className={`px-5 py-3 text-right font-mono tabular-nums ${low ? "text-danger" : ""}`}
                      >
                        {formatNumber(bal)}
                      </td>
                      <td className="px-5 py-3">
                        {low ? (
                          <Badge tone="danger">{t(lang, "belowReorder")}</Badge>
                        ) : (
                          <Badge tone="ok">{t(lang, "ok")}</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      <AddMaterialDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
