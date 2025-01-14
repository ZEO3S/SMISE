import { useState } from 'react';

import { District, Location } from '@/types/api/recruitment';

export const useSelectedLocations = (locations: Array<Location> | null) => {
  const [selectedLocations, setSelectedLocations] = useState<Array<Location> | null>(locations);

  const addSelectedLocation = (selectedDistrict: District | null, city: string) => {
    setSelectedLocations((prev) => {
      if (!selectedDistrict) return prev;

      if (!prev) {
        return [
          {
            district: selectedDistrict,
            cities: [city],
          },
        ];
      }

      const targetIndex = prev.findIndex((prevLocation) => prevLocation.district === selectedDistrict);

      if (targetIndex === -1) {
        return [
          ...prev,
          {
            district: selectedDistrict,
            cities: [city],
          },
        ];
      }

      return prev.map((prevLocation, index) => {
        if (index !== targetIndex) return prevLocation;

        return {
          ...prevLocation,
          cities: [...prevLocation.cities, city],
        };
      });
    });
  };

  const deleteSelectedLocation = (selectedDistrict: District | null, city: string) => {
    setSelectedLocations((prev) => {
      if (!selectedDistrict || !prev) return prev;

      const targetIndex = prev.findIndex((prevLocation) => prevLocation.district === selectedDistrict);

      if (targetIndex === -1) return prev;

      const newCities = prev[targetIndex].cities.filter((c) => c !== city);

      if (newCities.length === 0) {
        return prev.filter((_, index) => index !== targetIndex);
      }

      return prev.map((prevLocation, index) => {
        if (index !== targetIndex) return prevLocation;

        return {
          ...prevLocation,
          cities: newCities,
        };
      });
    });
  };

  const clearSelectedLocation = () => {
    setSelectedLocations(null);
  };

  const initializeSelectedLocation = () => setSelectedLocations(locations);

  return {
    selectedLocations,
    addSelectedLocation,
    deleteSelectedLocation,
    clearSelectedLocation,
    initializeSelectedLocation,
  };
};
