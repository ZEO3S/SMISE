import { Job, Location, ServiceType } from '@/types/api/recruitment';
import { SelectOption } from '@/types/components/select';

import EducationLevelFilter from './educationLevelFilter';
import ExperienceLevelFilter from './experienceLevelFilter';
import JobsFilter from './jobsFilter';
import LocationFilter from './locationFilter';
import ServiceStatusFilter from './serviceStatusFilter';
import ServiceTypesFilter from './serviceTypesFilter';

interface Props {
  selectedDefaultJobs: Array<Job> | null;
  selectedServiceType: ServiceType | null;
  locations: Array<Location> | null;
  updateServiceType: (string: ServiceType) => void;
  updateServiceStatus: (string: string) => void;
  updateJobs: (selectedJob: Array<Job> | null) => void;
  updateLocations: (selectedLocations: Array<Location> | null) => void;
  updateEducationLevel: (educationLevel: SelectOption) => void;
  updateExperienceLevel: (min: number, max: number) => void;
}

export default function Filter({
  selectedDefaultJobs,
  selectedServiceType,
  locations,
  updateServiceType,
  updateServiceStatus,
  updateJobs,
  updateLocations,
  updateEducationLevel,
  updateExperienceLevel,
}: Props) {
  return (
    <div className='flex flex-col sticky top-16 w-80 h-[724px] [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter updateServiceType={updateServiceType} />
      <ServiceStatusFilter updateServiceStatus={updateServiceStatus} />
      <JobsFilter
        selectedDefaultJobs={selectedDefaultJobs}
        selectedServiceType={selectedServiceType}
        updateJobs={updateJobs}
      />
      <LocationFilter locations={locations} updateLocations={updateLocations} />
      <EducationLevelFilter updateEducationLevel={updateEducationLevel} />
      <ExperienceLevelFilter updateExperienceLevel={updateExperienceLevel} />
    </div>
  );
}
