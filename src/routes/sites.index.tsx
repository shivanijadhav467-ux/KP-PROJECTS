import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AddSiteDialog } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteStatusBadge } from "@/components/status-badge";

import {
  siteLocation,
  siteName,
  siteType,
} from "@/lib/names";

import { t } from "@/lib/i18n";
import { useSthal } from "@/lib/store";

export const Route = createFileRoute("/sites/")({
  component: SitesPage,
});

function SitesPage() {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const deleteSite = useSthal((s) => s.deleteSite);

  const [siteOpen, setSiteOpen] = useState(false);
  const [editSite, setEditSite] = useState<any>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            {t(lang, "sites")}
          </h1>

          <p className="mt-1 text-sm text-muted">
            Construction sites
          </p>
        </div>

        <Button onClick={() => setSiteOpen(true)}>
          + New Site
        </Button>
      </div>

      {sites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted">
              {t(lang, "noneMatch")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="overflow-hidden"
            >
              <div className="h-40 overflow-hidden bg-sheet">
                <img
                  src={site.image}
                  alt=""
                  className="size-full object-cover"
                />
              </div>

              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold">
                      {siteName(site, lang)}
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      {siteLocation(site, lang)}
                    </p>

                    <p className="text-xs text-muted">
                      {siteType(site, lang)}
                    </p>
                  </div>

                  <SiteStatusBadge
                    status={site.status}
                    lang={lang}
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEditSite(site);
                      setSiteOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      const ok = confirm(
                        "Delete this site and all related data?"
                      );

                      if (ok) {
                        deleteSite(site.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>

                <div className="mt-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      window.location.assign(
                        `/sites/${site.id}`
                      );
                    }}
                  >
                    Open Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <AddSiteDialog
        open={siteOpen}
        onOpenChange={(open) => {
          setSiteOpen(open);

          if (!open) {
            setEditSite(null);
          }
        }}
        editSite={editSite}
      />
    </div>
  );
}