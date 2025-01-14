import { ServiceType } from '@/types/api/recruitment';

import Radio from '@/components/common/radio';
import Text from '@/components/common/text';

const SERVICE_TYPES: Array<ServiceType> = ['산업기능요원', '전문연구요원', '승선근무예비역'];

interface Props {
  updateServiceType: (string: ServiceType) => void;
}

export default function ServiceTypesFilter({ updateServiceType }: Props) {
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
                  onChecked={() => updateServiceType(serviceTypes)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
