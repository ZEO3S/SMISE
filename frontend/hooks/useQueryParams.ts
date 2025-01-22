import { useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return params.toString();
};
