import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as MapPin, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as materialBalance, c as t, l as Button, n as Route, o as siteProgress, s as useSthal, u as cn } from "./router-DkWMHIms.mjs";
import { _ as siteName, c as Card, f as formatDate, g as siteLocation, l as CardContent, m as formatNumber, n as AddIssueDialog, t as AddDprDialog, u as daysUntil, v as siteType } from "./names-CNlL8k_p.mjs";
import { a as SafetyTypeBadge, n as IssueTone, o as SiteStatusBadge, r as QualityBadge, t as IssueStatusBadge } from "./status-badge-CBFpcEM1.mjs";
import { t as Progress } from "./progress-fP2UeUmF.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sites._siteId-CdPzqpSu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("flex gap-1 overflow-x-auto rounded-lg bg-sheet p-1 text-muted", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-sm", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-4 outline-none", className),
		...props
	});
}
function SiteDetail() {
	const { siteId } = Route.useParams();
	const lang = useSthal((s) => s.lang);
	const site = useSthal((s) => s.sites.find((x) => x.id === siteId));
	const work = useSthal((s) => s.work.filter((w) => w.siteId === siteId));
	const materials = useSthal((s) => s.materials.filter((m) => m.siteId === siteId));
	const dprs = useSthal((s) => s.dprs.filter((d) => d.siteId === siteId));
	const issues = useSthal((s) => s.issues.filter((i) => i.siteId === siteId));
	const quality = useSthal((s) => s.quality.filter((q) => q.siteId === siteId));
	const safety = useSthal((s) => s.safety.filter((x) => x.siteId === siteId));
	const labor = useSthal((s) => s.labor.filter((l) => l.siteId === siteId));
	const [dprOpen, setDprOpen] = (0, import_react.useState)(false);
	const [issueOpen, setIssueOpen] = (0, import_react.useState)(false);
	if (!site) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: t(lang, "noneMatch")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/sites",
			className: "mt-3 inline-block text-sm text-primary hover:underline",
			children: t(lang, "back")
		})]
	});
	const pct = siteProgress(work, site.id);
	const left = daysUntil(site.targetDate);
	const scope = lang === "mr" ? site.scopeMr : site.scope;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/sites",
			className: "mb-4 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), t(lang, "sites")]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-44 overflow-hidden bg-sheet md:h-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: site.image,
					alt: "",
					className: "size-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-semibold tracking-tight",
								children: siteName(site, lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteStatusBadge, {
								status: site.status,
								lang
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
								siteLocation(site, lang),
								" · ",
								siteType(site, lang)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setIssueOpen(true),
								children: t(lang, "addIssue")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setDprOpen(true),
								children: t(lang, "logDpr")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: t(lang, "client"),
								value: site.client
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: t(lang, "contractor"),
								value: site.contractor
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: t(lang, "engineer"),
								value: site.engineer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: t(lang, "target"),
								value: left >= 0 ? `${formatDate(site.targetDate, lang)} · ${left} ${t(lang, "daysLeft")}` : `${formatDate(site.targetDate, lang)} · ${Math.abs(left)} ${t(lang, "delayedBy")}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: scope
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: pct,
							className: "flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm tabular-nums",
							children: [pct, "%"]
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "work",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "work",
						children: t(lang, "work")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "dpr",
						children: t(lang, "dpr")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "materials",
						children: t(lang, "materials")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "labor",
						children: t(lang, "labor")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "quality",
						children: t(lang, "quality")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "safety",
						children: t(lang, "safety")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "issues",
						children: t(lang, "issues")
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "work",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "overflow-x-auto p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-left text-xs tracking-wide text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: t(lang, "name")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: t(lang, "unit")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-right font-medium",
											children: t(lang, "planned")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-right font-medium",
											children: t(lang, "done")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: t(lang, "progress")
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: work.map((w) => {
								const p = w.planned ? Math.round(w.done / w.planned * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3",
											children: lang === "mr" ? w.nameMr : w.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-muted",
											children: w.unit
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-right font-mono tabular-nums",
											children: formatNumber(w.planned)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-right font-mono tabular-nums",
											children: formatNumber(w.done)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
													value: p,
													className: "w-24"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "w-10 text-right font-mono text-xs tabular-nums",
													children: [p, "%"]
												})]
											})
										})
									]
								}, w.id);
							}) })]
						})
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "dpr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: dprs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: formatDate(d.date, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: lang === "mr" ? d.workSummaryMr : d.workSummary
						})] }) }, d.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "materials",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "overflow-x-auto p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-left text-xs text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: t(lang, "item")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-right font-medium",
											children: t(lang, "balance")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 font-medium",
											children: t(lang, "unit")
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: materials.map((m) => {
								const bal = materialBalance(m);
								const low = bal <= m.reorderAt;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3",
											children: lang === "mr" ? m.nameMr : m.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: `px-5 py-3 text-right font-mono tabular-nums ${low ? "text-danger" : ""}`,
											children: formatNumber(bal)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-muted",
											children: m.unit
										})
									]
								}, m.id);
							}) })]
						})
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "labor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "divide-y divide-border p-0",
						children: labor.slice(0, 12).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-5 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lang === "mr" ? l.tradeMr : l.trade }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: formatDate(l.date, lang)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono tabular-nums",
								children: [
									l.present,
									"/",
									l.planned
								]
							})]
						}, l.id))
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "quality",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: quality.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lang === "mr" ? q.titleMr : q.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									q.location,
									" · ",
									formatDate(q.date, lang)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityBadge, {
								result: q.result,
								lang
							})]
						}) }, q.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "safety",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: safety.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lang === "mr" ? s.titleMr : s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: s.action
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyTypeBadge, {
								type: s.type,
								lang
							})]
						}) }, s.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "issues",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: issues.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lang === "mr" ? i.titleMr : i.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									i.location,
									" · ",
									i.assignee
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueTone, {
									severity: i.severity,
									lang
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueStatusBadge, {
									status: i.status,
									lang
								})]
							})]
						}) }, i.id))
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddDprDialog, {
			open: dprOpen,
			onOpenChange: setDprOpen,
			defaultSiteId: site.id
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIssueDialog, {
			open: issueOpen,
			onOpenChange: setIssueOpen
		})
	] });
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs tracking-wide text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-0.5 text-sm font-medium",
		children: value
	})] });
}
//#endregion
export { SiteDetail as component };
