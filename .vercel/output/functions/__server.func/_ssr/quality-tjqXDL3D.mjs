import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as ShieldCheck, s as Plus } from "../_libs/lucide-react.mjs";
import { c as t, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, a as AddQualityDialog, c as Card, d as findSite, f as formatDate, l as CardContent } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { r as QualityBadge } from "./status-badge-CsauGivb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quality-tjqXDL3D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QualityPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const quality = useSthal((s) => s.quality);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = [...quality].filter((q) => ids.includes(q.siteId)).sort((a, b) => b.date.localeCompare(a.date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "field"),
			title: t(lang, "quality"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addQuality")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-8" }),
			title: t(lang, "emptyQuality")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: list.map((q) => {
				const site = findSite(sites, q.siteId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: lang === "mr" ? q.titleMr : q.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								site ? siteName(site, lang) : "",
								" · ",
								q.location,
								" · ",
								formatDate(q.date, lang)
							]
						}),
						q.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: q.notes
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: [
								t(lang, "inspector"),
								": ",
								q.inspector
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityBadge, {
						result: q.result,
						lang
					})]
				}) }, q.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddQualityDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { QualityPage as component };
