import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "../common/text";
import ServiceTypesFilter from "./serviceTypesFilter";
import ServiceStatusFilter from "./serviceStatusFilter";
import EducationLevelFilter from "./EducationLevelFilter";

import {
  EducationLevel,
  ServiceStatus,
  ServiceType,
} from "@/types/api/recruitment";

interface Props {
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>;
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>;
  setEducationLevel: Dispatch<SetStateAction<EducationLevel | null>>;
}

export default function Filter({
  setServiceTypes,
  setServiceStatus,
  setEducationLevel,
}: Props) {
  return (
    <div className='flex flex-col'>
      <ServiceTypesFilter setServiceTypes={setServiceTypes} />
      <ServiceStatusFilter setServiceStatus={setServiceStatus} />
      <div>
        <Text variant='semi-title' content='직군' />
        <Text content='개발' />
        <Text content='-' />
        <Text content='머신러닝 엔지니어' />
        <Text content='외 1' />
        <Image className='-rotate-90' src={ArrowSVG} alt='모달 열기 버튼' />
      </div>
      <div>
        <Text variant='semi-title' content='지역' />
        <Text content='서울' />
        <Text content='-' />
        <Text content='마포구' />
        <Text content='외 1' />
        <Image className='-rotate-90' src={ArrowSVG} alt='모달 열기 버튼' />
      </div>
      <EducationLevelFilter setEducationLevel={setEducationLevel} />
      <div>
        <Text variant='semi-title' content='경력' />
        <Text content='신입' />
        <Text content='~' />
        <Text content='5년' />
        <Text content='이상' />
      </div>
    </div>
  );
}
