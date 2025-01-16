import { SERVICE_STATUSES } from '@/constants/api/queryParams';

import Radio from '@/components/common/radio';
import Text from '@/components/common/text';

import { usePushRouteWithQueryParam } from '@/hooks/usePushRouteWithQueryParam';

export default function ServiceStatusFilter() {
  const { pushRoute } = usePushRouteWithQueryParam();

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
                  onChecked={() => pushRoute('serviceStatus', serviceStatus)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
