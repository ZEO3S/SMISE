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

type ServiceTypes = Array<
  "산업기능요원" | "전문연구요원" | "승선근무예비역"
> | null;
type ServiceStatus = "보충역" | "현역" | null;
type Jobs = Array<string> | null;
type DetailedJobs = Array<string> | null;
type Locations = Array<string> | null;
type ExperienceLevel = {
  start: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
  end: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
} | null;
type EducationLevel = string | null;
export type Sort = "최신순" | "마감순" | null;
type Limit = string | null;
type Cursor = string | null;
type Keyword = string | null;

export interface RequestRecruitmentParams {
  serviceTypes: ServiceTypes;
  serviceStatus: ServiceStatus;
  jobs: Jobs;
  detailedJobs: DetailedJobs;
  locations: Locations;
  experienceLevel: ExperienceLevel;
  educationLevel: EducationLevel;
  sort: Sort;
  limit: Limit;
  cursor: Cursor;
  keyword: Keyword;
}

export interface DefaultRequestRecruitmentParams {
  SERVICE_TYPES: ServiceTypes;
  SERVICE_STATUS: ServiceStatus;
  JOBS: Jobs;
  DETAILED_JOBS: DetailedJobs;
  LOCATIONS: Locations;
  EXPERIENCE_LEVEL: ExperienceLevel;
  EDUCATION_LEVEL: EducationLevel;
  SORT: Sort;
  LIMIT: Limit;
  CURSOR: Cursor;
  KEYWORD: Keyword;
}

export interface ResponseRecruitment {
  recruitment: Array<Recruitment>;
}
