import { useState } from "react";

import { LOCATIONS } from "@/constants/components/location";
import { District } from "@/types/api/recruitment";

export const useSelectedDistrict = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );

  const isDistrict = (unknown: unknown): unknown is District => {
    return typeof unknown === "string" && unknown in LOCATIONS;
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
