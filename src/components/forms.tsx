import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/i18n";
import { compressPhoto } from "@/lib/photos";
import { useSthal } from "@/lib/store";
import type {
  IssueSeverity,
  QualityResult,
  SafetySeverity,
  SafetyType,
  SiteStatus,
  Weather,
} from "@/lib/types";
import { todayISO, uid } from "@/lib/utils";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}

export function AddSiteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const addSite = useSthal((s) => s.addSite);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    if (!name) return;
    const id = uid("s");
    addSite({
      id,
      name,
      nameMr: name,
      location: String(fd.get("location") ?? ""),
      locationMr: String(fd.get("location") ?? ""),
      client: String(fd.get("client") ?? ""),
      contractor: String(fd.get("contractor") ?? ""),
      type: String(fd.get("type") ?? ""),
      typeMr: String(fd.get("type") ?? ""),
      status: (String(fd.get("status") ?? "active") as SiteStatus) || "active",
      startDate: String(fd.get("start") ?? todayISO()),
      targetDate: String(fd.get("target") ?? todayISO()),
      engineer: String(fd.get("engineer") ?? ""),
      image: "/sites/sahyadri.jpg",
      scope: String(fd.get("scope") ?? ""),
      scopeMr: String(fd.get("scope") ?? ""),
    });
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newSite")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "siteName")}>
              <Input name="name" required placeholder="Sahyadri Heights" />
            </Field>
            <Field label={t(lang, "location")}>
              <Input name="location" placeholder={t(lang, "locationPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "client")}>
                <Input name="client" placeholder={t(lang, "clientPh")} />
              </Field>
              <Field label={t(lang, "contractor")}>
                <Input name="contractor" placeholder={t(lang, "contractorPh")} />
              </Field>
            </div>
            <Field label={t(lang, "type")}>
              <Input name="type" placeholder={t(lang, "typePh")} />
            </Field>
            <Field label={t(lang, "engineer")}>
              <Input name="engineer" placeholder={t(lang, "engineerPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "start")}>
                <Input name="start" type="date" defaultValue={todayISO()} />
              </Field>
              <Field label={t(lang, "target")}>
                <Input name="target" type="date" />
              </Field>
            </div>
            <Field label={t(lang, "scope")}>
              <Input name="scope" placeholder={t(lang, "floorsOrSpan")} />
            </Field>
            <input type="hidden" name="status" value="active" />
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddDprDialog({
  open,
  onOpenChange,
  defaultSiteId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultSiteId?: string;
}) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const addDpr = useSthal((s) => s.addDpr);
  const siteFilter = useSthal((s) => s.siteFilter);
  const [photos, setPhotos] = useState<string[]>([]);
  const preset = defaultSiteId ?? (siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "");

  async function onFiles(files: FileList | null) {
    if (!files) return;
    const next: string[] = [];
    for (const file of Array.from(files).slice(0, 3)) {
      next.push(await compressPhoto(file));
    }
    setPhotos((p) => [...p, ...next].slice(0, 4));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const siteId = String(fd.get("siteId") ?? "");
    const work = String(fd.get("work") ?? "").trim();
    if (!siteId || !work) return;
    addDpr({
      id: uid("dpr"),
      siteId,
      date: String(fd.get("date") ?? todayISO()),
      weather: (String(fd.get("weather") ?? "clear") as Weather) || "clear",
      workSummary: work,
      workSummaryMr: work,
      laborCount: Number(fd.get("labor") ?? 0) || 0,
      delays: String(fd.get("delays") ?? ""),
      delaysMr: String(fd.get("delays") ?? ""),
      remarks: String(fd.get("remarks") ?? ""),
      remarksMr: String(fd.get("remarks") ?? ""),
      engineer: String(fd.get("engineer") ?? ""),
      photos,
    });
    toast.success(t(lang, "saved"));
    setPhotos([]);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newDpr")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "filterSite")}>
              <select
                name="siteId"
                defaultValue={preset}
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "mr" ? s.nameMr : s.name}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "date")}>
                <Input name="date" type="date" defaultValue={todayISO()} />
              </Field>
              <Field label={t(lang, "weather")}>
                <select
                  name="weather"
                  defaultValue="clear"
                  className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                >
                  <option value="clear">{t(lang, "clear")}</option>
                  <option value="cloudy">{t(lang, "cloudy")}</option>
                  <option value="rain">{t(lang, "rain")}</option>
                  <option value="hot">{t(lang, "hot")}</option>
                </select>
              </Field>
            </div>
            <Field label={t(lang, "workDone")}>
              <Textarea name="work" required placeholder={t(lang, "workPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "laborCount")}>
                <Input name="labor" type="number" min={0} defaultValue={0} />
              </Field>
              <Field label={t(lang, "engineer")}>
                <Input name="engineer" placeholder={t(lang, "engineerPh")} />
              </Field>
            </div>
            <Field label={t(lang, "delays")}>
              <Input name="delays" placeholder={t(lang, "delayPh")} />
            </Field>
            <Field label={t(lang, "remarks")}>
              <Textarea name="remarks" placeholder={t(lang, "remarkPh")} />
            </Field>
            <Field label={t(lang, "photos")}>
              <Input type="file" accept="image/*" multiple onChange={(e) => void onFiles(e.target.files)} />
              {photos.length ? (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {photos.map((src) => (
                    <img key={src.slice(0, 24)} src={src} alt="" className="h-16 w-full rounded-sm object-cover" />
                  ))}
                </div>
              ) : null}
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddIssueDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const addIssue = useSthal((s) => s.addIssue);
  const siteFilter = useSthal((s) => s.siteFilter);
  const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const siteId = String(fd.get("siteId") ?? "");
    if (!title || !siteId) return;
    addIssue({
      id: uid("i"),
      siteId,
      date: todayISO(),
      title,
      titleMr: title,
      location: String(fd.get("location") ?? ""),
      severity: (String(fd.get("severity") ?? "major") as IssueSeverity) || "major",
      status: "open",
      assignee: String(fd.get("assignee") ?? ""),
    });
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newIssue")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "filterSite")}>
              <select
                name="siteId"
                defaultValue={preset}
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "mr" ? s.nameMr : s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t(lang, "title")}>
              <Input name="title" required placeholder={t(lang, "issuePh")} />
            </Field>
            <Field label={t(lang, "location")}>
              <Input name="location" placeholder={t(lang, "locationPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "severity")}>
                <select
                  name="severity"
                  defaultValue="major"
                  className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                >
                  <option value="critical">{t(lang, "critical")}</option>
                  <option value="major">{t(lang, "major")}</option>
                  <option value="minor">{t(lang, "minor")}</option>
                </select>
              </Field>
              <Field label={t(lang, "assignee")}>
                <Input name="assignee" />
              </Field>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddMaterialDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const materials = useSthal((s) => s.materials);
  const addMaterial = useSthal((s) => s.addMaterial);
  const moveMaterial = useSthal((s) => s.moveMaterial);
  const siteFilter = useSthal((s) => s.siteFilter);
  const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
  const [mode, setMode] = useState<"new" | "move">("move");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (mode === "move") {
      const id = String(fd.get("materialId") ?? "");
      const qty = Number(fd.get("qty") ?? 0);
      const kind = (String(fd.get("kind") ?? "receipt") as "receipt" | "consumption") || "receipt";
      if (!id || !qty) return;
      moveMaterial(id, kind, qty);
    } else {
      const name = String(fd.get("name") ?? "").trim();
      const siteId = String(fd.get("siteId") ?? "");
      if (!name || !siteId) return;
      addMaterial({
        id: uid("m"),
        siteId,
        name,
        nameMr: name,
        unit: String(fd.get("unit") ?? ""),
        received: Number(fd.get("received") ?? 0) || 0,
        consumed: 0,
        reorderAt: Number(fd.get("reorder") ?? 0) || 0,
      });
    }
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  const siteMats = materials.filter((m) => (siteFilter === "all" ? true : m.siteId === siteFilter));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newMaterial")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-sheet p-1">
              <button
                type="button"
                className={`h-9 rounded-md text-sm ${mode === "move" ? "bg-surface shadow-sm" : "text-muted"}`}
                onClick={() => setMode("move")}
              >
                {t(lang, "movement")}
              </button>
              <button
                type="button"
                className={`h-9 rounded-md text-sm ${mode === "new" ? "bg-surface shadow-sm" : "text-muted"}`}
                onClick={() => setMode("new")}
              >
                {t(lang, "item")}
              </button>
            </div>
            {mode === "move" ? (
              <>
                <Field label={t(lang, "item")}>
                  <select name="materialId" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm">
                    {siteMats.map((m) => (
                      <option key={m.id} value={m.id}>
                        {lang === "mr" ? m.nameMr : m.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label={t(lang, "movement")}>
                    <select name="kind" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm">
                      <option value="receipt">{t(lang, "receipt")}</option>
                      <option value="consumption">{t(lang, "consumption")}</option>
                    </select>
                  </Field>
                  <Field label={t(lang, "qty")}>
                    <Input name="qty" type="number" min={0} step="0.1" required />
                  </Field>
                </div>
              </>
            ) : (
              <>
                <Field label={t(lang, "filterSite")}>
                  <select
                    name="siteId"
                    defaultValue={preset}
                    className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                  >
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === "mr" ? s.nameMr : s.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t(lang, "name")}>
                  <Input name="name" required placeholder={t(lang, "materialNamePh")} />
                </Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label={t(lang, "unit")}>
                    <Input name="unit" placeholder={t(lang, "unitPh")} />
                  </Field>
                  <Field label={t(lang, "received")}>
                    <Input name="received" type="number" min={0} defaultValue={0} />
                  </Field>
                  <Field label={t(lang, "reorder")}>
                    <Input name="reorder" type="number" min={0} defaultValue={0} />
                  </Field>
                </div>
              </>
            )}
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddLaborDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const addLabor = useSthal((s) => s.addLabor);
  const siteFilter = useSthal((s) => s.siteFilter);
  const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const trade = String(fd.get("trade") ?? "").trim();
    const siteId = String(fd.get("siteId") ?? "");
    if (!trade || !siteId) return;
    addLabor({
      id: uid("l"),
      siteId,
      date: String(fd.get("date") ?? todayISO()),
      trade,
      tradeMr: trade,
      present: Number(fd.get("present") ?? 0) || 0,
      planned: Number(fd.get("planned") ?? 0) || 0,
    });
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newLabor")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "filterSite")}>
              <select
                name="siteId"
                defaultValue={preset}
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "mr" ? s.nameMr : s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t(lang, "date")}>
              <Input name="date" type="date" defaultValue={todayISO()} />
            </Field>
            <Field label={t(lang, "trade")}>
              <Input name="trade" required placeholder={t(lang, "tradePh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "present")}>
                <Input name="present" type="number" min={0} defaultValue={0} />
              </Field>
              <Field label={t(lang, "planned")}>
                <Input name="planned" type="number" min={0} defaultValue={0} />
              </Field>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddQualityDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const addQuality = useSthal((s) => s.addQuality);
  const siteFilter = useSthal((s) => s.siteFilter);
  const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const siteId = String(fd.get("siteId") ?? "");
    if (!title || !siteId) return;
    addQuality({
      id: uid("q"),
      siteId,
      date: todayISO(),
      title,
      titleMr: title,
      location: String(fd.get("location") ?? ""),
      result: (String(fd.get("result") ?? "pass") as QualityResult) || "pass",
      notes: String(fd.get("notes") ?? ""),
      inspector: String(fd.get("inspector") ?? ""),
    });
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newQuality")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "filterSite")}>
              <select
                name="siteId"
                defaultValue={preset}
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "mr" ? s.nameMr : s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t(lang, "title")}>
              <Input name="title" required placeholder={t(lang, "qualityPh")} />
            </Field>
            <Field label={t(lang, "location")}>
              <Input name="location" placeholder={t(lang, "locationPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "result")}>
                <select name="result" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm">
                  <option value="pass">{t(lang, "pass")}</option>
                  <option value="fail">{t(lang, "fail")}</option>
                  <option value="hold">{t(lang, "hold")}</option>
                </select>
              </Field>
              <Field label={t(lang, "inspector")}>
                <Input name="inspector" />
              </Field>
            </div>
            <Field label={t(lang, "notes")}>
              <Textarea name="notes" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AddSafetyDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const lang = useSthal((s) => s.lang);
  const sites = useSthal((s) => s.sites);
  const addSafety = useSthal((s) => s.addSafety);
  const siteFilter = useSthal((s) => s.siteFilter);
  const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const siteId = String(fd.get("siteId") ?? "");
    if (!title || !siteId) return;
    addSafety({
      id: uid("sf"),
      siteId,
      date: todayISO(),
      type: (String(fd.get("type") ?? "observation") as SafetyType) || "observation",
      severity: (String(fd.get("severity") ?? "medium") as SafetySeverity) || "medium",
      title,
      titleMr: title,
      action: String(fd.get("action") ?? ""),
      closed: false,
    });
    toast.success(t(lang, "saved"));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex max-h-[inherit] flex-col">
          <DialogHeader>
            <DialogTitle>{t(lang, "newSafety")}</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-3">
            <Field label={t(lang, "filterSite")}>
              <select
                name="siteId"
                defaultValue={preset}
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "mr" ? s.nameMr : s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t(lang, "title")}>
              <Input name="title" required placeholder={t(lang, "safetyPh")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t(lang, "type")}>
                <select name="type" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm">
                  <option value="observation">{t(lang, "observation")}</option>
                  <option value="near_miss">{t(lang, "nearMiss")}</option>
                  <option value="incident">{t(lang, "incident")}</option>
                </select>
              </Field>
              <Field label={t(lang, "severity")}>
                <select name="severity" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm">
                  <option value="low">{t(lang, "low")}</option>
                  <option value="medium">{t(lang, "medium")}</option>
                  <option value="high">{t(lang, "high")}</option>
                </select>
              </Field>
            </div>
            <Field label={t(lang, "action")}>
              <Textarea name="action" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button type="submit">{t(lang, "save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


