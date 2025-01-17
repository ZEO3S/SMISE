import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutsideHandler } from '@/hooks/useClickOutsideHandler';

interface Props extends PropsWithChildren {
  openState: boolean;
  onClose: () => void;
}

export default function Modal({ openState, children, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutsideHandler<HTMLDivElement>(ref, onClose);

  if (!openState) return null;

  return createPortal(
    <div className='flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-default-color bg-opacity-50 z-30'>
      <div ref={ref}>{children}</div>
    </div>,
    document.body,
  );
}
