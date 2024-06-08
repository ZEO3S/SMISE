import { useEffect, useState } from "react";

import { https } from "@/apis/fetch";
import { RECRUITMENT_URL } from "@/constants/api/url";
import {
  Recruitment,
  RequestRecruitmentParams,
  ResponseRecruitment,
} from "@/types/api/recruitment";

export const useRecruitment = ({
  serviceType,
  serviceStatus,
  jobs,
  locations,
  experienceLevel,
  educationLevel,
  sort,
  keyword,
}: RequestRecruitmentParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const serviceTypeParam = serviceType
          ? `service_types=${serviceType}`
          : null;
        const serviceStatusParam = serviceStatus
          ? `service_status=${serviceStatus}`
          : null;
        const jobsParam = jobs
          ? jobs
              .map((job) => {
                return `jobs=${job.category},${job.details.join(",")}`;
              })
              .join("&")
          : null;
        const locationsParam = locations
          ? locations
              .map((location) => {
                return `locations=${location.district},${location.cities.join(
                  ","
                )}`;
              })
              .join("&")
          : null;
        const educationLevelParam = educationLevel
          ? `education_level=${educationLevel}`
          : null;

        const experienceLevels = experienceLevel
          ? Object.values(experienceLevel)
          : null;
        const experienceLevelParam = experienceLevels
          ? `experience_level=${experienceLevels.join(",")}`
          : null;
        const sortParam = sort !== "최신순" ? `sort=${sort}` : null;
        const keywordParam = keyword ? `keyword=${keyword}` : null;
        const queryParams = [
          serviceTypeParam,
          serviceStatusParam,
          jobsParam,
          locationsParam,
          educationLevelParam,
          experienceLevelParam,
          sortParam,
          keywordParam,
        ]
          .filter((param) => param)
          .join("&");

        const requestUrl = queryParams
          ? `${RECRUITMENT_URL}?${queryParams}`
          : RECRUITMENT_URL;

        const response = await https.get(requestUrl);

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
    serviceType,
    serviceStatus,
    jobs,
    locations,
    experienceLevel,
    educationLevel,
    sort,
    keyword,
  ]);

  return { recruitment, isLoading, error };
};