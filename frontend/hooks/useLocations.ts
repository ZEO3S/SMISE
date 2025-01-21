import { useSearchParams } from 'next/navigation';

import { isValidLocations } from '@/types/guards/queryParams';

export const useLocations = () => {
  const searchParams = useSearchParams();
  const locationsQueryParam = searchParams.get('locations');
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
