import { useFetch } from "./useFetch";
import { https } from "@/apis/fetch";
import { JOBS_URL } from "@/constants/api/url";
import { ResponseJobs } from "@/types/api/jobs";
import { ServiceType } from "@/types/api/recruitment";

const generateUrl = (selectedServiceType: ServiceType | null) => {
  return `${JOBS_URL}?serviceType=${selectedServiceType ?? "전체"}`;
};
export const useJobs = (selectedServiceType: ServiceType | null) => {
  const url = generateUrl(selectedServiceType);
  const { data, isLoading, error } = useFetch<string, ResponseJobs>({
    fetch: () => https.get<ResponseJobs>(url),
    key: url,
  });

  return { jobs: data?.jobs, isLoading, error };
};
