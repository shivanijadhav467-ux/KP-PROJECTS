import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Check, c as Package, d as HardHat, f as Ellipsis, g as ChevronDown, h as ClipboardList, n as Users, o as ShieldCheck, r as TriangleAlert, u as LayoutDashboard, v as Building2 } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Separator2, i as Root2, n as Item2, o as Trigger, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DT4pNw_s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function clampPct(n) {
	if (!Number.isFinite(n)) return 0;
	return Math.max(0, Math.min(100, Math.round(n)));
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-primary", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "3",
				width: "26",
				height: "26",
				rx: "3",
				fill: "currentColor",
				opacity: "0.12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 24V12.5L16 8l8 4.5V24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.75",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 24h16",
				stroke: "currentColor",
				strokeWidth: "1.75"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 12v12M11 16.5h4M17 19h4",
				stroke: "currentColor",
				strokeWidth: "1.5"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:opacity-90",
			secondary: "bg-sheet text-ink hover:bg-border",
			outline: "border border-border bg-surface text-ink hover:bg-sheet",
			ghost: "text-ink hover:bg-sheet",
			danger: "bg-danger text-primary-fg hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-surface p-1 text-ink shadow-[var(--shadow-border)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none select-none focus:bg-sheet data-disabled:pointer-events-none data-disabled:opacity-50", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-50 [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" })
		})]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-lg border border-border bg-surface text-ink shadow-[var(--shadow-border)]", className),
		position: "popper",
		sideOffset: 6,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none focus:bg-sheet data-disabled:pointer-events-none data-disabled:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute right-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })
		})]
	});
}
var copy = {
	en: {
		app: "Sthal",
		tagline: "Civil site monitoring",
		dashboard: "Today",
		sites: "Sites",
		dpr: "Daily reports",
		materials: "Materials",
		labor: "Labor",
		quality: "Quality",
		safety: "Safety",
		issues: "Issues",
		field: "Field",
		more: "More",
		allSites: "All sites",
		activeSites: "Active sites",
		laborOnSite: "Labor on site",
		openIssues: "Open issues",
		stockAlerts: "Stock alerts",
		overallProgress: "Overall progress",
		weeklyWork: "Work this week",
		recentDpr: "Recent daily reports",
		todaysLabor: "Today's attendance",
		safetyPulse: "Safety pulse",
		materialWatch: "Material watch",
		logDpr: "Log today's DPR",
		noDprToday: "No daily report logged today",
		noDprTodayHint: "Capture work done, labor and delays before the shift closes.",
		viewAll: "View all",
		addSite: "Add site",
		addDpr: "New report",
		addIssue: "Raise issue",
		addMaterial: "Record stock",
		addLabor: "Mark attendance",
		addQuality: "Log inspection",
		addSafety: "Log observation",
		save: "Save",
		cancel: "Cancel",
		close: "Close",
		reset: "Reset sample data",
		language: "मराठी",
		status: "Status",
		progress: "Progress",
		client: "Client",
		contractor: "Contractor",
		engineer: "Site engineer",
		location: "Location",
		type: "Type",
		start: "Start",
		target: "Target",
		scope: "Scope",
		work: "Work items",
		planned: "Planned",
		done: "Done",
		unit: "Unit",
		received: "Received",
		consumed: "Consumed",
		balance: "Balance",
		reorder: "Reorder at",
		trade: "Trade",
		present: "Present",
		weather: "Weather",
		delays: "Delays",
		remarks: "Remarks",
		workDone: "Work done",
		photos: "Photos",
		inspector: "Inspector",
		result: "Result",
		notes: "Notes",
		action: "Action taken",
		assignee: "Assignee",
		severity: "Severity",
		date: "Date",
		name: "Name",
		emptySites: "No sites yet",
		emptyDpr: "No daily reports",
		emptyIssues: "No open issues",
		emptyMaterials: "No materials on this site",
		emptyLabor: "No attendance for this date",
		emptyQuality: "No inspections logged",
		emptySafety: "No safety logs",
		filterSite: "Site",
		today: "Today",
		overdue: "Overdue",
		belowReorder: "Below reorder",
		ok: "Healthy",
		pass: "Pass",
		fail: "Fail",
		hold: "Hold",
		open: "Open",
		inProgress: "In progress",
		closed: "Closed",
		critical: "Critical",
		major: "Major",
		minor: "Minor",
		observation: "Observation",
		nearMiss: "Near miss",
		incident: "Incident",
		low: "Low",
		medium: "Medium",
		high: "High",
		active: "Active",
		delayed: "Delayed",
		finishing: "Finishing",
		completed: "Completed",
		clear: "Clear",
		cloudy: "Cloudy",
		rain: "Rain",
		hot: "Hot",
		markClosed: "Mark closed",
		startWork: "Start work",
		siteName: "Site name",
		floorsOrSpan: "Scope note",
		summary: "Summary",
		laborCount: "Labor count",
		qty: "Qty",
		movement: "Movement",
		receipt: "Receipt",
		consumption: "Consumption",
		item: "Item",
		title: "Title",
		greeting: "Site log",
		greetingSub: "What needs attention before the shift ends.",
		cubeHint: "Cube / cover / alignment",
		ppe: "PPE",
		openSafety: "Open safety items",
		dprFor: "Daily progress report",
		back: "Back",
		required: "Required",
		saved: "Saved",
		deleted: "Removed",
		confirmReset: "Replace all data with the sample Maharashtra sites?",
		resetDone: "Sample data restored",
		noPhoto: "No photos attached",
		addPhoto: "Add photo",
		search: "Search",
		noneMatch: "Nothing matches",
		daysLeft: "days to target",
		delayedBy: "days past target",
		of: "of",
		trades: "trades",
		thisSite: "This site",
		overview: "Overview",
		fieldHub: "Field desk",
		fieldHubHint: "Materials, labor, quality and safety for the selected site.",
		raise: "Raise",
		log: "Log",
		record: "Record",
		mark: "Mark",
		inspect: "Inspect",
		observe: "Observe",
		weatherClear: "Clear",
		selectSite: "Select a site",
		newSite: "New site",
		newDpr: "New daily report",
		newIssue: "New issue",
		newMaterial: "Stock movement",
		newLabor: "Attendance",
		newQuality: "Inspection",
		newSafety: "Safety log",
		locationPh: "Grid / floor / chainage",
		workPh: "Columns C12–C18 shuttering, slab 7 pouring…",
		delayPh: "None / rain stoppage / material wait…",
		remarkPh: "Night curing started. Tower crane idle 2 hrs.",
		issuePh: "Honeycombing at column C4, level 6",
		safetyPh: "Edge protection missing on slab 8 west",
		qualityPh: "7-day cube test, mix M30, slab 6",
		materialNamePh: "OPC 53 cement",
		tradePh: "Mason",
		unitPh: "bags",
		engineerPh: "R. Deshpande",
		clientPh: "Client / dept.",
		contractorPh: "Contractor",
		typePh: "Residential / ROB / institutional",
		allCaught: "All caught up",
		allCaughtHint: "No open issues on the selected sites.",
		stockOk: "Stock is healthy",
		stockOkHint: "Nothing is below reorder level.",
		safetyOk: "No open safety items",
		safetyOkHint: "Keep the daily toolbox talk going.",
		viewSite: "Open site",
		lastDpr: "Last DPR",
		none: "None",
		pctComplete: "% complete",
		men: "persons",
		alert: "Alert",
		healthy: "On track",
		watch: "Watch",
		risk: "At risk"
	},
	mr: {
		app: "स्थळ",
		tagline: "सिव्हिल साइट मॉनिटरिंग",
		dashboard: "आज",
		sites: "साइट्स",
		dpr: "दैनिक अहवाल",
		materials: "साहित्य",
		labor: "मजूर",
		quality: "गुणवत्ता",
		safety: "सुरक्षा",
		issues: "समस्या",
		field: "फील्ड",
		more: "अधिक",
		allSites: "सर्व साइट्स",
		activeSites: "सक्रिय साइट्स",
		laborOnSite: "आजचे मजूर",
		openIssues: "खुल्या समस्या",
		stockAlerts: "स्टॉक इशारे",
		overallProgress: "एकूण प्रगती",
		weeklyWork: "या आठवड्याचे काम",
		recentDpr: "अलीकडील दैनिक अहवाल",
		todaysLabor: "आजची हजेरी",
		safetyPulse: "सुरक्षा स्थिती",
		materialWatch: "साहित्य लक्ष",
		logDpr: "आजचा DPR नोंदवा",
		noDprToday: "आजचा दैनिक अहवाल नाही",
		noDprTodayHint: "शिफ्ट संपण्यापूर्वी काम, मजूर आणि विलंब नोंदवा.",
		viewAll: "सर्व पहा",
		addSite: "साइट जोडा",
		addDpr: "नवा अहवाल",
		addIssue: "समस्या नोंदवा",
		addMaterial: "स्टॉक नोंदवा",
		addLabor: "हजेरी नोंदवा",
		addQuality: "तपासणी नोंदवा",
		addSafety: "निरीक्षण नोंदवा",
		save: "जतन",
		cancel: "रद्द",
		close: "बंद",
		reset: "नमुना डेटा परत आणा",
		language: "English",
		status: "स्थिती",
		progress: "प्रगती",
		client: "क्लायंट",
		contractor: "कंत्राटदार",
		engineer: "साइट अभियंता",
		location: "ठिकाण",
		type: "प्रकार",
		start: "सुरुवात",
		target: "लक्ष्य",
		scope: "व्याप्ती",
		work: "कामाच्या बाबी",
		planned: "नियोजित",
		done: "पूर्ण",
		unit: "एकक",
		received: "आवक",
		consumed: "वापर",
		balance: "शिल्लक",
		reorder: "रीऑर्डर स्तर",
		trade: "व्यावसाय",
		present: "हजर",
		weather: "हवामान",
		delays: "विलंब",
		remarks: "शेरा",
		workDone: "झालेले काम",
		photos: "फोटो",
		inspector: "निरीक्षक",
		result: "निकाल",
		notes: "नोंदी",
		action: "केलेली कारवाई",
		assignee: "जबाबदार",
		severity: "तीव्रता",
		date: "दिनांक",
		name: "नाव",
		emptySites: "अद्याप साइट नाही",
		emptyDpr: "दैनिक अहवाल नाहीत",
		emptyIssues: "खुल्या समस्या नाहीत",
		emptyMaterials: "या साइटवर साहित्य नाही",
		emptyLabor: "या दिवशी हजेरी नाही",
		emptyQuality: "तपासण्या नाहीत",
		emptySafety: "सुरक्षा नोंदी नाहीत",
		filterSite: "साइट",
		today: "आज",
		overdue: "मुदत संपली",
		belowReorder: "रीऑर्डर खाली",
		ok: "व्यवस्थित",
		pass: "पास",
		fail: "फेल",
		hold: "होल्ड",
		open: "खुली",
		inProgress: "प्रगतीत",
		closed: "बंद",
		critical: "गंभीर",
		major: "मोठी",
		minor: "लहान",
		observation: "निरीक्षण",
		nearMiss: "नियर मिस",
		incident: "घटना",
		low: "कमी",
		medium: "मध्यम",
		high: "उच्च",
		active: "सुरू",
		delayed: "विलंबित",
		finishing: "फिनिशिंग",
		completed: "पूर्ण",
		clear: "स्वच्छ",
		cloudy: "ढगाळ",
		rain: "पाऊस",
		hot: "उष्ण",
		markClosed: "बंद करा",
		startWork: "काम सुरू",
		siteName: "साइटचे नाव",
		floorsOrSpan: "व्याप्ती",
		summary: "सारांश",
		laborCount: "मजूर संख्या",
		qty: "नग",
		movement: "हालचाल",
		receipt: "आवक",
		consumption: "वापर",
		item: "वस्तू",
		title: "शीर्षक",
		greeting: "साइट लॉग",
		greetingSub: "शिफ्ट संपण्यापूर्वी लक्ष द्यायच्या बाबी.",
		cubeHint: "क्यूब / कव्हर / अलाइनमेंट",
		ppe: "PPE",
		openSafety: "खुल्या सुरक्षा बाबी",
		dprFor: "दैनिक प्रगती अहवाल",
		back: "मागे",
		required: "आवश्यक",
		saved: "जतन झाले",
		deleted: "काढले",
		confirmReset: "सर्व डेटा नमुना महाराष्ट्र साइट्सने बदलायचा का?",
		resetDone: "नमुना डेटा परत आला",
		noPhoto: "फोटो नाहीत",
		addPhoto: "फोटो जोडा",
		search: "शोधा",
		noneMatch: "काही जुळले नाही",
		daysLeft: "दिवस शिल्लक",
		delayedBy: "दिवस उशीर",
		of: "पैकी",
		trades: "व्यावसाय",
		thisSite: "ही साइट",
		overview: "आढावा",
		fieldHub: "फील्ड डेस्क",
		fieldHubHint: "निवडलेल्या साइटचे साहित्य, मजूर, गुणवत्ता आणि सुरक्षा.",
		raise: "नोंदवा",
		log: "नोंद",
		record: "नोंद",
		mark: "नोंद",
		inspect: "तपासणी",
		observe: "निरीक्षण",
		weatherClear: "स्वच्छ",
		selectSite: "साइट निवडा",
		newSite: "नवी साइट",
		newDpr: "नवा दैनिक अहवाल",
		newIssue: "नवी समस्या",
		newMaterial: "स्टॉक हालचाल",
		newLabor: "हजेरी",
		newQuality: "तपासणी",
		newSafety: "सुरक्षा नोंद",
		locationPh: "ग्रिड / मजला / चेनज",
		workPh: "स्तंभ C12–C18 शटरिंग, स्लॅब ७ पोरिंग…",
		delayPh: "नाही / पाऊस / साहित्याची वाट…",
		remarkPh: "रात्री क्युरिंग सुरू. टॉवर क्रेन २ तास बंद.",
		issuePh: "स्तंभ C4, लेव्हल ६ वर हनीकोम्बिंग",
		safetyPh: "स्लॅब ८ पश्चिम बाजूला एज प्रोटेक्शन नाही",
		qualityPh: "७ दिवस क्यूब टेस्ट, मिक्स M30, स्लॅब ६",
		materialNamePh: "OPC ५३ सिमेंट",
		tradePh: "गवंडी",
		unitPh: "पिशव्या",
		engineerPh: "आर. देशपांडे",
		clientPh: "क्लायंट / विभाग",
		contractorPh: "कंत्राटदार",
		typePh: "निवासी / आरओबी / संस्थात्मक",
		allCaught: "सर्व निपटले",
		allCaughtHint: "निवडलेल्या साइट्सवर खुल्या समस्या नाहीत.",
		stockOk: "स्टॉक व्यवस्थित",
		stockOkHint: "रीऑर्डर स्तराखाली काही नाही.",
		safetyOk: "खुल्या सुरक्षा बाबी नाहीत",
		safetyOkHint: "दैनिक टूलबॉक्स टॉक सुरू ठेवा.",
		viewSite: "साइट उघडा",
		lastDpr: "शेवटचा DPR",
		none: "नाही",
		pctComplete: "% पूर्ण",
		men: "व्यक्ती",
		alert: "इशारा",
		healthy: "नियंत्रणात",
		watch: "लक्ष द्या",
		risk: "धोका"
	}
};
function t(lang, key) {
	return copy[lang][key];
}
var SAMPLE = {
	sites: [
		{
			id: "s-sahyadri",
			name: "Sahyadri Heights",
			nameMr: "सह्याद्री हाइट्स",
			location: "Baner, Pune",
			locationMr: "बाणेर, पुणे",
			client: "Sahyadri Developers",
			contractor: "Kulkarni Constructions",
			type: "Residential G+14",
			typeMr: "निवासी जी+१४",
			status: "active",
			startDate: "2025-06-12",
			targetDate: "2027-03-31",
			engineer: "R. Deshpande",
			image: "/sites/sahyadri.jpg",
			scope: "RCC frame, 112 flats, two basements",
			scopeMr: "RCC फ्रेम, ११२ फ्लॅट, दोन बेसमेंट"
		},
		{
			id: "s-godavari",
			name: "Godavari ROB",
			nameMr: "गोदावरी आरओबी",
			location: "Nashik–Peth road, Nashik",
			locationMr: "नाशिक–पेठ रस्ता, नाशिक",
			client: "PWD Maharashtra",
			contractor: "Deshmukh Infra",
			type: "Road over bridge",
			typeMr: "रोड ओव्हर ब्रिज",
			status: "delayed",
			startDate: "2025-11-04",
			targetDate: "2026-09-15",
			engineer: "S. Patil",
			image: "/sites/godavari.jpg",
			scope: "4-lane ROB, 8 spans, 32 piles",
			scopeMr: "४ लेन आरओबी, ८ स्पॅन, ३२ पाइल्स"
		},
		{
			id: "s-vidya",
			name: "Vidya Mandir",
			nameMr: "विद्या मंदिर",
			location: "Wardha Road, Nagpur",
			locationMr: "वर्धा रोड, नागपूर",
			client: "Zilla Parishad Nagpur",
			contractor: "Joshi Builders",
			type: "School, G+1",
			typeMr: "शाळा, जी+१",
			status: "finishing",
			startDate: "2025-02-18",
			targetDate: "2026-10-30",
			engineer: "A. Bhonsle",
			image: "/sites/vidya.jpg",
			scope: "12 classrooms, labs, assembly court",
			scopeMr: "१२ वर्गखोली, लॅब, सभा मैदान"
		}
	],
	work: [
		{
			id: "w1",
			siteId: "s-sahyadri",
			name: "Excavation",
			nameMr: "खोदकाम",
			unit: "cum",
			planned: 2400,
			done: 2400
		},
		{
			id: "w2",
			siteId: "s-sahyadri",
			name: "PCC",
			nameMr: "पीसीसी",
			unit: "cum",
			planned: 180,
			done: 180
		},
		{
			id: "w3",
			siteId: "s-sahyadri",
			name: "Footings",
			nameMr: "फूटिंग",
			unit: "cum",
			planned: 420,
			done: 420
		},
		{
			id: "w4",
			siteId: "s-sahyadri",
			name: "Columns",
			nameMr: "स्तंभ",
			unit: "cum",
			planned: 980,
			done: 710
		},
		{
			id: "w5",
			siteId: "s-sahyadri",
			name: "Slabs",
			nameMr: "स्लॅब",
			unit: "floors",
			planned: 14,
			done: 8
		},
		{
			id: "w6",
			siteId: "s-sahyadri",
			name: "Brickwork",
			nameMr: "विटकाम",
			unit: "sqm",
			planned: 8500,
			done: 3120
		},
		{
			id: "w7",
			siteId: "s-sahyadri",
			name: "Internal plaster",
			nameMr: "आतील प्लास्टर",
			unit: "sqm",
			planned: 16e3,
			done: 1840
		},
		{
			id: "w8",
			siteId: "s-godavari",
			name: "Piling",
			nameMr: "पाइलिंग",
			unit: "nos",
			planned: 32,
			done: 24
		},
		{
			id: "w9",
			siteId: "s-godavari",
			name: "Pile caps",
			nameMr: "पाइल कॅप",
			unit: "nos",
			planned: 16,
			done: 8
		},
		{
			id: "w10",
			siteId: "s-godavari",
			name: "Piers",
			nameMr: "पियर",
			unit: "nos",
			planned: 16,
			done: 6
		},
		{
			id: "w11",
			siteId: "s-godavari",
			name: "Girder launch",
			nameMr: "गर्डर लॉन्च",
			unit: "spans",
			planned: 8,
			done: 2
		},
		{
			id: "w12",
			siteId: "s-godavari",
			name: "Deck slab",
			nameMr: "डेक स्लॅब",
			unit: "spans",
			planned: 8,
			done: 0
		},
		{
			id: "w13",
			siteId: "s-vidya",
			name: "RCC frame",
			nameMr: "RCC फ्रेम",
			unit: "%",
			planned: 100,
			done: 100
		},
		{
			id: "w14",
			siteId: "s-vidya",
			name: "Brickwork",
			nameMr: "विटकाम",
			unit: "sqm",
			planned: 2100,
			done: 1980
		},
		{
			id: "w15",
			siteId: "s-vidya",
			name: "Plaster",
			nameMr: "प्लास्टर",
			unit: "sqm",
			planned: 4200,
			done: 3680
		},
		{
			id: "w16",
			siteId: "s-vidya",
			name: "Flooring",
			nameMr: "फ्लोअरिंग",
			unit: "sqm",
			planned: 1800,
			done: 1260
		},
		{
			id: "w17",
			siteId: "s-vidya",
			name: "Painting",
			nameMr: "रंगकाम",
			unit: "sqm",
			planned: 5200,
			done: 2080
		},
		{
			id: "w18",
			siteId: "s-vidya",
			name: "MEP",
			nameMr: "MEP",
			unit: "%",
			planned: 100,
			done: 58
		}
	],
	materials: [
		{
			id: "m1",
			siteId: "s-sahyadri",
			name: "OPC 53 cement",
			nameMr: "OPC ५३ सिमेंट",
			unit: "bags",
			received: 4200,
			consumed: 3680,
			reorderAt: 400
		},
		{
			id: "m2",
			siteId: "s-sahyadri",
			name: "TMT 500 16mm",
			nameMr: "TMT ५०० १६मिमी",
			unit: "MT",
			received: 86,
			consumed: 71,
			reorderAt: 8
		},
		{
			id: "m3",
			siteId: "s-sahyadri",
			name: "TMT 500 12mm",
			nameMr: "TMT ५०० १२मिमी",
			unit: "MT",
			received: 54,
			consumed: 49,
			reorderAt: 6
		},
		{
			id: "m4",
			siteId: "s-sahyadri",
			name: "20mm aggregate",
			nameMr: "२०मिमी मेटल",
			unit: "cum",
			received: 980,
			consumed: 740,
			reorderAt: 80
		},
		{
			id: "m5",
			siteId: "s-sahyadri",
			name: "River sand",
			nameMr: "नदी वाळू",
			unit: "cum",
			received: 620,
			consumed: 590,
			reorderAt: 50
		},
		{
			id: "m6",
			siteId: "s-sahyadri",
			name: "Fly ash bricks",
			nameMr: "फ्लाय अॅश विटा",
			unit: "nos",
			received: 18e4,
			consumed: 124e3,
			reorderAt: 2e4
		},
		{
			id: "m7",
			siteId: "s-godavari",
			name: "OPC 53 cement",
			nameMr: "OPC ५३ सिमेंट",
			unit: "bags",
			received: 2100,
			consumed: 1880,
			reorderAt: 250
		},
		{
			id: "m8",
			siteId: "s-godavari",
			name: "TMT 500 32mm",
			nameMr: "TMT ५०० ३२मिमी",
			unit: "MT",
			received: 64,
			consumed: 41,
			reorderAt: 10
		},
		{
			id: "m9",
			siteId: "s-godavari",
			name: "20mm aggregate",
			nameMr: "२०मिमी मेटल",
			unit: "cum",
			received: 1400,
			consumed: 920,
			reorderAt: 120
		},
		{
			id: "m10",
			siteId: "s-godavari",
			name: "Shuttering ply",
			nameMr: "शटरिंग प्लाय",
			unit: "sheets",
			received: 240,
			consumed: 210,
			reorderAt: 40
		},
		{
			id: "m11",
			siteId: "s-vidya",
			name: "OPC 53 cement",
			nameMr: "OPC ५३ सिमेंट",
			unit: "bags",
			received: 980,
			consumed: 910,
			reorderAt: 80
		},
		{
			id: "m12",
			siteId: "s-vidya",
			name: "Vitrified tiles",
			nameMr: "व्हिट्रिफाइड टाइल्स",
			unit: "sqm",
			received: 1900,
			consumed: 1260,
			reorderAt: 200
		},
		{
			id: "m13",
			siteId: "s-vidya",
			name: "Emulsion paint",
			nameMr: "इमल्शन पेंट",
			unit: "ltr",
			received: 820,
			consumed: 340,
			reorderAt: 80
		}
	],
	labor: [
		{
			id: "l1",
			siteId: "s-sahyadri",
			date: "2026-08-31",
			trade: "Mason",
			tradeMr: "गवंडी",
			present: 18,
			planned: 22
		},
		{
			id: "l2",
			siteId: "s-sahyadri",
			date: "2026-08-31",
			trade: "Helper",
			tradeMr: "मदतनीस",
			present: 34,
			planned: 36
		},
		{
			id: "l3",
			siteId: "s-sahyadri",
			date: "2026-08-31",
			trade: "Carpenter",
			tradeMr: "सुतार",
			present: 12,
			planned: 14
		},
		{
			id: "l4",
			siteId: "s-sahyadri",
			date: "2026-08-31",
			trade: "Bar bender",
			tradeMr: "बार बेंडर",
			present: 9,
			planned: 10
		},
		{
			id: "l5",
			siteId: "s-godavari",
			date: "2026-08-31",
			trade: "Mason",
			tradeMr: "गवंडी",
			present: 8,
			planned: 12
		},
		{
			id: "l6",
			siteId: "s-godavari",
			date: "2026-08-31",
			trade: "Helper",
			tradeMr: "मदतनीस",
			present: 22,
			planned: 28
		},
		{
			id: "l7",
			siteId: "s-godavari",
			date: "2026-08-31",
			trade: "Rigger",
			tradeMr: "रिगर",
			present: 6,
			planned: 8
		},
		{
			id: "l8",
			siteId: "s-vidya",
			date: "2026-08-31",
			trade: "Mason",
			tradeMr: "गवंडी",
			present: 6,
			planned: 6
		},
		{
			id: "l9",
			siteId: "s-vidya",
			date: "2026-08-31",
			trade: "Painter",
			tradeMr: "रंगारी",
			present: 11,
			planned: 14
		},
		{
			id: "l10",
			siteId: "s-vidya",
			date: "2026-08-31",
			trade: "Electrician",
			tradeMr: "इलेक्ट्रीशियन",
			present: 4,
			planned: 4
		},
		{
			id: "l11",
			siteId: "s-sahyadri",
			date: "2026-08-29",
			trade: "Mason",
			tradeMr: "गवंडी",
			present: 20,
			planned: 22
		},
		{
			id: "l12",
			siteId: "s-sahyadri",
			date: "2026-08-29",
			trade: "Helper",
			tradeMr: "मदतनीस",
			present: 36,
			planned: 36
		},
		{
			id: "l13",
			siteId: "s-godavari",
			date: "2026-08-29",
			trade: "Helper",
			tradeMr: "मदतनीस",
			present: 18,
			planned: 28
		}
	],
	dprs: [
		{
			id: "d1",
			siteId: "s-sahyadri",
			date: "2026-08-29",
			weather: "cloudy",
			workSummary: "Slab 8 shuttering 70% complete. Column C21–C28 casting done. Brickwork 4th floor east wing 18 sqm.",
			workSummaryMr: "स्लॅब ८ शटरिंग ७०% पूर्ण. स्तंभ C21–C28 कास्टिंग झाले. चौथा मजला पूर्व विंग विटकाम १८ चौ.मी.",
			laborCount: 71,
			delays: "Ready-mix delayed 90 minutes.",
			delaysMr: "रेडी मिक्स ९० मिनिटे उशीर.",
			remarks: "Night curing started on slab 7. Tower crane idle 2 hrs for rope inspection.",
			remarksMr: "स्लॅब ७ वर रात्री क्युरिंग सुरू. दोर तपासणीसाठी टॉवर क्रेन २ तास बंद.",
			engineer: "R. Deshpande",
			photos: ["/sites/sahyadri.jpg"]
		},
		{
			id: "d2",
			siteId: "s-godavari",
			date: "2026-08-29",
			weather: "rain",
			workSummary: "Pile P-25 and P-26 boring. Pile cap PC-4 reinforcement 40%. No girder movement.",
			workSummaryMr: "पाइल P-25 आणि P-26 बोरिंग. पाइल कॅप PC-4 स्टील ४०%. गर्डर हालचाल नाही.",
			laborCount: 36,
			delays: "Rain stoppage 3.5 hours after 14:00. Riverbed access muddy.",
			delaysMr: "दुपारी २ नंतर पावसामुळे ३.५ तास बंद. नदीपात्रात चिखल.",
			remarks: "Dewatering pumps on standby. Requested extra bog mats from store.",
			remarksMr: "डिवॉटरिंग पंप तयार. स्टोअरकडून अतिरिक्त बॉग मॅट मागितल्या.",
			engineer: "S. Patil",
			photos: ["/sites/godavari.jpg"]
		},
		{
			id: "d3",
			siteId: "s-vidya",
			date: "2026-08-29",
			weather: "clear",
			workSummary: "Corridor vitrified flooring 86 sqm. First-coat emulsion in classrooms 3–6. Electrical DB wiring lab block.",
			workSummaryMr: "कॉरिडॉर व्हिट्रिफाइड फ्लोअरिंग ८६ चौ.मी. वर्ग ३–६ मध्ये पहिला कोट इमल्शन. लॅब ब्लॉक विद्युत DB वायरिंग.",
			laborCount: 21,
			delays: "None.",
			delaysMr: "नाही.",
			remarks: "Tile shade lot 2 matches sample. Client visit scheduled Tuesday.",
			remarksMr: "टाइल शेड लॉट २ सॅम्पलशी जुळते. मंगळवारी क्लायंट भेट.",
			engineer: "A. Bhonsle",
			photos: ["/sites/vidya.jpg"]
		},
		{
			id: "d4",
			siteId: "s-sahyadri",
			date: "2026-08-28",
			weather: "hot",
			workSummary: "Column C12–C20 shuttering and steel. Slab 7 curing day 3. Staircase flight 6 risers cast.",
			workSummaryMr: "स्तंभ C12–C20 शटरिंग आणि स्टील. स्लॅब ७ क्युरिंग दिवस ३. जिना फ्लाइट ६ रायझर्स कास्ट.",
			laborCount: 68,
			delays: "None.",
			delaysMr: "नाही.",
			remarks: "Cover blocks short — 400 nos indented from Baner yard.",
			remarksMr: "कव्हर ब्लॉक्स कमी — बाणेर यार्डमधून ४०० नग मागवले.",
			engineer: "R. Deshpande",
			photos: []
		},
		{
			id: "d5",
			siteId: "s-godavari",
			date: "2026-08-28",
			weather: "cloudy",
			workSummary: "Pier P3 shutter oiling. Pile P-24 concrete 18 cum. Approach embankment dressing 40 m.",
			workSummaryMr: "पियर P3 शटर ऑइलिंग. पाइल P-24 काँक्रीट १८ घनमी. अप्रोच एम्बँकमेंट ४० मी.",
			laborCount: 44,
			delays: "Waiting on 32mm TMT cut lengths from mill.",
			delaysMr: "मिलकडून ३२मिमी TMT कट लेंथची वाट.",
			remarks: "PWD AE visited. Asked for pile load test programme by Friday.",
			remarksMr: "PWD AE भेट. शुक्रवारपर्यंत पाइल लोड टेस्ट कार्यक्रम मागितला.",
			engineer: "S. Patil",
			photos: []
		},
		{
			id: "d6",
			siteId: "s-sahyadri",
			date: "2026-08-27",
			weather: "clear",
			workSummary: "Slab 7 pouring 62 cum (south half). Brickwork 3rd floor west 42 sqm.",
			workSummaryMr: "स्लॅब ७ पोरिंग ६२ घनमी (दक्षिण अर्धा). तिसरा मजला पश्चिम विटकाम ४२ चौ.मी.",
			laborCount: 74,
			delays: "None.",
			delaysMr: "नाही.",
			remarks: "Slump 110–120 mm. Cubes cast 6 nos, marked SH-S7-27A.",
			remarksMr: "स्लंप ११०–१२० मिमी. क्यूब्स ६ नग, चिन्ह SH-S7-27A.",
			engineer: "R. Deshpande",
			photos: ["/sites/sahyadri.jpg"]
		}
	],
	quality: [
		{
			id: "q1",
			siteId: "s-sahyadri",
			date: "2026-08-29",
			title: "Cover check — columns C21–C28",
			titleMr: "कव्हर तपासणी — स्तंभ C21–C28",
			location: "Level 8, grid C",
			result: "pass",
			notes: "40 mm cover maintained. Chairs adequate.",
			inspector: "R. Deshpande"
		},
		{
			id: "q2",
			siteId: "s-sahyadri",
			date: "2026-08-27",
			title: "7-day cube — slab 7 M30",
			titleMr: "७ दिवस क्यूब — स्लॅब ७ M30",
			location: "Lab, Baner",
			result: "hold",
			notes: "Awaiting 7-day crush. 28-day due 24 Sep.",
			inspector: "Lab — Pune Mix"
		},
		{
			id: "q3",
			siteId: "s-godavari",
			date: "2026-08-28",
			title: "Pile verticality P-24",
			titleMr: "पाइल उभ्या दिशा P-24",
			location: "Pier line 3",
			result: "pass",
			notes: "Deviation 0.6%, within 1% spec.",
			inspector: "S. Patil"
		},
		{
			id: "q4",
			siteId: "s-vidya",
			date: "2026-08-29",
			title: "Tile shade and lippage — corridor",
			titleMr: "टाइल शेड आणि लिपेज — कॉरिडॉर",
			location: "Ground floor corridor",
			result: "fail",
			notes: "Lippage > 1 mm on 4 joints. Relaying 12 tiles.",
			inspector: "A. Bhonsle"
		}
	],
	safety: [
		{
			id: "sf1",
			siteId: "s-sahyadri",
			date: "2026-08-29",
			type: "observation",
			severity: "medium",
			title: "Edge protection missing — slab 8 west",
			titleMr: "एज प्रोटेक्शन नाही — स्लॅब ८ पश्चिम",
			action: "Barricade indented. Work on west edge stopped until fixed.",
			closed: false
		},
		{
			id: "sf2",
			siteId: "s-godavari",
			date: "2026-08-28",
			type: "near_miss",
			severity: "high",
			title: "Tag line slipped during cage lift",
			titleMr: "केज लिफ्टवेळी टॅग लाइन निसटली",
			action: "Toolbox talk held. Extra rigger posted on boring rig.",
			closed: true
		},
		{
			id: "sf3",
			siteId: "s-vidya",
			date: "2026-08-26",
			type: "observation",
			severity: "low",
			title: "Painters without goggles in stairwell",
			titleMr: "जिनामध्ये चष्म्याशिवाय रंगारी",
			action: "PPE issued. Supervisor briefed.",
			closed: true
		}
	],
	issues: [
		{
			id: "i1",
			siteId: "s-sahyadri",
			date: "2026-08-28",
			title: "Honeycombing at column C4, level 6",
			titleMr: "स्तंभ C4, लेव्हल ६ वर हनीकोम्बिंग",
			location: "Grid C4 / L6",
			severity: "major",
			status: "in_progress",
			assignee: "Kulkarni Constructions"
		},
		{
			id: "i2",
			siteId: "s-godavari",
			date: "2026-08-25",
			title: "32mm TMT mill delay — piers P4–P6",
			titleMr: "३२मिमी TMT मिल उशीर — पियर P4–P6",
			location: "Yard / pier line 2",
			severity: "critical",
			status: "open",
			assignee: "Deshmukh Infra"
		},
		{
			id: "i3",
			siteId: "s-godavari",
			date: "2026-08-20",
			title: "Land acquisition hold on approach A2",
			titleMr: "अप्रोच A2 वर जमीन धारणा",
			location: "Nashik–Peth km 4.2",
			severity: "critical",
			status: "open",
			assignee: "PWD Maharashtra"
		},
		{
			id: "i4",
			siteId: "s-vidya",
			date: "2026-08-29",
			title: "Corridor tile lippage — 12 tiles",
			titleMr: "कॉरिडॉर टाइल लिपेज — १२ टाइल्स",
			location: "GF corridor",
			severity: "minor",
			status: "open",
			assignee: "Joshi Builders"
		},
		{
			id: "i5",
			siteId: "s-sahyadri",
			date: "2026-08-18",
			title: "Basement-2 seepage near lift pit",
			titleMr: "लिफ्ट पिटजवळ बेसमेंट-२ सीपेज",
			location: "B2 lift core",
			severity: "major",
			status: "closed",
			assignee: "Waterproofing subcon"
		}
	]
};
function cloneSample() {
	return structuredClone(SAMPLE);
}
var sample = cloneSample();
var useSthal = create()(persist((set) => ({
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
	updateIssue: (id, patch) => set((s) => ({ issues: s.issues.map((i) => i.id === id ? {
		...i,
		...patch
	} : i) })),
	addMaterial: (m) => set((s) => ({ materials: [m, ...s.materials] })),
	moveMaterial: (id, kind, qty) => set((s) => ({ materials: s.materials.map((m) => {
		if (m.id !== id) return m;
		if (kind === "receipt") return {
			...m,
			received: m.received + qty
		};
		return {
			...m,
			consumed: m.consumed + qty
		};
	}) })),
	addLabor: (entry) => set((s) => ({ labor: [entry, ...s.labor] })),
	addQuality: (q) => set((s) => ({ quality: [q, ...s.quality] })),
	addSafety: (sfty) => set((s) => ({ safety: [sfty, ...s.safety] })),
	updateSafety: (id, patch) => set((s) => ({ safety: s.safety.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	addWork: (w) => set((s) => ({ work: [w, ...s.work] })),
	updateWork: (id, done) => set((s) => ({ work: s.work.map((w) => w.id === id ? {
		...w,
		done
	} : w) }))
}), {
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
		siteFilter: s.siteFilter
	})
}));
function siteProgress(work, siteId) {
	const items = work.filter((w) => w.siteId === siteId);
	if (!items.length) return 0;
	const planned = items.reduce((a, w) => a + w.planned, 0);
	const done = items.reduce((a, w) => a + w.done, 0);
	return clampPct(planned ? done / planned * 100 : 0);
}
function filteredSiteIds(filter, sites) {
	if (filter === "all") return sites.map((s) => s.id);
	return sites.some((s) => s.id === filter) ? [filter] : sites.map((s) => s.id);
}
function laborToday(labor, siteIds, date = todayISO()) {
	return labor.filter((l) => l.date === date && siteIds.includes(l.siteId)).reduce((a, l) => a + l.present, 0);
}
function materialBalance(m) {
	return Math.max(0, m.received - m.consumed);
}
function SitePicker({ className }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const siteFilter = useSthal((s) => s.siteFilter);
	const setSiteFilter = useSthal((s) => s.setSiteFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value: siteFilter,
		onValueChange: setSiteFilter,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className,
			"aria-label": t(lang, "filterSite"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: "all",
			children: t(lang, "allSites")
		}), sites.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: site.id,
			children: lang === "mr" ? site.nameMr : site.name
		}, site.id))] })]
	});
}
var NAV = [
	{
		to: "/",
		key: "dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/sites",
		key: "sites",
		icon: Building2
	},
	{
		to: "/dpr",
		key: "dpr",
		icon: ClipboardList
	},
	{
		to: "/issues",
		key: "issues",
		icon: TriangleAlert
	}
];
var MORE = [
	{
		to: "/materials",
		key: "materials",
		icon: Package
	},
	{
		to: "/labor",
		key: "labor",
		icon: Users
	},
	{
		to: "/quality",
		key: "quality",
		icon: ShieldCheck
	},
	{
		to: "/safety",
		key: "safety",
		icon: HardHat
	}
];
function AppShell({ children }) {
	const lang = useSthal((s) => s.lang);
	const setLang = useSthal((s) => s.setLang);
	const resetSample = useSthal((s) => s.resetSample);
	const hydrated = useSthal((s) => s.hydrated);
	const setHydrated = useSthal((s) => s.setHydrated);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useSthal.persist.rehydrate().then(() => {
			setHydrated(true);
			setReady(true);
		});
	}, [setHydrated]);
	if (!ready && !hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-semibold tracking-tight text-ink",
				children: "Sthal"
			})]
		})
	});
	const moreActive = MORE.some((m) => pathname === m.to || pathname.startsWith(m.to + "/"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-surface md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-5 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none font-semibold tracking-tight",
							children: t(lang, "app")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] tracking-wide text-muted",
							children: t(lang, "tagline")
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-0.5 px-3",
						children: [
							NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: item.to,
								icon: item.icon,
								label: t(lang, item.key),
								active: isActive(pathname, item.to)
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 mb-1 px-3 text-[10px] font-medium tracking-widest text-subtle uppercase",
								children: t(lang, "field")
							}),
							MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: item.to,
								icon: item.icon,
								label: t(lang, item.key),
								active: isActive(pathname, item.to)
							}, item.to))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "w-full justify-start text-muted",
							onClick: () => {
								if (confirm(t(lang, "confirmReset"))) {
									resetSample();
									toast.success(t(lang, "resetDone"));
								}
							},
							children: t(lang, "reset")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-sm md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-semibold",
							children: t(lang, "app")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 md:ml-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePicker, { className: "max-w-48 md:max-w-56" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "shrink-0",
								onClick: () => setLang(lang === "en" ? "mr" : "en"),
								children: t(lang, "language")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										"aria-label": t(lang, "more"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									children: [
										MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: item.to,
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), t(lang, item.key)]
											})
										}, item.to)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onSelect: () => {
												if (confirm(t(lang, "confirmReset"))) {
													resetSample();
													toast.success(t(lang, "resetDone"));
												}
											},
											children: t(lang, "reset")
										})
									]
								})] })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-3 py-5 pb-24 md:px-6 md:pb-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid grid-cols-5",
					children: [NAV.map((item) => {
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium", active ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), t(lang, item.key)]
						}) }, item.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: cn("flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium", moreActive ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5" }), t(lang, "field")]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
						side: "top",
						align: "end",
						children: MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), t(lang, item.key)]
							})
						}, item.to))
					})] }) })]
				})
			})
		]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(to + "/");
}
function NavLink({ to, icon: Icon, label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors duration-150", active ? "bg-sheet text-ink" : "text-muted hover:bg-sheet/70 hover:text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
var styles_default = "/assets/styles-DQdN2FPh.css";
var APP_NAME = "Sthal";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2d4a45"
			},
			{
				name: "description",
				content: "Civil site monitoring — daily reports, materials, labor, quality and safety."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				toastOptions: { className: "font-sans" }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-DMyi09Dz.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./dpr-TJRmUPcs.mjs");
var Route$7 = createFileRoute("/dpr")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./issues-Dz-iHlLw.mjs");
var Route$6 = createFileRoute("/issues")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./labor-Ct1pVdEz.mjs");
var Route$5 = createFileRoute("/labor")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./materials-DLTifv04.mjs");
var Route$4 = createFileRoute("/materials")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./quality-tjqXDL3D.mjs");
var Route$3 = createFileRoute("/quality")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./safety-hjjHjdwE.mjs");
var Route$2 = createFileRoute("/safety")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./sites-BxqvGBJQ.mjs");
var Route$1 = createFileRoute("/sites")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./sites._siteId-zPqeuw9h.mjs");
var Route = createFileRoute("/sites/$siteId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var DprRoute = Route$7.update({
	id: "/dpr",
	path: "/dpr",
	getParentRoute: () => Route$9
});
var IssuesRoute = Route$6.update({
	id: "/issues",
	path: "/issues",
	getParentRoute: () => Route$9
});
var LaborRoute = Route$5.update({
	id: "/labor",
	path: "/labor",
	getParentRoute: () => Route$9
});
var MaterialsRoute = Route$4.update({
	id: "/materials",
	path: "/materials",
	getParentRoute: () => Route$9
});
var QualityRoute = Route$3.update({
	id: "/quality",
	path: "/quality",
	getParentRoute: () => Route$9
});
var SafetyRoute = Route$2.update({
	id: "/safety",
	path: "/safety",
	getParentRoute: () => Route$9
});
var SitesRoute = Route$1.update({
	id: "/sites",
	path: "/sites",
	getParentRoute: () => Route$9
});
var SitesRouteChildren = { SitesSiteIdRoute: Route.update({
	id: "/$siteId",
	path: "/$siteId",
	getParentRoute: () => SitesRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	DprRoute,
	IssuesRoute,
	LaborRoute,
	MaterialsRoute,
	QualityRoute,
	SafetyRoute,
	SitesRoute: SitesRoute._addFileChildren(SitesRouteChildren)
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { materialBalance as a, t as c, todayISO as d, uid as f, laborToday as i, Button as l, Route as n, siteProgress as o, filteredSiteIds as r, useSthal as s, router_exports as t, cn as u };
