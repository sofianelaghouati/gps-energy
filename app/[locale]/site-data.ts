export type ServiceKey = "lift" | "welltest" | "wellhead";
export type CompanyKey = "founded" | "structure" | "people" | "market";
export type CapabilityKey =
  | "equipment"
  | "logistics"
  | "production"
  | "replacement"
  | "testing"
  | "intervention";
export type StandardKey = "quality" | "safety" | "environment";
export type JetPointKey = "lowPressure" | "sandy" | "unstable" | "surfaceDriven";
export type SitePageKey = "home" | "company" | "services" | "standards" | "contact";

export const serviceKeys: ServiceKey[] = ["lift", "welltest", "wellhead"];
export const companyKeys: CompanyKey[] = ["founded", "structure", "people", "market"];
export const capabilityKeys: CapabilityKey[] = [
  "equipment",
  "logistics",
  "production",
  "replacement",
  "testing",
  "intervention",
];
export const standardKeys: StandardKey[] = ["quality", "safety", "environment"];
export const jetPointKeys: JetPointKey[] = [
  "lowPressure",
  "sandy",
  "unstable",
  "surfaceDriven",
];
