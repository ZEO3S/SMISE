import { useEffect, useState } from "react";

import { https } from "@/apis/fetch";
import { RECRUITMENT_URL } from "@/constants/api/url";
import {
  Recruitment,
  RequestRecruitmentParams,
  ResponseRecruitment,
} from "@/types/api/recruitment";

export const useRecruitment = ({
  serviceTypes,
  serviceStatus,
  jobs,
  detailedJobs,
  locations,
  experienceLevel,
  educationLevel,
  sort,
  limit,
  cursor,
  keyword,
}: RequestRecruitmentParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await https.get(
          `${RECRUITMENT_URL}?service_types=${serviceTypes}&service_status=${serviceStatus}&jobs=${jobs}&detailed_jobs=${detailedJobs}&locations=${locations}&experience_level=${experienceLevel}&education_level=${educationLevel}&sort=${sort}&limit=${limit}&cursor=${cursor}&keyword=${keyword}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { recruitment }: ResponseRecruitment = await response.json();
        setRecruitment(recruitment);
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [
    serviceTypes,
    serviceStatus,
    jobs,
    detailedJobs,
    locations,
    experienceLevel,
    educationLevel,
    sort,
    limit,
    cursor,
    keyword,
  ]);

  return { recruitment, isLoading, error };
};
