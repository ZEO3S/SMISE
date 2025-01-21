import { EducationLevel } from '@/types/api/educationLevel';
import { District, Location } from '@/types/api/location';
import { ServiceStatus } from '@/types/api/serviceStatus';
import { ServiceType } from '@/types/api/serviceType';
import { Sort } from '@/types/api/sort';

import { EDUCATION_LEVELS } from '@/constants/api/educationLevel';
import { SERVICE_STATUSES, SERVICE_TYPES } from '@/constants/api/queryParams';
import { LOCATIONS } from '@/constants/components/location';

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

export const isValidDistrict = (value: unknown): value is District => {
  return typeof value === 'string' && value in LOCATIONS;
};

export const isValidLocations = (value: unknown): value is Array<Location> => {
  const locations = value as Array<Location>;

  return (
    Array.isArray(locations) &&
    locations.every(
      (location) =>
        typeof location === 'object' && Object.hasOwn(location, 'district') && Object.hasOwn(location, 'cities'),
    )
  );
};
