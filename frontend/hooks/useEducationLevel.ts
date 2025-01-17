import { useSearchParams } from 'next/navigation';

import { isValidEducationLevel } from '@/types/guards/queryParams';

export const useEducationLevel = () => {
  const searchParams = useSearchParams();
  const educationLevel = searchParams.get('educationLevel');

  return isValidEducationLevel(educationLevel) ? educationLevel : null;
};
