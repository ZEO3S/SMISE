import { useEffect, useState } from "react";

import { https } from "@/apis/fetch";
import { JOBS_URL } from "@/constants/api/url";
import { Job } from "@/types/api/recruitment";
import { ResponseJobs } from "@/types/api/jobs";

export const useJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [jobs, setJobs] = useState<Array<Job>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        const response = await https.get(JOBS_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { jobs }: ResponseJobs = await response.json();
        setJobs(jobs);
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { jobs, isLoading, error };
};
