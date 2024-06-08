import { Dispatch, SetStateAction } from "react";

import { ServiceType } from "@/types/api/recruitment";

export const useUpdateServiceTypes = (
  setServiceTypes: Dispatch<SetStateAction<ServiceType | null>>
) => {
  const updateServiceTypes = (serviceType: ServiceType) => {
    setServiceTypes(serviceType);
  };

  return updateServiceTypes;
};
