import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { https } from '@/apis/fetch';

import { ExperienceLevel } from '@/types/api/experienceLevel';
import { Job } from '@/types/api/jobs';
import { Recruitment, RequestRecruitmentParams, ResponseRecruitment } from '@/types/api/recruitment';

import { PARAMS } from '@/constants/api/queryParams';
import { DEFAULT_PARAMS } from '@/constants/api/recruitment';
import { RECRUITMENT_URL } from '@/constants/api/url';
import { generateMinText } from '@/constants/components/experienceLevel';

import { useFetch } from '@/hooks/useFetch';
import { usePage } from '@/hooks/usePage';
import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export const useRecruitment = () => {
  const { pushRoute, deleteQueryParam } = usePushRouteWithQueryParam();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = usePage();
  const [jobs, setJobs] = useState(DEFAULT_PARAMS.JOBS);
  const [experienceLevel, setExperienceLevel] = useState(DEFAULT_PARAMS.EXPERIENCE_LEVEL);

  const generateUrl = ({ jobs, experienceLevel }: RequestRecruitmentParams) => {
    const _queryParams = params.toString();
    const experienceLevelParam = experienceLevel ? `experienceLevel=${Object.values(experienceLevel).join(',')}` : null;
    const jobsParam = jobs ? jobs.map((job) => `jobs=${job.category},${job.details.join(',')}`).join('&') : null;
    const tempParams = [jobsParam, experienceLevelParam].filter((param) => param).join('&');
    const queryParams = _queryParams ? `${tempParams}&${_queryParams}` : tempParams;

    return queryParams ? `${RECRUITMENT_URL}?${queryParams}` : RECRUITMENT_URL;
  };

  const url = generateUrl({
    jobs,
    experienceLevel,
  });
  const { data, isLoading, error } = useFetch<string, ResponseRecruitment>({
    fetch: () => https.get<ResponseRecruitment>(url),
    key: url,
    suspense: true,
  });
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);

  const initialQueryParams = () => {
    Object.values(PARAMS).forEach((name) => deleteQueryParam(name));
  };

  const initialPagination = () => {
    pushRoute(PARAMS.SIZE, String(DEFAULT_PARAMS.SIZE));
    pushRoute(PARAMS.PAGE, String(DEFAULT_PARAMS.PAGE));
  };

  const updateJobs = (selectedJobs: Array<Job> | null) => {
    setJobs(selectedJobs);
    initialPagination();
  };

  const updateExperienceLevel = (min: number, max: number) => {
    setExperienceLevel((prev) => {
      const newExperienceLevel = {
        start: generateMinText(min),
        end: generateMinText(max),
      };

      const isExperienceLevel = (obj: unknown): obj is ExperienceLevel => {
        if (typeof obj !== 'object' || obj === null) return false;

        if (!('start' in obj && 'end' in obj)) return false;

        const { start, end } = obj;

        if (typeof start !== 'string' || typeof end !== 'string') {
          return false;
        }

        const reg = /^(\d+)년$/;

        return (start === '신입' || reg.test(start)) && (end === '신입' || reg.test(end));
      };

      if (!isExperienceLevel(newExperienceLevel)) return prev;

      return newExperienceLevel;
    });
    initialPagination();
  };

  const hasNext = data ? data.totalPages - data.page > 1 : false;
  const fetchNextPage = () => {
    if (!hasNext || isLoading) return;

    pushRoute(PARAMS.PAGE, String(Number(page) + 1));
  };

  useEffect(() => {
    setRecruitment((prev) => {
      if (!data) return [];
      if (page === '0' && DEFAULT_PARAMS.SIZE === data.recruitment.length) return data.recruitment;

      return [...prev, ...data.recruitment];
    });
  }, [data]);

  useEffect(() => {
    initialQueryParams();
    initialPagination();
  }, []);

  return {
    jobs,
    recruitment,
    isLoading,
    error,
    hasNext,
    updateJobs,
    updateExperienceLevel,
    fetchNextPage,
  };
};
