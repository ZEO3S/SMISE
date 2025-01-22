import { EducationLevel } from '@/types/api/educationLevel';
import { ExperienceLevel } from '@/types/api/experienceLevel';
import { Job } from '@/types/api/jobs';
import { Location } from '@/types/api/location';
import { ServiceStatus } from '@/types/api/serviceStatus';
import { ServiceType } from '@/types/api/serviceType';
import { Sort } from '@/types/api/sort';

export interface Recruitment {
  id: number;
  serviceType: string;
  experienceLevel: string;
  educationLevel: string;
  expirationDate: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  href: string;
}

export interface RequestRecruitmentParams {
  jobs: Array<Job> | null;
  experienceLevel: ExperienceLevel | null;
}

export interface DefaultRequestRecruitmentParams {
  SERVICE_TYPE: ServiceType | null;
  SERVICE_STATUS: ServiceStatus | null;
  JOBS: Array<Job> | null;
  LOCATIONS: Array<Location> | null;
  EXPERIENCE_LEVEL: ExperienceLevel | null;
  EDUCATION_LEVEL: EducationLevel | null;
  SORT: Sort | null;
  SIZE: number;
  PAGE: number;
  KEYWORD: string | null;
}

export interface ResponseRecruitment {
  recruitment: Array<Recruitment>;
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}
