import { https } from "@/apis/fetch";
import { JOBS_URL } from "@/constants/api/url";
import { ResponseJobs } from "@/types/api/jobs";
import { useFetch } from "./useFetch";

export const useJobs = () => {
  const { data, isLoading, error } = useFetch<string, ResponseJobs>({
    fetch: () => https.get<ResponseJobs>(JOBS_URL),
    key: JOBS_URL,
  });

  return { jobs: data?.jobs, isLoading, error };
};
