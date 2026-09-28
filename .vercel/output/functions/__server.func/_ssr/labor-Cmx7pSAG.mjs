import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Users, s as Plus } from "../_libs/lucide-react.mjs";
import { c as t, d as todayISO, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DkWMHIms.mjs";
import { _ as siteName, c as Card, d as findSite, f as formatDate, l as CardContent, r as AddLaborDialog } from "./names-CNlL8k_p.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-ajz172-Q.mjs";
import { t as Progress } from "./progress-fP2UeUmF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/labor-Cmx7pSAG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LaborPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const labor = useSthal((s) => s.labor);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const today = todayISO();
	const list = [...labor].filter((l) => ids.includes(l.siteId)).sort((a, b) => b.date.localeCompare(a.date));
	const todays = list.filter((l) => l.date === today);
	const present = todays.reduce((a, l) => a + l.present, 0);
	const planned = todays.reduce((a, l) => a + l.planned, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "field"),
			title: t(lang, "labor"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addLabor")]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted",
					children: t(lang, "todaysLabor")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-3xl font-medium tabular-nums",
					children: [present, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-lg text-muted",
						children: ["/", planned]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: planned ? present / planned * 100 : 0 })
				})]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-8" }),
			title: t(lang, "emptyLabor")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "divide-y divide-border p-0",
			children: list.map((l) => {
				const site = findSite(sites, l.siteId);
				const pct = l.planned ? Math.round(l.present / l.planned * 100) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 px-5 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lang === "mr" ? l.tradeMr : l.trade
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									site ? siteName(site, lang) : "",
									" · ",
									formatDate(l.date, lang)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden w-28 sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "w-16 text-right font-mono text-sm tabular-nums",
							children: [
								l.present,
								"/",
								l.planned
							]
						})
					]
				}, l.id);
			})
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLaborDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { LaborPage as component };
