import { useState } from 'react';

import { District, Location } from '@/types/api/location';

interface FilterLocations {
  selectedDistrict: District | null;
  locations: Array<Location> | null;
}

export const useFilterLocations = (locations: Array<Location> | null) => {
  const [filterLocations, setFilterLocations] = useState<FilterLocations>({
    locations,
    selectedDistrict: null,
  });

  const clearSelectedDistrict = () => {
    setFilterLocations((prev) => ({ ...prev, selectedDistrict: null }));
  };

  const updateDistrict = (district: District) => {
    setFilterLocations((prev) => ({ ...prev, selectedDistrict: district }));
  };

  const addCity = (id: string) => {
    setFilterLocations((prev) => {
      if (!prev.selectedDistrict) return prev;

      if (!prev.locations) {
        return {
          selectedDistrict: prev.selectedDistrict,
          locations: [{ district: prev.selectedDistrict, cities: [id] }],
        };
      }

      const targetIndex = prev.locations?.findIndex((prevLocation) => prevLocation.district === prev.selectedDistrict);
      if (targetIndex === -1) {
        return {
          selectedDistrict: prev.selectedDistrict,
          locations: [
            ...prev.locations,
            {
              district: prev.selectedDistrict,
              cities: [id],
            },
          ],
        };
      }

      return {
        selectedDistrict: prev.selectedDistrict,
        locations: prev.locations.map((prevLocation, index) =>
          index !== targetIndex
            ? prevLocation
            : {
                ...prevLocation,
                cities: [...prevLocation.cities, id],
              },
        ),
      };
    });
  };

  const deleteCity = (id: string) => {
    setFilterLocations((prev) => {
      if (!prev.selectedDistrict || !prev.locations) return prev;

      const targetIndex = prev.locations.findIndex((prevLocation) => prevLocation.district === prev.selectedDistrict);

      if (targetIndex === -1) return prev;

      const newCities = prev.locations[targetIndex].cities.filter((cityId) => cityId !== id);

      if (!newCities.length) {
        return {
          selectedDistrict: prev.selectedDistrict,
          locations: prev.locations.filter((_, index) => index !== targetIndex),
        };
      }

      return {
        selectedDistrict: prev.selectedDistrict,
        locations: prev.locations.map((prevLocation, index) =>
          index !== targetIndex
            ? prevLocation
            : {
                ...prevLocation,
                cities: newCities,
              },
        ),
      };
    });
  };

  const clearFilterLocations = () => {
    setFilterLocations({
      locations: null,
      selectedDistrict: null,
    });
  };

  return {
    filterLocations,
    selectedDistrict: filterLocations.selectedDistrict,
    citiesWithSelectedDistrict:
      filterLocations.locations?.find((location) => location.district === filterLocations.selectedDistrict)?.cities ??
      null,
    selectedLocations: filterLocations.locations,
    updateDistrict,
    clearSelectedDistrict,
    addCity,
    deleteCity,
    clearFilterLocations,
  };
};
