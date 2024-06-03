import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "../common/text";
import Select from "../common/select";
import ServiceTypesFilter from "./serviceTypesFilter";

import { ServiceStatus, ServiceType } from "@/types/api/recruitment";
import { SelectOption } from "@/types/components/select";
import ServiceStatusFilter from "./serviceStatusFilter";

const EDUCATION_LEVELS: Array<SelectOption> = [
  {
    value: "학력 무관",
    label: "학력 무관",
  },
  {
    value: "고교 졸업",
    label: "고교 졸업",
  },
];

interface Props {
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>;
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>;
}

export default function Filter({ setServiceTypes, setServiceStatus }: Props) {
  return (
    <div>
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
      <div>
        <Text variant='semi-title' content='학력' />
        <Select selectedOption={EDUCATION_LEVELS[0]}>
          <ul>
            {EDUCATION_LEVELS.map((educationLevel) => {
              return (
                <li key={educationLevel.value}>
                  <Select.Option
                    value={educationLevel.value}
                    label={educationLevel.label}
                    onSelect={() => {}}
                  />
                </li>
              );
            })}
          </ul>
        </Select>
      </div>
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
