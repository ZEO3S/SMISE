import { useSearchParams } from 'next/navigation';

import { isValidLocations } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useLocations = () => {
  const searchParams = useSearchParams();
  const locationsQueryParam = searchParams.get(PARAMS.LOCATIONS);
  const districts = locationsQueryParam?.split('&');
  const locations = districts?.map((citiesWithDistrict) => {
    const cities = citiesWithDistrict.split(',');
    const district = cities.shift();

    return {
      district,
      cities,
    };
  });

  return isValidLocations(locations) ? locations : null;
};
