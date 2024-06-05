import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "../common/text";
import ServiceTypesFilter from "./serviceTypesFilter";
import ServiceStatusFilter from "./serviceStatusFilter";
import LocationFilter from "./locationFilter";
import EducationLevelFilter from "./EducationLevelFilter";
import ExperienceLevelFilter from "./ExperienceLevelFilter";

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
    <div className='flex flex-col'>
      <ServiceTypesFilter setServiceTypes={setServiceTypes} />
      <ServiceStatusFilter setServiceStatus={setServiceStatus} />
      <div>
        <Text variant='semi-title' content='직군' />
        <div className='flex gap-1'>
          <Text content='개발' />
          <Text content='·' />
          <Text content='머신러닝 엔지니어' />
          <Text content='외 1' />
          <Image
            className='-rotate-90 select-none'
            src={ArrowSVG}
            alt='모달 열기 버튼'
          />
        </div>
      </div>
      <LocationFilter setLocations={setLocations} />
      <EducationLevelFilter setEducationLevel={setEducationLevel} />
      <ExperienceLevelFilter setExperienceLevel={setExperienceLevel} />
    </div>
  );
}
