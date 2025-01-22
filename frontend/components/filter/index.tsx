import { Job } from '@/types/api/jobs';

import EducationLevelFilter from './educationLevelFilter';
import ExperienceLevelFilter from './experienceLevelFilter';
import JobsFilter from './jobsFilter';
import LocationFilter from './locationFilter';
import ServiceStatusFilter from './serviceStatusFilter';
import ServiceTypesFilter from './serviceTypesFilter';

interface Props {
  selectedDefaultJobs: Array<Job> | null;
  updateJobs: (selectedJob: Array<Job> | null) => void;
}

export default function Filter({ selectedDefaultJobs, updateJobs }: Props) {
  return (
    <div className='flex flex-col sticky top-16 w-80 h-[724px] [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter />
      <ServiceStatusFilter />
      <JobsFilter selectedDefaultJobs={selectedDefaultJobs} updateJobs={updateJobs} />
      <LocationFilter />
      <EducationLevelFilter />
      <ExperienceLevelFilter />
    </div>
  );
}
