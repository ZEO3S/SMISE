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

export type ServiceType = "산업기능요원" | "전문연구요원" | "승선근무예비역";
export type ServiceStatus = "보충역" | "현역";
type Jobs = Array<string> | null;
type DetailedJobs = Array<string> | null;
export type Locations = Array<string>;
export interface ExperienceLevel {
  start: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
  end: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
}
export type EducationLevel = string;
export type Sort = "최신순" | "마감순";
type Limit = string | null;
type Cursor = string | null;
export type Keyword = string;

export interface RequestRecruitmentParams {
  serviceTypes: Array<ServiceType> | null;
  serviceStatus: ServiceStatus | null;
  jobs: Jobs;
  detailedJobs: DetailedJobs;
  locations: Locations | null;
  experienceLevel: ExperienceLevel | null;
  educationLevel: EducationLevel | null;
  sort: Sort | null;
  limit: Limit;
  cursor: Cursor;
  keyword: Keyword | null;
}

export interface DefaultRequestRecruitmentParams {
  SERVICE_TYPES: Array<ServiceType> | null;
  SERVICE_STATUS: ServiceStatus | null;
  JOBS: Jobs;
  DETAILED_JOBS: DetailedJobs;
  LOCATIONS: Locations | null;
  EXPERIENCE_LEVEL: ExperienceLevel | null;
  EDUCATION_LEVEL: EducationLevel | null;
  SORT: Sort | null;
  LIMIT: Limit;
  CURSOR: Cursor;
  KEYWORD: Keyword | null;
}

export interface ResponseRecruitment {
  recruitment: Array<Recruitment>;
}
