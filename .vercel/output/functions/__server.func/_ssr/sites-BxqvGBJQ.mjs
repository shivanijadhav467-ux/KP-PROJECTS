import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as MapPin, s as Plus, v as Building2 } from "../_libs/lucide-react.mjs";
import { c as t, l as Button, o as siteProgress, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, f as formatDate, g as siteLocation, s as AddSiteDialog, u as daysUntil, v as siteType } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { o as SiteStatusBadge } from "./status-badge-CsauGivb.mjs";
import { t as Progress } from "./progress-Bq4VRKCM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sites-BxqvGBJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SitesPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const work = useSthal((s) => s.work);
	const siteFilter = useSthal((s) => s.siteFilter);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = siteFilter === "all" ? sites : sites.filter((s) => s.id === siteFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "sites"),
			title: t(lang, "sites"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addSite")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-8" }),
			title: t(lang, "emptySites"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addSite")]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: list.map((site) => {
				const pct = siteProgress(work, site.id);
				const left = daysUntil(site.targetDate);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/sites/$siteId",
					params: { siteId: site.id },
					className: "group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-16/9 overflow-hidden bg-sheet",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: site.image,
								alt: "",
								className: "size-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 left-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteStatusBadge, {
									status: site.status,
									lang
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold tracking-tight",
									children: siteName(site, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-1 text-sm text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), siteLocation(site, lang)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-subtle",
									children: siteType(site, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: t(lang, "progress")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono tabular-nums",
										children: [pct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: pct,
									className: "mt-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-subtle",
									children: [
										t(lang, "target"),
										" ",
										formatDate(site.targetDate, lang),
										" · ",
										left >= 0 ? `${left} ${t(lang, "daysLeft")}` : `${Math.abs(left)} ${t(lang, "delayedBy")}`
									]
								})
							]
						})]
					})
				}, site.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddSiteDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { SitesPage as component };
