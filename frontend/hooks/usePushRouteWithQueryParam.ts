import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const usePushRouteWithQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const pushRoute = useCallback(
    (name: string, value: string) => router.push(`${pathname}?${createQueryParam(name, value)}`),
    [router, pathname, createQueryParam],
  );

  return { pushRoute };
};
