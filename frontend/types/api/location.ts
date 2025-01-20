import { LOCATIONS } from '@/constants/components/location';

export type District = keyof typeof LOCATIONS;

export interface Location {
  district: District;
  cities: Array<string>;
}
