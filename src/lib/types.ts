export type Lang = "en" | "mr";
export type SiteStatus = "active" | "delayed" | "finishing" | "completed";
export type Weather = "clear" | "cloudy" | "rain" | "hot";
export type IssueSeverity = "critical" | "major" | "minor";
export type IssueStatus = "open" | "in_progress" | "closed";
export type QualityResult = "pass" | "fail" | "hold";
export type SafetyType = "observation" | "near_miss" | "incident";
export type SafetySeverity = "low" | "medium" | "high";

export type Site = {
  id: string;
  name: string;
  nameMr: string;
  location: string;
  locationMr: string;
  client: string;
  contractor: string;
  type: string;
  typeMr: string;
  status: SiteStatus;
  startDate: string;
  targetDate: string;
  engineer: string;
  image: string;
  scope: string;
  scopeMr: string;
};

export type WorkItem = {
  id: string;
  siteId: string;
  name: string;
  nameMr: string;
  unit: string;
  planned: number;
  done: number;
};

export type Material = {
  id: string;
  siteId: string;
  name: string;
  nameMr: string;
  unit: string;
  received: number;
  consumed: number;
  reorderAt: number;
};

export type LaborEntry = {
  id: string;
  siteId: string;
  date: string;
  trade: string;
  tradeMr: string;
  present: number;
  planned: number;
};

export type Dpr = {
  id: string;
  siteId: string;
  date: string;
  weather: Weather;
  workSummary: string;
  workSummaryMr: string;
  laborCount: number;
  delays: string;
  delaysMr: string;
  remarks: string;
  remarksMr: string;
  engineer: string;
  photos: string[];
};

export type QualityCheck = {
  id: string;
  siteId: string;
  date: string;
  title: string;
  titleMr: string;
  location: string;
  result: QualityResult;
  notes: string;
  inspector: string;
};

export type SafetyLog = {
  id: string;
  siteId: string;
  date: string;
  type: SafetyType;
  severity: SafetySeverity;
  title: string;
  titleMr: string;
  action: string;
  closed: boolean;
};

export type Issue = {
  id: string;
  siteId: string;
  date: string;
  title: string;
  titleMr: string;
  location: string;
  severity: IssueSeverity;
  status: IssueStatus;
  assignee: string;
};

export type AppData = {
  sites: Site[];
  work: WorkItem[];
  materials: Material[];
  labor: LaborEntry[];
  dprs: Dpr[];
  quality: QualityCheck[];
  safety: SafetyLog[];
  issues: Issue[];
};
