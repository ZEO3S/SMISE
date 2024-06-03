import { Dispatch, SetStateAction } from "react";

import Checkbox from "@/components/common/checkbox";
import Text from "@/components/common/text";

import { ServiceType } from "@/types/api/recruitment";
import { useUpdateServiceTypes } from "@/hooks/useUpdateServiceTypes";

const SERVICE_TYPES: Array<ServiceType> = [
  "산업기능요원",
  "전문연구요원",
  "승선근무예비역",
];

interface Props {
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>;
}

export default function ServiceTypesFilter({ setServiceTypes }: Props) {
  const updateServiceTypes = useUpdateServiceTypes(setServiceTypes);

  return (
    <div>
      <Text variant='semi-title' content='복무형태' />
      {SERVICE_TYPES!.map((serviceType) => {
        return (
          <Checkbox
            key={serviceType}
            value={serviceType}
            label={serviceType}
            onToggle={() => updateServiceTypes(serviceType)}
          />
        );
      })}
    </div>
  );
}
