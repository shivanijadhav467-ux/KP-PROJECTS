import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogPortal, i as DialogOverlay$1, n as DialogClose, o as DialogTitle$1, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { c as t, d as todayISO, f as uid, l as Button, s as useSthal, u as cn } from "./router-DT4pNw_s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/names-CYVSuYid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 flex max-h-[min(90vh,720px)] w-[min(calc(100%-1.5rem),32rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-surface text-ink shadow-[var(--shadow-border)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-sheet hover:text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b border-border px-5 py-4 pr-14", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DialogBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex-1 overflow-y-auto px-5 py-4", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex justify-end gap-2 border-t border-border px-5 py-3", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50", className),
		...props
	});
}
async function compressPhoto(file) {
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg", .72);
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function AddSiteDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const addSite = useSthal((s) => s.addSite);
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get("name") ?? "").trim();
		if (!name) return;
		const id = uid("s");
		addSite({
			id,
			name,
			nameMr: name,
			location: String(fd.get("location") ?? ""),
			locationMr: String(fd.get("location") ?? ""),
			client: String(fd.get("client") ?? ""),
			contractor: String(fd.get("contractor") ?? ""),
			type: String(fd.get("type") ?? ""),
			typeMr: String(fd.get("type") ?? ""),
			status: String(fd.get("status") ?? "active") || "active",
			startDate: String(fd.get("start") ?? todayISO()),
			targetDate: String(fd.get("target") ?? todayISO()),
			engineer: String(fd.get("engineer") ?? ""),
			image: "/sites/sahyadri.jpg",
			scope: String(fd.get("scope") ?? ""),
			scopeMr: String(fd.get("scope") ?? "")
		});
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newSite") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "siteName"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								required: true,
								placeholder: "Sahyadri Heights"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "location"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "location",
								placeholder: t(lang, "locationPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "client"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "client",
									placeholder: t(lang, "clientPh")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "contractor"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "contractor",
									placeholder: t(lang, "contractorPh")
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "type"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "type",
								placeholder: t(lang, "typePh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "engineer"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "engineer",
								placeholder: t(lang, "engineerPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "start"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "start",
									type: "date",
									defaultValue: todayISO()
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "target"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "target",
									type: "date"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "scope"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "scope",
								placeholder: t(lang, "floorsOrSpan")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "hidden",
							name: "status",
							value: "active"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddDprDialog({ open, onOpenChange, defaultSiteId }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const addDpr = useSthal((s) => s.addDpr);
	const siteFilter = useSthal((s) => s.siteFilter);
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const preset = defaultSiteId ?? (siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "");
	async function onFiles(files) {
		if (!files) return;
		const next = [];
		for (const file of Array.from(files).slice(0, 3)) next.push(await compressPhoto(file));
		setPhotos((p) => [...p, ...next].slice(0, 4));
	}
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const siteId = String(fd.get("siteId") ?? "");
		const work = String(fd.get("work") ?? "").trim();
		if (!siteId || !work) return;
		addDpr({
			id: uid("dpr"),
			siteId,
			date: String(fd.get("date") ?? todayISO()),
			weather: String(fd.get("weather") ?? "clear") || "clear",
			workSummary: work,
			workSummaryMr: work,
			laborCount: Number(fd.get("labor") ?? 0) || 0,
			delays: String(fd.get("delays") ?? ""),
			delaysMr: String(fd.get("delays") ?? ""),
			remarks: String(fd.get("remarks") ?? ""),
			remarksMr: String(fd.get("remarks") ?? ""),
			engineer: String(fd.get("engineer") ?? ""),
			photos
		});
		toast.success(t(lang, "saved"));
		setPhotos([]);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newDpr") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "date"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "date",
									type: "date",
									defaultValue: todayISO()
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "weather"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "weather",
									defaultValue: "clear",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "clear",
											children: t(lang, "clear")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "cloudy",
											children: t(lang, "cloudy")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "rain",
											children: t(lang, "rain")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hot",
											children: t(lang, "hot")
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "workDone"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "work",
								required: true,
								placeholder: t(lang, "workPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "laborCount"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "labor",
									type: "number",
									min: 0,
									defaultValue: 0
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "engineer"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "engineer",
									placeholder: t(lang, "engineerPh")
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "delays"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "delays",
								placeholder: t(lang, "delayPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "remarks"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "remarks",
								placeholder: t(lang, "remarkPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: t(lang, "photos"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "file",
								accept: "image/*",
								multiple: true,
								onChange: (e) => void onFiles(e.target.files)
							}), photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-4 gap-2",
								children: photos.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src,
									alt: "",
									className: "h-16 w-full rounded-sm object-cover"
								}, src.slice(0, 24)))
							}) : null]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddIssueDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const addIssue = useSthal((s) => s.addIssue);
	const siteFilter = useSthal((s) => s.siteFilter);
	const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const title = String(fd.get("title") ?? "").trim();
		const siteId = String(fd.get("siteId") ?? "");
		if (!title || !siteId) return;
		addIssue({
			id: uid("i"),
			siteId,
			date: todayISO(),
			title,
			titleMr: title,
			location: String(fd.get("location") ?? ""),
			severity: String(fd.get("severity") ?? "major") || "major",
			status: "open",
			assignee: String(fd.get("assignee") ?? "")
		});
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newIssue") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "title"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "title",
								required: true,
								placeholder: t(lang, "issuePh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "location"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "location",
								placeholder: t(lang, "locationPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "severity"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "severity",
									defaultValue: "major",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "critical",
											children: t(lang, "critical")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "major",
											children: t(lang, "major")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "minor",
											children: t(lang, "minor")
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "assignee"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { name: "assignee" })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddMaterialDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const materials = useSthal((s) => s.materials);
	const addMaterial = useSthal((s) => s.addMaterial);
	const moveMaterial = useSthal((s) => s.moveMaterial);
	const siteFilter = useSthal((s) => s.siteFilter);
	const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
	const [mode, setMode] = (0, import_react.useState)("move");
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		if (mode === "move") {
			const id = String(fd.get("materialId") ?? "");
			const qty = Number(fd.get("qty") ?? 0);
			const kind = String(fd.get("kind") ?? "receipt") || "receipt";
			if (!id || !qty) return;
			moveMaterial(id, kind, qty);
		} else {
			const name = String(fd.get("name") ?? "").trim();
			const siteId = String(fd.get("siteId") ?? "");
			if (!name || !siteId) return;
			addMaterial({
				id: uid("m"),
				siteId,
				name,
				nameMr: name,
				unit: String(fd.get("unit") ?? ""),
				received: Number(fd.get("received") ?? 0) || 0,
				consumed: 0,
				reorderAt: Number(fd.get("reorder") ?? 0) || 0
			});
		}
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	const siteMats = materials.filter((m) => siteFilter === "all" ? true : m.siteId === siteFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newMaterial") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1 rounded-lg bg-sheet p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `h-9 rounded-md text-sm ${mode === "move" ? "bg-surface shadow-sm" : "text-muted"}`,
							onClick: () => setMode("move"),
							children: t(lang, "movement")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `h-9 rounded-md text-sm ${mode === "new" ? "bg-surface shadow-sm" : "text-muted"}`,
							onClick: () => setMode("new"),
							children: t(lang, "item")
						})]
					}), mode === "move" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t(lang, "item"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "materialId",
							className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
							children: siteMats.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m.id,
								children: lang === "mr" ? m.nameMr : m.name
							}, m.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "movement"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: "kind",
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "receipt",
									children: t(lang, "receipt")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "consumption",
									children: t(lang, "consumption")
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "qty"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "qty",
								type: "number",
								min: 0,
								step: "0.1",
								required: true
							})
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "name"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								required: true,
								placeholder: t(lang, "materialNamePh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t(lang, "unit"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "unit",
										placeholder: t(lang, "unitPh")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t(lang, "received"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "received",
										type: "number",
										min: 0,
										defaultValue: 0
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t(lang, "reorder"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "reorder",
										type: "number",
										min: 0,
										defaultValue: 0
									})
								})
							]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddLaborDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const addLabor = useSthal((s) => s.addLabor);
	const siteFilter = useSthal((s) => s.siteFilter);
	const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const trade = String(fd.get("trade") ?? "").trim();
		const siteId = String(fd.get("siteId") ?? "");
		if (!trade || !siteId) return;
		addLabor({
			id: uid("l"),
			siteId,
			date: String(fd.get("date") ?? todayISO()),
			trade,
			tradeMr: trade,
			present: Number(fd.get("present") ?? 0) || 0,
			planned: Number(fd.get("planned") ?? 0) || 0
		});
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newLabor") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "date"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "date",
								type: "date",
								defaultValue: todayISO()
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "trade"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "trade",
								required: true,
								placeholder: t(lang, "tradePh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "present"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "present",
									type: "number",
									min: 0,
									defaultValue: 0
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "planned"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "planned",
									type: "number",
									min: 0,
									defaultValue: 0
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddQualityDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const addQuality = useSthal((s) => s.addQuality);
	const siteFilter = useSthal((s) => s.siteFilter);
	const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const title = String(fd.get("title") ?? "").trim();
		const siteId = String(fd.get("siteId") ?? "");
		if (!title || !siteId) return;
		addQuality({
			id: uid("q"),
			siteId,
			date: todayISO(),
			title,
			titleMr: title,
			location: String(fd.get("location") ?? ""),
			result: String(fd.get("result") ?? "pass") || "pass",
			notes: String(fd.get("notes") ?? ""),
			inspector: String(fd.get("inspector") ?? "")
		});
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newQuality") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "title"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "title",
								required: true,
								placeholder: t(lang, "qualityPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "location"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "location",
								placeholder: t(lang, "locationPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "result"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "result",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pass",
											children: t(lang, "pass")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "fail",
											children: t(lang, "fail")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hold",
											children: t(lang, "hold")
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "inspector"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { name: "inspector" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "notes"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { name: "notes" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function AddSafetyDialog({ open, onOpenChange }) {
	const lang = useSthal((s) => s.lang);
	const sites = useSthal((s) => s.sites);
	const addSafety = useSthal((s) => s.addSafety);
	const siteFilter = useSthal((s) => s.siteFilter);
	const preset = siteFilter !== "all" ? siteFilter : sites[0]?.id ?? "";
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const title = String(fd.get("title") ?? "").trim();
		const siteId = String(fd.get("siteId") ?? "");
		if (!title || !siteId) return;
		addSafety({
			id: uid("sf"),
			siteId,
			date: todayISO(),
			type: String(fd.get("type") ?? "observation") || "observation",
			severity: String(fd.get("severity") ?? "medium") || "medium",
			title,
			titleMr: title,
			action: String(fd.get("action") ?? ""),
			closed: false
		});
		toast.success(t(lang, "saved"));
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex max-h-[inherit] flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "newSafety") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "filterSite"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "siteId",
								defaultValue: preset,
								className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "mr" ? s.nameMr : s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "title"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "title",
								required: true,
								placeholder: t(lang, "safetyPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "type"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "type",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "observation",
											children: t(lang, "observation")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "near_miss",
											children: t(lang, "nearMiss")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "incident",
											children: t(lang, "incident")
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t(lang, "severity"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "severity",
									className: "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "low",
											children: t(lang, "low")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "medium",
											children: t(lang, "medium")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "high",
											children: t(lang, "high")
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(lang, "action"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { name: "action" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: t(lang, "cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t(lang, "save")
				})] })
			]
		}) })
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface text-ink shadow-[var(--shadow-border)]", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5", className),
		...props
	});
}
var MR_MONTHS = [
	"जाने",
	"फेब्रु",
	"मार्च",
	"एप्रि",
	"मे",
	"जून",
	"जुलै",
	"ऑगस्ट",
	"सप्टें",
	"ऑक्टो",
	"नोव्हें",
	"डिसें"
];
var EN_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
var WEEK_EN = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var WEEK_MR = [
	"रवि",
	"सोम",
	"मंगळ",
	"बुध",
	"गुरु",
	"शुक्र",
	"शनि"
];
function parseISO(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatDate(iso, lang) {
	const dt = parseISO(iso);
	const months = lang === "mr" ? MR_MONTHS : EN_MONTHS;
	return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}
function formatDay(iso, lang) {
	const dt = parseISO(iso);
	const months = lang === "mr" ? MR_MONTHS : EN_MONTHS;
	return `${(lang === "mr" ? WEEK_MR : WEEK_EN)[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]}`;
}
function formatNumber(n) {
	return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(n);
}
function daysUntil(iso) {
	const target = parseISO(iso);
	const now = /* @__PURE__ */ new Date();
	now.setHours(0, 0, 0, 0);
	return Math.round((target.getTime() - now.getTime()) / 864e5);
}
function lastDays(count = 12) {
	const out = [];
	const d = /* @__PURE__ */ new Date();
	d.setHours(0, 0, 0, 0);
	for (let i = count - 1; i >= 0; i--) {
		const x = new Date(d);
		x.setDate(d.getDate() - i);
		const y = x.getFullYear();
		const m = String(x.getMonth() + 1).padStart(2, "0");
		const day = String(x.getDate()).padStart(2, "0");
		out.push(`${y}-${m}-${day}`);
	}
	return out;
}
function siteName(site, lang) {
	return lang === "mr" ? site.nameMr : site.name;
}
function siteLocation(site, lang) {
	return lang === "mr" ? site.locationMr : site.location;
}
function siteType(site, lang) {
	return lang === "mr" ? site.typeMr : site.type;
}
function findSite(sites, id) {
	return sites.find((s) => s.id === id);
}
//#endregion
export { siteName as _, AddQualityDialog as a, Card as c, findSite as d, formatDate as f, siteLocation as g, lastDays as h, AddMaterialDialog as i, CardContent as l, formatNumber as m, AddIssueDialog as n, AddSafetyDialog as o, formatDay as p, AddLaborDialog as r, AddSiteDialog as s, AddDprDialog as t, daysUntil as u, siteType as v };
