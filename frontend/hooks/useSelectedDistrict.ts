import { useState } from 'react';

import { District } from '@/types/api/location';

import { LOCATIONS } from '@/constants/components/location';

export const useSelectedDistrict = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  const isDistrict = (unknown: unknown): unknown is District => {
    return typeof unknown === 'string' && unknown in LOCATIONS;
  };

  const clearSelectedDistrict = () => {
    setSelectedDistrict(null);
  };

  const updateSelectedDistrict = (district: District) => {
    setSelectedDistrict(district);
  };

  return {
    selectedDistrict,
    isDistrict,
    updateSelectedDistrict,
    clearSelectedDistrict,
  };
};
