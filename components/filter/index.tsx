import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import Text from "../common/text";
import Select from "../common/select";
import ServiceTypesFilter from "./serviceTypesFilter";

import { ServiceType } from "@/types/api/recruitment";

interface Props {
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>;
}

export default function Filter({ setServiceTypes }: Props) {
  return (
    <div>
      <ServiceTypesFilter setServiceTypes={setServiceTypes} />
      <div>
        <Text variant='semi-title' content='역종' />
        <Text content='보충역' />
        <Text content='현역' />
      </div>
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
        <Select
          options={[
            {
              value: "학력 무관",
              label: "학력 무관",
            },
            {
              value: "고교 졸업",
              label: "고교 졸업",
            },
          ]}
        />
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
