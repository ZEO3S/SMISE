import { DefaultRequestRecruitmentParams } from '@/types/api/recruitment';

export const DEFAULT_PARAMS: DefaultRequestRecruitmentParams = {
  SERVICE_TYPE: null,
  SERVICE_STATUS: null,
  JOBS: null,
  LOCATIONS: null,
  EDUCATION_LEVEL: null,
  EXPERIENCE_LEVEL: null,
  SORT: '최신순',
  SIZE: 20,
  PAGE: 0,
  KEYWORD: null,
};
