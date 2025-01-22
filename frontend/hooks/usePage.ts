import { useSearchParams } from 'next/navigation';

import { PARAMS } from '@/constants/api/queryParams';

export const usePage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get(PARAMS.PAGE);

  return page ?? '0';
};
