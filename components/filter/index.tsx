import { Dispatch, SetStateAction } from "react";

import ServiceTypesFilter from "./serviceTypesFilter";
import ServiceStatusFilter from "./serviceStatusFilter";
import JobsFilter from "./jobsFilter";
import LocationFilter from "./locationFilter";
import EducationLevelFilter from "./educationLevelFilter";
import ExperienceLevelFilter from "./experienceLevelFilter";

import {
  EducationLevel,
  ExperienceLevel,
  Location,
  ServiceStatus,
  ServiceType,
} from "@/types/api/recruitment";

interface Props {
  locations: Array<Location> | null;
  setServiceType: Dispatch<SetStateAction<Array<ServiceType> | null>>;
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>;
  setLocations: Dispatch<SetStateAction<Array<Location> | null>>;
  setEducationLevel: Dispatch<SetStateAction<EducationLevel | null>>;
  setExperienceLevel: Dispatch<SetStateAction<ExperienceLevel | null>>;
}

export default function Filter({
  locations,
  setServiceType,
  setServiceStatus,
  setLocations,
  setEducationLevel,
  setExperienceLevel,
}: Props) {
  return (
    <div className='flex flex-col [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter setServiceType={setServiceType} />
      <ServiceStatusFilter setServiceStatus={setServiceStatus} />
      <JobsFilter />
      <LocationFilter locations={locations} setLocations={setLocations} />
      <EducationLevelFilter setEducationLevel={setEducationLevel} />
      <ExperienceLevelFilter setExperienceLevel={setExperienceLevel} />
    </div>
  );
}
