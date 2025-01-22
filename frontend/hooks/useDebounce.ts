import { useCallback, useRef } from 'react';

export const useDebounce = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(callback, delay);
  }, []);

  return debounce;
};
