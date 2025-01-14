import { useEffect, useState } from 'react';

type Status = 'pending' | 'fulfilled' | 'error';

type Params<Key, Data> = {
  fetch: () => Promise<Data>;
  key: Key;
  suspense?: boolean;
  enable?: boolean;
};

export const useFetch = <Key, Data>({ fetch, key, suspense = false, enable = true }: Params<Key, Data>) => {
  const [suspender, setSuspender] = useState<Promise<void>>();
  const [status, setStatus] = useState<Status>('pending');
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const resolvePromise = (data: Data) => {
    setStatus('fulfilled');
    setData(data);
  };

  const rejectPromise = (error: Error) => {
    setStatus('error');
    setError(error);
  };

  useEffect(() => {
    if (!enable) return;

    setStatus('pending');

    setSuspender(fetch().then(resolvePromise, rejectPromise));
  }, [key, enable]);

  if (suspense && status === 'pending' && suspender) throw suspender;
  if (status === 'error') throw error;

  return { data, isLoading: status === 'pending', error };
};
