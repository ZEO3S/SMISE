import { ServiceType } from '@/types/api/serviceType';

export const PARAMS = {
  SERVICE_TYPE: 'serviceType',
  SERVICE_STATUS: 'serviceStatus',
  JOBS: 'jobs',
  LOCATIONS: 'locations',
  EDUCATION_LEVEL: 'educationLevel',
  EXPERIENCE_LEVEL: 'experienceLevel',
  KEYWORD: 'keyword',
  SORT: 'sort',
  SIZE: 'size',
  PAGE: 'page',
};

export const SERVICE_TYPES: Array<ServiceType> = ['산업기능요원', '전문연구요원', '승선근무예비역'] as const;
export const SERVICE_STATUSES = ['보충역', '현역'];
