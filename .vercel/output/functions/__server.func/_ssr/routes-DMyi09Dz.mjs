import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Package, d as HardHat, h as ClipboardList, n as Users, r as TriangleAlert, s as Plus } from "../_libs/lucide-react.mjs";
import { a as materialBalance, c as t, d as todayISO, i as laborToday, l as Button, o as siteProgress, r as filteredSiteIds, s as useSthal } from "./router-DT4pNw_s.mjs";
import { _ as siteName, c as Card, d as findSite, f as formatDate, h as lastDays, l as CardContent, p as formatDay, t as AddDprDialog } from "./names-CYVSuYid.mjs";
import { n as PageHeader, t as EmptyState } from "./page-header-D2iphoUI.mjs";
import { n as IssueTone, o as SiteStatusBadge, s as WeatherLabel } from "./status-badge-CsauGivb.mjs";
import { t as Progress } from "./progress-Bq4VRKCM.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMyi09Dz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const work = useSthal((s) => s.work);
	const labor = useSthal((s) => s.labor);
	const dprs = useSthal((s) => s.dprs);
	const materials = useSthal((s) => s.materials);
	const issues = useSthal((s) => s.issues);
	const safety = useSthal((s) => s.safety);
	const siteFilter = useSthal((s) => s.siteFilter);
	const [dprOpen, setDprOpen] = (0, import_react.useState)(false);
	const ids = filteredSiteIds(siteFilter, sites);
	const today = todayISO();
	const active = sites.filter((s) => ids.includes(s.id) && s.status !== "completed");
	const openIssues = issues.filter((i) => ids.includes(i.siteId) && i.status !== "closed");
	const alerts = materials.filter((m) => ids.includes(m.siteId) && materialBalance(m) <= m.reorderAt);
	const laborCount = laborToday(labor, ids, today);
	const todayDprs = dprs.filter((d) => d.date === today && ids.includes(d.siteId));
	const missingDpr = active.filter((s) => !todayDprs.some((d) => d.siteId === s.id));
	const openSafety = safety.filter((s) => ids.includes(s.siteId) && !s.closed);
	const recent = [...dprs].filter((d) => ids.includes(d.siteId)).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
	const chart = lastDays(7).map((iso) => {
		const dayLabor = labor.filter((l) => l.date === iso && ids.includes(l.siteId)).reduce((a, l) => a + l.present, 0);
		const fallback = dprs.filter((d) => d.date === iso && ids.includes(d.siteId)).reduce((a, d) => a + d.laborCount, 0);
		const dt = /* @__PURE__ */ new Date(iso + "T00:00:00");
		return {
			label: lang === "mr" ? `${dt.getDate()}` : dt.toLocaleDateString("en-IN", { weekday: "short" }),
			labor: dayLabor || fallback
		};
	});
	const overall = ids.length === 0 ? 0 : Math.round(ids.reduce((a, id) => a + siteProgress(work, id), 0) / ids.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: formatDay(today, lang),
			title: t(lang, "greeting"),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setDprOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t(lang, "logDpr")]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "-mt-3 mb-6 text-sm text-muted",
			children: t(lang, "greetingSub")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "activeSites"),
					value: String(active.length),
					hint: t(lang, "sites")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "laborOnSite"),
					value: String(laborCount),
					hint: t(lang, "men")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "openIssues"),
					value: String(openIssues.length),
					hint: openIssues.some((i) => i.severity === "critical") ? t(lang, "critical") : t(lang, "issues"),
					warn: openIssues.length > 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: t(lang, "stockAlerts"),
					value: String(alerts.length),
					hint: alerts.length ? t(lang, "belowReorder") : t(lang, "ok"),
					warn: alerts.length > 0
				})
			]
		}),
		missingDpr.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-warn-bg text-warn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t(lang, "noDprToday")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								missingDpr.map((s) => siteName(s, lang)).join(" · "),
								" — ",
								t(lang, "noDprTodayHint")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setDprOpen(true),
						className: "shrink-0",
						children: t(lang, "logDpr")
					})
				]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "lg:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: t(lang, "overallProgress")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-3xl font-medium tabular-nums",
							children: [overall, "%"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t(lang, "weeklyWork")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: overall,
						className: "mb-6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: chart,
								barSize: 18,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										tick: {
											fill: "var(--color-muted)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "var(--color-sheet)" },
										contentStyle: {
											background: "var(--color-surface)",
											border: "1px solid var(--color-border)",
											borderRadius: 8,
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "labor",
										fill: "var(--color-primary)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: sites.filter((s) => ids.includes(s.id)).map((s) => {
							const pct = siteProgress(work, s.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.image,
										alt: "",
										className: "size-11 rounded-sm object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/sites/$siteId",
												params: { siteId: s.id },
												className: "truncate font-medium hover:underline",
												children: siteName(s, lang)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteStatusBadge, {
												status: s.status,
												lang
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: pct,
											className: "mt-2"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-sm tabular-nums text-muted",
										children: [pct, "%"]
									})
								]
							}, s.id);
						})
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: t(lang, "recentDpr"),
					to: "/dpr",
					lang
				}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-6" }),
					title: t(lang, "emptyDpr")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: recent.map((d) => {
						const site = findSite(sites, d.siteId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: site ? siteName(site, lang) : d.siteId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: formatDate(d.date, lang)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-sm text-muted",
									children: lang === "mr" ? d.workSummaryMr : d.workSummary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-subtle",
									children: [
										WeatherLabel({
											weather: d.weather,
											lang
										}),
										" · ",
										d.laborCount,
										" ",
										t(lang, "men")
									]
								})
							]
						}, d.id);
					})
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: t(lang, "openIssues"),
					to: "/issues",
					lang
				}), openIssues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-6" }),
					title: t(lang, "allCaught"),
					hint: t(lang, "allCaughtHint")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: openIssues.slice(0, 4).map((i) => {
						const site = findSite(sites, i.siteId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-2 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: lang === "mr" ? i.titleMr : i.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										site ? siteName(site, lang) : "",
										" · ",
										i.location
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueTone, {
								severity: i.severity,
								lang
							})]
						}, i.id);
					})
				})] }) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4" }),
					title: t(lang, "materialWatch"),
					to: "/materials",
					empty: alerts.length === 0,
					emptyTitle: t(lang, "stockOk"),
					emptyHint: t(lang, "stockOkHint"),
					children: alerts.slice(0, 3).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between py-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: lang === "mr" ? m.nameMr : m.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-danger",
							children: [
								materialBalance(m),
								" ",
								m.unit
							]
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
					title: t(lang, "todaysLabor"),
					to: "/labor",
					empty: laborCount === 0,
					emptyTitle: t(lang, "emptyLabor"),
					children: labor.filter((l) => l.date === today && ids.includes(l.siteId)).slice(0, 5).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between py-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "mr" ? l.tradeMr : l.trade }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums",
							children: [
								l.present,
								"/",
								l.planned
							]
						})]
					}, l.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "size-4" }),
					title: t(lang, "safetyPulse"),
					to: "/safety",
					empty: openSafety.length === 0,
					emptyTitle: t(lang, "safetyOk"),
					emptyHint: t(lang, "safetyOkHint"),
					children: openSafety.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-1.5 text-sm",
						children: lang === "mr" ? s.titleMr : s.title
					}, s.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddDprDialog, {
			open: dprOpen,
			onOpenChange: setDprOpen
		})
	] });
}
function Kpi({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 font-mono text-3xl font-medium tabular-nums ${warn ? "text-danger" : "text-ink"}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			})
		]
	}) });
}
function SectionHead({ title, to, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-widest text-muted uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-xs font-medium text-primary hover:underline",
			children: t(lang, "viewAll")
		})]
	});
}
function Mini({ icon, title, to, children, empty, emptyTitle, emptyHint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-xs font-medium tracking-widest text-muted uppercase",
			children: [icon, title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-xs font-medium text-primary hover:underline",
			children: "→"
		})]
	}), empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "py-4 text-sm text-muted",
		children: [emptyTitle, emptyHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs text-subtle",
			children: emptyHint
		}) : null]
	}) : children] }) });
}
//#endregion
export { Home as component };
