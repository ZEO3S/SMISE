import { useSearchParams } from 'next/navigation';

import { isValidServiceStatus } from '@/types/guards/queryParams';

export const useServiceStatus = () => {
  const searchParams = useSearchParams();
  const serviceStatus = searchParams.get('serviceStatus');

  return isValidServiceStatus(serviceStatus) ? serviceStatus : null;
};
