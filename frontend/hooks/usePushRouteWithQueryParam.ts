import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePushRouteWithQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const createQueryParam = (name: string, value: string) => {
    params.set(name, value);

    return params.toString();
  };

  const pushRoute = (name: string, value: string) => router.push(`${pathname}?${createQueryParam(name, value)}`);

  const deleteQueryParam = (name: string) => {
    params.delete(name);

    if (!params.size) {
      router.push(`${pathname}`);
    } else {
      const queryParams = params.toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };

  return { pushRoute, deleteQueryParam };
};
