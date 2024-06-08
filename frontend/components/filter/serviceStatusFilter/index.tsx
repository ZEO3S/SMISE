import { Dispatch, SetStateAction } from "react";

import Text from "@/components/common/text";
import Radio from "@/components/common/radio";

import { ServiceStatus } from "@/types/api/recruitment";
import { useUpdateServiceStatus } from "@/hooks/useUpdateServiceStatus";
import { SERVICE_STATUSES } from "@/constants/components/serviceStatus";

interface Props {
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>;
}

export default function ServiceStatusFilter({ setServiceStatus }: Props) {
  const updateServiceStatus = useUpdateServiceStatus(setServiceStatus);

  return (
    <div className='py-2'>
      <div className='py-2'>
        <Text variant='semi-title' content='역종' />
      </div>
      <Radio>
        <ul>
          {SERVICE_STATUSES.map((serviceStatus) => {
            return (
              <li key={serviceStatus}>
                <Radio.Option
                  value={serviceStatus}
                  label={serviceStatus}
                  onChecked={() => updateServiceStatus(serviceStatus)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
