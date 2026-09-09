import { Badge } from "@/components/ui/badge";
import { t, type CopyKey } from "@/lib/i18n";
import type {
  IssueSeverity,
  IssueStatus,
  Lang,
  QualityResult,
  SafetySeverity,
  SafetyType,
  SiteStatus,
  Weather,
} from "@/lib/types";

export function SiteStatusBadge({ status, lang }: { status: SiteStatus; lang: Lang }) {
  const tone =
    status === "active"
      ? "ok"
      : status === "delayed"
        ? "danger"
        : status === "finishing"
          ? "info"
          : "neutral";
  return <Badge tone={tone}>{t(lang, status)}</Badge>;
}

export function IssueTone({
  severity,
  lang,
}: {
  severity: IssueSeverity;
  lang: Lang;
}) {
  const tone = severity === "critical" ? "danger" : severity === "major" ? "warn" : "neutral";
  return <Badge tone={tone}>{t(lang, severity)}</Badge>;
}

export function IssueStatusBadge({ status, lang }: { status: IssueStatus; lang: Lang }) {
  const key: CopyKey = status === "in_progress" ? "inProgress" : status;
  const tone = status === "closed" ? "ok" : status === "in_progress" ? "info" : "warn";
  return <Badge tone={tone}>{t(lang, key)}</Badge>;
}

export function QualityBadge({ result, lang }: { result: QualityResult; lang: Lang }) {
  const tone = result === "pass" ? "ok" : result === "fail" ? "danger" : "warn";
  return <Badge tone={tone}>{t(lang, result)}</Badge>;
}

export function SafetyTypeBadge({ type, lang }: { type: SafetyType; lang: Lang }) {
  const key: CopyKey = type === "near_miss" ? "nearMiss" : type;
  const tone = type === "incident" ? "danger" : type === "near_miss" ? "warn" : "info";
  return <Badge tone={tone}>{t(lang, key)}</Badge>;
}

export function SafetySevBadge({
  severity,
  lang,
}: {
  severity: SafetySeverity;
  lang: Lang;
}) {
  const tone = severity === "high" ? "danger" : severity === "medium" ? "warn" : "neutral";
  return <Badge tone={tone}>{t(lang, severity)}</Badge>;
}

export function WeatherLabel({ weather, lang }: { weather: Weather; lang: Lang }) {
  return t(lang, weather);
}
