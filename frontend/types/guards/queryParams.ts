import { EducationLevel } from '@/types/api/educationLevel';
import { Location, ServiceStatus, ServiceType } from '@/types/api/recruitment';
import { Sort } from '@/types/api/sort';

import { EDUCATION_LEVELS } from '@/constants/api/educationLevel';
import { SERVICE_STATUSES, SERVICE_TYPES } from '@/constants/api/queryParams';

export const isValidServiceType = (value: unknown): value is ServiceType => {
  const serviceType = value as ServiceType;

  return serviceType && SERVICE_TYPES.includes(serviceType);
};

export const isValidServiceStatus = (value: unknown): value is ServiceStatus => {
  const serviceStatus = value as ServiceStatus;

  return serviceStatus && SERVICE_STATUSES.includes(serviceStatus);
};

export const isValidEducationLevel = (value: unknown): value is EducationLevel => {
  const educationLevel = value as EducationLevel;

  return educationLevel && EDUCATION_LEVELS.includes(educationLevel);
};

export const isValidSort = (value: unknown): value is Sort => {
  return value === '최신순' || value === '마감순';
};

export const isValidLocations = (value: unknown): value is Array<Location> => {
  const locations = value as Array<Location>;

  return locations;
};
