import { useSearchParams } from 'next/navigation';

import { isValidServiceStatus } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useServiceStatus = () => {
  const searchParams = useSearchParams();
  const serviceStatus = searchParams.get(PARAMS.SERVICE_STATUS);

  return isValidServiceStatus(serviceStatus) ? serviceStatus : null;
};
