import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { u as cn } from "./router-DT4pNw_s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BCyydRrB.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		neutral: "bg-sheet text-ink",
		ok: "bg-ok-bg text-ok",
		warn: "bg-warn-bg text-warn",
		danger: "bg-danger-bg text-danger",
		info: "bg-info-bg text-info",
		primary: "bg-primary text-primary-fg"
	} },
	defaultVariants: { tone: "neutral" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };
