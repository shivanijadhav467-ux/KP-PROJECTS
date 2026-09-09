import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as t } from "./router-DT4pNw_s.mjs";
import { t as Badge } from "./badge-BCyydRrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-CsauGivb.js
var import_jsx_runtime = require_jsx_runtime();
function SiteStatusBadge({ status, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status === "active" ? "ok" : status === "delayed" ? "danger" : status === "finishing" ? "info" : "neutral",
		children: t(lang, status)
	});
}
function IssueTone({ severity, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: severity === "critical" ? "danger" : severity === "major" ? "warn" : "neutral",
		children: t(lang, severity)
	});
}
function IssueStatusBadge({ status, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status === "closed" ? "ok" : status === "in_progress" ? "info" : "warn",
		children: t(lang, status === "in_progress" ? "inProgress" : status)
	});
}
function QualityBadge({ result, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: result === "pass" ? "ok" : result === "fail" ? "danger" : "warn",
		children: t(lang, result)
	});
}
function SafetyTypeBadge({ type, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: type === "incident" ? "danger" : type === "near_miss" ? "warn" : "info",
		children: t(lang, type === "near_miss" ? "nearMiss" : type)
	});
}
function SafetySevBadge({ severity, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: severity === "high" ? "danger" : severity === "medium" ? "warn" : "neutral",
		children: t(lang, severity)
	});
}
function WeatherLabel({ weather, lang }) {
	return t(lang, weather);
}
//#endregion
export { SafetyTypeBadge as a, SafetySevBadge as i, IssueTone as n, SiteStatusBadge as o, QualityBadge as r, WeatherLabel as s, IssueStatusBadge as t };
