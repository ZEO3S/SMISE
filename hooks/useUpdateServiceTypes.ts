import { Dispatch, SetStateAction } from "react";

import { ServiceType } from "@/types/api/recruitment";

export const useUpdateServiceTypes = (
  setServiceTypes: Dispatch<SetStateAction<Array<ServiceType> | null>>
) => {
  const updateServiceTypes = (serviceType: ServiceType) => {
    setServiceTypes((prev) => {
      if (!prev) return [serviceType];

      if (prev.includes(serviceType)) {
        return prev.filter((type) => type !== serviceType);
      }

      return [...prev, serviceType];
    });
  };

  return updateServiceTypes;
};
