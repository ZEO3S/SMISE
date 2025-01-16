import { useSearchParams } from 'next/navigation';

import { isValidServiceType } from '@/types/guards/queryParams';

export const useServiceType = () => {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get('serviceType');

  return isValidServiceType(serviceType) ? serviceType : null;
};
