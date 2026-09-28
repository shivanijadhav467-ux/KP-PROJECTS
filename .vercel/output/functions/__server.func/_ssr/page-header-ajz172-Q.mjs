import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as cn } from "./router-DkWMHIms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-ajz172-Q.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon, title, hint, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-2 rounded-lg bg-sheet px-6 py-10 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: title
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted",
				children: hint
			}) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: action
			}) : null
		]
	});
}
function PageHeader({ kicker, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-xs font-medium tracking-widest text-muted uppercase",
				children: kicker
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-ink",
				children: title
			})]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
//#endregion
export { PageHeader as n, EmptyState as t };
