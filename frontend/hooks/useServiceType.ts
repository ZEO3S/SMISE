import { useSearchParams } from 'next/navigation';

import { isValidServiceType } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useServiceType = () => {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get(PARAMS.SERVICE_TYPE);

  return isValidServiceType(serviceType) ? serviceType : null;
};
