import { Dispatch, SetStateAction } from "react";

import ServiceTypesFilter from "./serviceTypesFilter";
import ServiceStatusFilter from "./serviceStatusFilter";
import JobFilter from "./jobFilter";
import LocationFilter from "./locationFilter";
import EducationLevelFilter from "./educationLevelFilter";
import ExperienceLevelFilter from "./experienceLevelFilter";

import {
  EducationLevel,
  ExperienceLevel,
  Locations,
  ServiceStatus,
  ServiceType,
} from "@/types/api/recruitment";

interface Props {
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>;
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>;
  setLocations: Dispatch<SetStateAction<Locations | null>>;
  setEducationLevel: Dispatch<SetStateAction<EducationLevel | null>>;
  setExperienceLevel: Dispatch<SetStateAction<ExperienceLevel | null>>;
}

export default function Filter({
  setServiceTypes,
  setServiceStatus,
  setLocations,
  setEducationLevel,
  setExperienceLevel,
}: Props) {
  return (
    <div className='flex flex-col [&>*]:border-b [&>*]:border-default-color [&>*]:border-opacity-10'>
      <ServiceTypesFilter setServiceTypes={setServiceTypes} />
      <ServiceStatusFilter setServiceStatus={setServiceStatus} />
      <JobFilter />
      <LocationFilter setLocations={setLocations} />
      <EducationLevelFilter setEducationLevel={setEducationLevel} />
      <ExperienceLevelFilter setExperienceLevel={setExperienceLevel} />
    </div>
  );
}
