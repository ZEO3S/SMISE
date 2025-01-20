import { useSearchParams } from 'next/navigation';

import { isValidSort } from '@/types/guards/queryParams';

export const useSort = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  return isValidSort(sort) ? sort : null;
};
