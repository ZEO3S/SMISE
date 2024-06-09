interface Job {
  category: string;
  details: Array<string>;
}

export interface ResponseJobs {
  jobs: Array<Job>;
}
