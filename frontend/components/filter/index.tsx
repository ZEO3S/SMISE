import { Job, Location } from '@/types/api/recruitment';
import { SelectOption } from '@/types/components/select';

import EducationLevelFilter from './educationLevelFilter';
import ExperienceLevelFilter from './experienceLevelFilter';
import JobsFilter from './jobsFilter';
import LocationFilter from './locationFilter';
import ServiceStatusFilter from './serviceStatusFilter';
import ServiceTypesFilter from './serviceTypesFilter';

interface Props {
  selectedDefaultJobs: Array<Job> | null;
  locations: Array<Location> | null;
  updateServiceStatus: (string: string) => void;
  updateJobs: (selectedJob: Array<Job> | null) => void;
  updateLocations: (selectedLocations: Array<Location> | null) => void;
  updateEducationLevel: (educationLevel: SelectOption) => void;
  updateExperienceLevel: (min: number, max: number) => void;
}

export default function Filter({
  selectedDefaultJobs,
  locations,
  updateServiceStatus,
  updateJobs,
  updateLocations,
  updateEducationLevel,
  updateExperienceLevel,
}: Props) {
  return (
    <div className='flex flex-col sticky top-16 w-80 h-[724px] [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter />
      <ServiceStatusFilter updateServiceStatus={updateServiceStatus} />
      <JobsFilter selectedDefaultJobs={selectedDefaultJobs} updateJobs={updateJobs} />
      <LocationFilter locations={locations} updateLocations={updateLocations} />
      <EducationLevelFilter updateEducationLevel={updateEducationLevel} />
      <ExperienceLevelFilter updateExperienceLevel={updateExperienceLevel} />
    </div>
  );
}
