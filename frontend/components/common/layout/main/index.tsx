import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
  return <main className='flex flex-1'>{children}</main>;
}
