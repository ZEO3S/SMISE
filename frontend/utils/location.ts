import { District } from '@/types/api/location';

export const generateCityId = (district: District, city: string) => `${district}-${city}`;
