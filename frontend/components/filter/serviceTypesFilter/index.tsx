import { Dispatch, SetStateAction } from "react";

import Radio from "@/components/common/radio";
import Text from "@/components/common/text";

import { ServiceType } from "@/types/api/recruitment";
import { useUpdateServiceTypes } from "@/hooks/useUpdateServiceTypes";

const SERVICE_TYPES: Array<ServiceType> = [
  "산업기능요원",
  "전문연구요원",
  "승선근무예비역",
];

interface Props {
  setServiceType: Dispatch<SetStateAction<ServiceType | null>>;
}

export default function ServiceTypesFilter({ setServiceType }: Props) {
  const updateServiceTypes = useUpdateServiceTypes(setServiceType);

  return (
    <div className='pb-2'>
      <div className='pb-2'>
        <Text variant='semi-title' content='복무형태' />
      </div>
      <Radio>
        <ul>
          {SERVICE_TYPES.map((serviceTypes) => {
            return (
              <li key={serviceTypes}>
                <Radio.Option
                  value={serviceTypes}
                  label={serviceTypes}
                  onChecked={() => updateServiceTypes(serviceTypes)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
