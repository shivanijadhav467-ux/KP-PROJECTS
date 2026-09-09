import type { Lang } from "./types";

const MR_MONTHS = [
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
  "डिसें",
];

const EN_MONTHS = [
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
  "Dec",
];

const WEEK_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_MR = ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"];

export function parseISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatDate(iso: string, lang: Lang) {
  const dt = parseISO(iso);
  const months = lang === "mr" ? MR_MONTHS : EN_MONTHS;
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

export function formatDay(iso: string, lang: Lang) {
  const dt = parseISO(iso);
  const months = lang === "mr" ? MR_MONTHS : EN_MONTHS;
  const week = lang === "mr" ? WEEK_MR : WEEK_EN;
  return `${week[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]}`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(n);
}

export function daysUntil(iso: string) {
  const target = parseISO(iso);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

export function lastDays(count = 12) {
  const out: string[] = [];
  const d = new Date();
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

