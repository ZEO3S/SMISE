import { LOCATIONS } from "@/constants/components/location";

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
export interface Job {
  category: string;
  details: Array<string>;
}
export type District = keyof typeof LOCATIONS;
export interface Location {
  district: District;
  cities: Array<string>;
}
export interface ExperienceLevel {
  start: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
  end: "신입" | "1년" | "2년" | "3년" | "4년" | "5년";
}
export type EducationLevel = string;
export type Sort = "최신순" | "마감순";
export type Keyword = string;

export interface RequestRecruitmentParams {
  serviceType: Array<ServiceType> | null;
  serviceStatus: ServiceStatus | null;
  jobs: Array<Job> | null;
  locations: Array<Location> | null;
  experienceLevel: ExperienceLevel | null;
  educationLevel: EducationLevel | null;
  sort: Sort | null;
  keyword: Keyword | null;
}

export interface DefaultRequestRecruitmentParams {
  SERVICE_TYPE: Array<ServiceType> | null;
  SERVICE_STATUS: ServiceStatus | null;
  JOBS: Array<Job> | null;
  LOCATIONS: Array<Location> | null;
  EXPERIENCE_LEVEL: ExperienceLevel | null;
  EDUCATION_LEVEL: EducationLevel | null;
  SORT: Sort | null;
  KEYWORD: Keyword | null;
}

export interface ResponseRecruitment {
  recruitment: Array<Recruitment>;
}
