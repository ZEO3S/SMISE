import Text from "@/components/common/text";
import Radio from "@/components/common/radio";

import { SERVICE_STATUSES } from "@/constants/components/serviceStatus";

interface Props {
  updateServiceStatus: (string: string) => void;
}

export default function ServiceStatusFilter({ updateServiceStatus }: Props) {
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
