import { useSearchParams } from 'next/navigation';

import { isValidEducationLevel } from '@/types/guards/queryParams';

import { PARAMS } from '@/constants/api/queryParams';

export const useEducationLevel = () => {
  const searchParams = useSearchParams();
  const educationLevel = searchParams.get(PARAMS.EDUCATION_LEVEL);

  return isValidEducationLevel(educationLevel) ? educationLevel : null;
};
