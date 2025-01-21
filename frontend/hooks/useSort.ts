import { useSearchParams } from 'next/navigation';

import { isValidSort } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useSort = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get(PARAMS.SORT);

  return isValidSort(sort) ? sort : null;
};
