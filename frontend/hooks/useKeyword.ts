import { useSearchParams } from 'next/navigation';

export const useKeyword = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  return typeof keyword === 'string' ? keyword : null;
};
