import { Dispatch, SetStateAction } from "react";

import { ServiceStatus } from "@/types/api/recruitment";
import { SERVICE_STATUSES } from "@/constants/components/serviceStatus";

export const useUpdateServiceStatus = (
  setServiceStatus: Dispatch<SetStateAction<ServiceStatus | null>>
) => {
  const updateServiceStatus = (serviceStatus: string) => {
    const isServiceStatus = (value: string): value is ServiceStatus => {
      return SERVICE_STATUSES.includes(value);
    };

    if (!isServiceStatus(serviceStatus)) return;

    setServiceStatus(serviceStatus);
  };

  return updateServiceStatus;
};
