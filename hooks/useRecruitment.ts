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
        const serviceTypesParam = serviceTypes
          ?.map((serviceType) => `service_types=${serviceType}`)
          .join("&");
        const serviceStatusParam = `service_status=${serviceStatus}`;
        const educationLevelParam = `education_level=${educationLevel}`;
        const experienceLevelParam = experienceLevel
          ? Object.values(experienceLevel)
              .map((experienceLevel) => `experience_level=${experienceLevel}`)
              .join("&")
          : "experience_level=";
        const sortParam = `sort=${sort}`;
        const keywordParam = `keyword=${keyword}`;

        console.log(
          serviceTypesParam,
          serviceStatusParam,
          educationLevelParam,
          experienceLevelParam,
          sortParam,
          keywordParam
        );
        const response = await https.get(
          `${RECRUITMENT_URL}?${serviceTypesParam}&${serviceStatusParam}&jobs=${jobs}&detailed_jobs=${detailedJobs}&locations=${locations}&${educationLevelParam}&${experienceLevelParam}&${sortParam}&limit=${limit}&cursor=${cursor}&${keywordParam}`
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
