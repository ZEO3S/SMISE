import { MutableRefObject, useRef } from 'react';

export const useOpenDirection = <Element extends HTMLElement>(ref: MutableRefObject<Element | null>) => {
  const openDirection = useRef<'up' | 'down'>();

  const updateOpenDirection = () => {
    if (!ref.current) return;

    const { top, bottom } = ref.current.getBoundingClientRect();

    if (Math.round((top + bottom) / 2) < innerHeight / 2) openDirection.current = 'down';
    else openDirection.current = 'up';
  };

  return { openDirection: openDirection.current, updateOpenDirection };
};
