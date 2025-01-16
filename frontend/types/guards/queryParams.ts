import { ServiceType } from '@/types/api/recruitment';

import { SERVICE_TYPES } from '@/constants/api/queryParams';

export const isValidServiceType = (value: unknown): value is ServiceType => {
  const serviceType = value as ServiceType;

  return SERVICE_TYPES.includes(serviceType);
};
