import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppData,
  Dpr,
  Issue,
  LaborEntry,
  Lang,
  Material,
  QualityCheck,
  SafetyLog,
  Site,
  WorkItem,
} from "./types";
import { cloneSample } from "./seed";
import { clampPct, todayISO } from "./utils";

type SiteFilter = "all" | string;

type Store = AppData & {
  lang: Lang;
  siteFilter: SiteFilter;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setLang: (lang: Lang) => void;
  setSiteFilter: (id: SiteFilter) => void;
  resetSample: () => void;
  addSite: (site: Site) => void;
  addDpr: (dpr: Dpr) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, patch: Partial<Issue>) => void;
  addMaterial: (m: Material) => void;
  moveMaterial: (id: string, kind: "receipt" | "consumption", qty: number) => void;
  addLabor: (entry: LaborEntry) => void;
  addQuality: (q: QualityCheck) => void;
  addSafety: (s: SafetyLog) => void;
  updateSafety: (id: string, patch: Partial<SafetyLog>) => void;
  addWork: (w: WorkItem) => void;
  updateWork: (id: string, done: number) => void;
};

const sample = cloneSample();

export const useSthal = create<Store>()(
  persist(
    (set) => ({
      ...sample,
      lang: "en",
      siteFilter: "all",
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setLang: (lang) => set({ lang }),
      setSiteFilter: (siteFilter) => set({ siteFilter }),
      resetSample: () => set({ ...cloneSample() }),
      addSite: (site) => set((s) => ({ sites: [site, ...s.sites] })),
      addDpr: (dpr) => set((s) => ({ dprs: [dpr, ...s.dprs] })),
      addIssue: (issue) => set((s) => ({ issues: [issue, ...s.issues] })),
      updateIssue: (id, patch) =>
        set((s) => ({
          issues: s.issues.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      addMaterial: (m) => set((s) => ({ materials: [m, ...s.materials] })),
      moveMaterial: (id, kind, qty) =>
        set((s) => ({
          materials: s.materials.map((m) => {
            if (m.id !== id) return m;
            if (kind === "receipt") return { ...m, received: m.received + qty };
            return { ...m, consumed: m.consumed + qty };
          }),
        })),
      addLabor: (entry) => set((s) => ({ labor: [entry, ...s.labor] })),
      addQuality: (q) => set((s) => ({ quality: [q, ...s.quality] })),
      addSafety: (sfty) => set((s) => ({ safety: [sfty, ...s.safety] })),
      updateSafety: (id, patch) =>
        set((s) => ({
          safety: s.safety.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      addWork: (w) => set((s) => ({ work: [w, ...s.work] })),
      updateWork: (id, done) =>
        set((s) => ({
          work: s.work.map((w) => (w.id === id ? { ...w, done } : w)),
        })),
    }),
    {
      name: "sthal-v1",
      skipHydration: true,
      partialize: (s) => ({
        sites: s.sites,
        work: s.work,
        materials: s.materials,
        labor: s.labor,
        dprs: s.dprs,
        quality: s.quality,
        safety: s.safety,
        issues: s.issues,
        lang: s.lang,
        siteFilter: s.siteFilter,
      }),
    },
  ),
);

export function siteProgress(work: WorkItem[], siteId: string) {
  const items = work.filter((w) => w.siteId === siteId);
  if (!items.length) return 0;
  const sum = items.reduce((a, w) => a + (w.planned ? Math.min(1, w.done / w.planned) : 0), 0);
  return clampPct((sum / items.length) * 100);
}

export function filteredSiteIds(filter: SiteFilter, sites: Site[]) {
  if (filter === "all") return sites.map((s) => s.id);
  return sites.some((s) => s.id === filter) ? [filter] : sites.map((s) => s.id);
}

export function laborToday(labor: LaborEntry[], siteIds: string[], date = todayISO()) {
  return labor
    .filter((l) => l.date === date && siteIds.includes(l.siteId))
    .reduce((a, l) => a + l.present, 0);
}

export function materialBalance(m: Material) {
  return Math.max(0, m.received - m.consumed);
}
