import { useState } from 'react';

import { District, Location } from '@/types/api/location';

export const useDistrict = (locations: Array<Location> | null) => {
  const defaultDistrict = locations && Boolean(locations.length) ? locations[0].district : null;
  const [district, setDistrict] = useState<District | null>(defaultDistrict);

  const clearDistrict = () => setDistrict(null);

  const updateDistrict = (district: District) => setDistrict(district);

  return {
    district,
    updateDistrict,
    clearDistrict,
  };
};
