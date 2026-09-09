import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Package, s as Plus } from "../_libs/lucide-react.mjs";
import { a as materialBalance, c as t, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, d as findSite, i as AddMaterialDialog, l as CardContent, m as formatNumber } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { t as Badge } from "./badge-BCyydRrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/materials-DLTifv04.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MaterialsPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const materials = useSthal((s) => s.materials);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = materials.filter((m) => ids.includes(m.siteId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "field"),
			title: t(lang, "materials"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addMaterial")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-8" }),
			title: t(lang, "emptyMaterials")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "overflow-x-auto p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[40rem] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-left text-xs tracking-wide text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: t(lang, "item")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: t(lang, "filterSite")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: t(lang, "received")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: t(lang, "consumed")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: t(lang, "balance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: t(lang, "status")
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((m) => {
					const site = findSite(sites, m.siteId);
					const bal = materialBalance(m);
					const low = bal <= m.reorderAt;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: lang === "mr" ? m.nameMr : m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: m.unit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3 text-muted",
								children: site ? siteName(site, lang) : ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3 text-right font-mono tabular-nums",
								children: formatNumber(m.received)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3 text-right font-mono tabular-nums",
								children: formatNumber(m.consumed)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `px-5 py-3 text-right font-mono tabular-nums ${low ? "text-danger" : ""}`,
								children: formatNumber(bal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-3",
								children: low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "danger",
									children: t(lang, "belowReorder")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "ok",
									children: t(lang, "ok")
								})
							})
						]
					}, m.id);
				}) })]
			})
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMaterialDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { MaterialsPage as component };
