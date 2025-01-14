import { useEffect, useState } from 'react';

import { https } from '@/apis/fetch';

import {
  ExperienceLevel,
  Job,
  Location,
  Recruitment,
  RequestRecruitmentParams,
  ResponseRecruitment,
  ServiceStatus,
  ServiceType,
  Sort,
} from '@/types/api/recruitment';
import { SelectOption } from '@/types/components/select';

import { DEFAULT_PARAMS } from '@/constants/api/recruitment';
import { RECRUITMENT_URL } from '@/constants/api/url';
import { generateMinText } from '@/constants/components/experienceLevel';
import { SERVICE_STATUSES } from '@/constants/components/serviceStatus';
import { SORT_TYPES } from '@/constants/components/sort';

import { useFetch } from './useFetch';

const generateUrl = ({
  serviceType,
  serviceStatus,
  jobs,
  locations,
  experienceLevel,
  educationLevel,
  sort,
  size,
  page,
  keyword,
}: RequestRecruitmentParams) => {
  const serviceTypeParam = serviceType ? `serviceType=${serviceType}` : null;
  const serviceStatusParam = serviceStatus ? `serviceStatus=${serviceStatus}` : null;
  const jobsParam = jobs
    ? jobs
        .map((job) => {
          return `jobs=${job.category},${job.details.join(',')}`;
        })
        .join('&')
    : null;
  const locationsParam = locations
    ? locations
        .map((location) => {
          return `locations=${location.district},${location.cities.join(',')}`;
        })
        .join('&')
    : null;
  const educationLevelParam = educationLevel ? `educationLevel=${educationLevel}` : null;
  const experienceLevelParam = experienceLevel ? `experienceLevel=${Object.values(experienceLevel).join(',')}` : null;
  const sortParam = `sort=${sort}`;
  const sizeParam = `size=${size}`;
  const pageParam = `page=${page}`;
  const keywordParam = keyword ? `keyword=${keyword}` : null;
  const queryParams = [
    serviceTypeParam,
    serviceStatusParam,
    jobsParam,
    locationsParam,
    educationLevelParam,
    experienceLevelParam,
    sortParam,
    sizeParam,
    pageParam,
    keywordParam,
  ]
    .filter((param) => param)
    .join('&');

  return queryParams ? `${RECRUITMENT_URL}?${queryParams}` : RECRUITMENT_URL;
};

export const useRecruitment = () => {
  const [serviceType, setServiceType] = useState(DEFAULT_PARAMS.SERVICE_TYPE);
  const [serviceStatus, setServiceStatus] = useState(DEFAULT_PARAMS.SERVICE_STATUS);
  const [jobs, setJobs] = useState(DEFAULT_PARAMS.JOBS);
  const [locations, setLocations] = useState(DEFAULT_PARAMS.LOCATIONS);
  const [educationLevel, setEducationLevel] = useState(DEFAULT_PARAMS.EDUCATION_LEVEL);
  const [experienceLevel, setExperienceLevel] = useState(DEFAULT_PARAMS.EXPERIENCE_LEVEL);
  const [sort, setSort] = useState(DEFAULT_PARAMS.SORT);
  const [keyword, setKeyword] = useState(DEFAULT_PARAMS.KEYWORD);
  const [size, setSize] = useState(DEFAULT_PARAMS.SIZE);
  const [page, setPage] = useState(DEFAULT_PARAMS.PAGE);
  const url = generateUrl({
    serviceType,
    serviceStatus,
    jobs,
    locations,
    experienceLevel,
    educationLevel,
    sort,
    size,
    page,
    keyword,
  });
  const { data, isLoading, error } = useFetch<string, ResponseRecruitment>({
    fetch: () => https.get<ResponseRecruitment>(url),
    key: url,
    suspense: true,
  });
  const [recruitment, setRecruitment] = useState<Array<Recruitment>>([]);
  const hasNext = data ? data.totalPages - data.page > 1 : false;

  const initialPagination = () => {
    setSize(DEFAULT_PARAMS.SIZE);
    setPage(DEFAULT_PARAMS.PAGE);
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  const updateServiceType = (serviceType: ServiceType) => {
    setServiceType(serviceType);
    initialPagination();
  };

  const updateServiceStatus = (serviceStatus: string) => {
    const isServiceStatus = (value: string): value is ServiceStatus => {
      return SERVICE_STATUSES.includes(value);
    };

    if (!isServiceStatus(serviceStatus)) return;

    setServiceStatus(serviceStatus);
    initialPagination();
  };

  const updateJobs = (selectedJobs: Array<Job> | null) => {
    setJobs(selectedJobs);
    initialPagination();
  };

  const updateLocations = (selectedLocations: Array<Location> | null) => {
    setLocations(selectedLocations);
    initialPagination();
  };

  const updateEducationLevel = (educationLevel: SelectOption) => {
    setEducationLevel(educationLevel.value);
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

  const updateKeyword = (value: string) => {
    setKeyword(value);
    initialPagination();
  };

  const updateSort = (option: SelectOption) => {
    const selectedValue = option.value;

    const isSortType = (value: string): value is Sort => {
      return Object.values(SORT_TYPES).some((sortType) => sortType.value === value);
    };

    if (!isSortType(selectedValue)) return;

    setSort(selectedValue);
    initialPagination();
  };

  const fetchNextPage = () => {
    if (!hasNext || isLoading) return;

    setPage((page) => page + 1);
  };

  useEffect(() => {
    setRecruitment((prev) => {
      if (!data) return [];

      if (page === 0) return data.recruitment;

      return [...prev, ...data.recruitment];
    });
  }, [data]);

  return {
    serviceType,
    jobs,
    locations,
    recruitment,
    isLoading,
    error,
    hasNext,
    updateServiceType,
    updateServiceStatus,
    updateJobs,
    updateLocations,
    updateEducationLevel,
    updateExperienceLevel,
    updateKeyword,
    updateSort,
    fetchNextPage,
  };
};
