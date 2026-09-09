import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as HardHat, s as Plus } from "../_libs/lucide-react.mjs";
import { c as t, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, d as findSite, f as formatDate, l as CardContent, o as AddSafetyDialog } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { a as SafetyTypeBadge, i as SafetySevBadge } from "./status-badge-CsauGivb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safety-hjjHjdwE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SafetyPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const safety = useSthal((s) => s.safety);
	const updateSafety = useSthal((s) => s.updateSafety);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = [...safety].filter((s) => ids.includes(s.siteId)).sort((a, b) => Number(a.closed) - Number(b.closed) || b.date.localeCompare(a.date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "field"),
			title: t(lang, "safety"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addSafety")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "size-8" }),
			title: t(lang, "emptySafety"),
			hint: t(lang, "safetyOkHint")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: list.map((s) => {
				const site = findSite(sites, s.siteId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: s.closed ? "opacity-70" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyTypeBadge, {
									type: s.type,
									lang
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetySevBadge, {
									severity: s.severity,
									lang
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-medium",
								children: lang === "mr" ? s.titleMr : s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									site ? siteName(site, lang) : "",
									" · ",
									formatDate(s.date, lang)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: s.action
							})
						] }), !s.closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => updateSafety(s.id, { closed: true }),
							children: t(lang, "markClosed")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "closed")
						})]
					})
				}, s.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddSafetyDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { SafetyPage as component };
