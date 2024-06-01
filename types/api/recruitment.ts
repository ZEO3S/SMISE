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

export interface ResponseRecruitment {
  recruitment: Array<Recruitment>;
}
