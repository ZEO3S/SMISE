import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { SERVICE_TYPES } from '@/constants/api/queryParams';

import Radio from '@/components/common/radio';
import Text from '@/components/common/text';

export default function ServiceTypesFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

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
                  onChecked={() => router.push(`${pathname}?${createQueryParam('serviceType', serviceType)}`)}
                />
              </li>
            );
          })}
        </ul>
      </Radio>
    </div>
  );
}
