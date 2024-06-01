import { useEffect, useState } from "react";

import { https } from "@/apis/fetch";
import { RECRUITMENT_URL } from "@/constants/api/url";
import { Recruitment, ResponseRecruitment } from "@/types/api/recruitment";

export const useRecruitment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await https.get(RECRUITMENT_URL);

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
  }, []);

  return { recruitment, isLoading, error };
};
