import { useState } from 'react';

import { generateCityId } from '@/utils/location';

import { Location } from '@/types/api/location';

export const useCities = (locations: Array<Location> | null) => {
  const defaultCities = locations
    ? locations.flatMap((location) => location.cities.map((city) => generateCityId(location.district, city)))
    : null;
  const [cities, setCities] = useState<Array<string> | null>(defaultCities);

  const addCity = (id: string) => setCities((prev) => (prev ? [...prev, id] : [id]));

  const deleteCity = (id: string) => {
    setCities((prev) => {
      const newCities = prev?.filter((key) => key !== id);

      if (!prev || !newCities || !newCities.length) return null;

      return newCities;
    });
  };

  const clearCities = () => setCities(null);

  const initializeCities = () => setCities(defaultCities);

  return {
    cities,
    addCity,
    deleteCity,
    clearCities,
    initializeCities,
  };
};
