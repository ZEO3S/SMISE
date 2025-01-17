import { useSearchParams } from 'next/navigation';

import { isValidLocations } from '@/types/guards/queryParams';

export const useLocations = () => {
  const searchParams = useSearchParams();
  const locations = searchParams.get('locations');

  return isValidLocations(locations) ? locations : null;
};
