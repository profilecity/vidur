import type { GeneralSettings } from "~/schemas/setting";
import type { JobPosting } from "~/server/db/schema";

export function useGeneralSettings() {
  return useFetch<GeneralSettings>("/api/settings/general");
}

export function usePublicPostings() {
  return useFetch<JobPosting[]>("/api/public/postings");
}