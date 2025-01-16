import { ServiceStatus, ServiceType } from '@/types/api/recruitment';

import { SERVICE_STATUSES, SERVICE_TYPES } from '@/constants/api/queryParams';

export const isValidServiceType = (value: unknown): value is ServiceType => {
  const serviceType = value as ServiceType;

  return SERVICE_TYPES.includes(serviceType);
};

export const isValidServiceStatus = (value: unknown): value is ServiceStatus => {
  const serviceStatus = value as ServiceStatus;

  return SERVICE_STATUSES.includes(serviceStatus);
};
