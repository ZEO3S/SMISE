import { MutableRefObject, useEffect } from 'react';

export const useClickOutsideHandler = <Element extends HTMLElement>(
  ref: MutableRefObject<Element | null>,
  onClose: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
};
