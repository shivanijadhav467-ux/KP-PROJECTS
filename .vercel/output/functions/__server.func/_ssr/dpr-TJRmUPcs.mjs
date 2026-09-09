import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Sun, h as ClipboardList, i as Thermometer, m as CloudRain, p as Cloud, s as Plus } from "../_libs/lucide-react.mjs";
import { c as t, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, d as findSite, f as formatDate, l as CardContent, t as AddDprDialog } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dpr-TJRmUPcs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	clear: Sun,
	cloudy: Cloud,
	rain: CloudRain,
	hot: Thermometer
};
function DprPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const dprs = useSthal((s) => s.dprs);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = [...dprs].filter((d) => ids.includes(d.siteId)).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "dprFor"),
			title: t(lang, "dpr"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addDpr")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-8" }),
			title: t(lang, "emptyDpr"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addDpr")]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: list.map((d) => {
				const site = findSite(sites, d.siteId);
				const Icon = ICONS[d.weather];
				const work = lang === "mr" ? d.workSummaryMr : d.workSummary;
				const delays = lang === "mr" ? d.delaysMr : d.delays;
				const remarks = lang === "mr" ? d.remarksMr : d.remarks;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "grid gap-4 md:grid-cols-[1fr_12rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-base font-semibold",
									children: site ? siteName(site, lang) : d.siteId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: formatDate(d.date, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), t(lang, d.weather)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: work
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid gap-2 text-sm sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: t(lang, "laborCount")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-mono tabular-nums",
									children: [
										d.laborCount,
										" ",
										t(lang, "men")
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: t(lang, "engineer")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: d.engineer || "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: t(lang, "delays")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: delays || "—" })]
								}),
								remarks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: t(lang, "remarks")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: remarks })]
								}) : null
							]
						})
					] }), d.photos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.photos[0],
						alt: "",
						className: "h-40 w-full rounded-md object-cover md:h-full"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-32 items-center justify-center rounded-md bg-sheet text-xs text-muted md:h-auto",
						children: t(lang, "noPhoto")
					})]
				}) }, d.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddDprDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { DprPage as component };
