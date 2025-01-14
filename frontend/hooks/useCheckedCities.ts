import { useState } from 'react';

import { District, Location } from '@/types/api/recruitment';

export const useCheckedCities = (locations: Array<Location> | null) => {
  const defaultCheckedCities = locations
    ? locations.flatMap((location) => {
        return location.cities.map((city) => {
          return `${location.district}-${city}`;
        });
      })
    : null;
  const [checkedCities, setCheckedCities] = useState<Array<string> | null>(defaultCheckedCities);

  const generateCityKey = (district: District, city: string) => {
    return `${district}-${city}`;
  };

  const addCheckedCity = (checkedCity: string) => {
    setCheckedCities((prev) => (prev ? [...prev, checkedCity] : [checkedCity]));
  };

  const deleteCheckedCity = (checkedCity: string) => {
    setCheckedCities((prev) => {
      const newCheckedCities = prev?.filter((key) => key !== checkedCity);

      if (!prev || !newCheckedCities || !newCheckedCities.length) return null;

      return newCheckedCities;
    });
  };

  const clearCheckedCities = () => {
    setCheckedCities(null);
  };

  const initializeCheckedCities = () => {
    setCheckedCities(defaultCheckedCities);
  };

  return {
    checkedCities,
    generateCityKey,
    addCheckedCity,
    deleteCheckedCity,
    clearCheckedCities,
    initializeCheckedCities,
  };
};
