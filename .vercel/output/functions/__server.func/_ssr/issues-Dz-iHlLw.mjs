import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as TriangleAlert, s as Plus } from "../_libs/lucide-react.mjs";
import { c as t, l as Button, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, d as findSite, f as formatDate, l as CardContent, n as AddIssueDialog } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { n as IssueTone, t as IssueStatusBadge } from "./status-badge-CsauGivb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/issues-Dz-iHlLw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IssuesPage() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const issues = useSthal((s) => s.issues);
	const updateIssue = useSthal((s) => s.updateIssue);
	const siteFilter = useSthal((s) => s.siteFilter);
	const ids = filteredSiteIds(siteFilter, sites);
	const [open, setOpen] = (0, import_react.useState)(false);
	const list = [...issues].filter((i) => ids.includes(i.siteId)).sort((a, b) => {
		const rank = {
			open: 0,
			in_progress: 1,
			closed: 2
		};
		return rank[a.status] - rank[b.status] || b.date.localeCompare(a.date);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t(lang, "issues"),
			title: t(lang, "issues"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "addIssue")]
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-8" }),
			title: t(lang, "emptyIssues"),
			hint: t(lang, "allCaughtHint")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: list.map((i) => {
				const site = findSite(sites, i.siteId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueTone, {
									severity: i.severity,
									lang
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueStatusBadge, {
									status: i.status,
									lang
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-medium",
								children: lang === "mr" ? i.titleMr : i.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									site ? siteName(site, lang) : "",
									" · ",
									i.location,
									" · ",
									formatDate(i.date, lang)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle",
								children: [
									t(lang, "assignee"),
									": ",
									i.assignee || "—"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-2",
						children: [i.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => updateIssue(i.id, { status: "in_progress" }),
							children: t(lang, "startWork")
						}) : null, i.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => updateIssue(i.id, { status: "closed" }),
							children: t(lang, "markClosed")
						}) : null]
					})]
				}) }, i.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIssueDialog, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { IssuesPage as component };
