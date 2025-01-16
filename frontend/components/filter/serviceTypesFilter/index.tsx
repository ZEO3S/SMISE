import { SERVICE_TYPES } from '@/constants/api/queryParams';

import Radio from '@/components/common/radio';
import Text from '@/components/common/text';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export default function ServiceTypesFilter() {
  const { pushRoute } = usePushRouteWithQueryParam();

  return (
    <div className='pb-2'>
      <div className='pb-2'>
        <Text variant='semi-title' content='복무형태' />
      </div>
      <Radio>
        <ul>
          {SERVICE_TYPES.map((serviceType) => {
            return (
              <li key={serviceType}>
                <Radio.Option
                  value={serviceType}
                  label={serviceType}
                  onChecked={() => pushRoute('serviceType', serviceType)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
