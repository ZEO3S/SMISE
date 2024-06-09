import { useEffect, useRef } from "react";

export const useClickOutsideHandler = <ElementType extends HTMLElement>(
  onClickOutside: () => void
) => {
  const ref = useRef<ElementType>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClickOutside]);

  return ref;
};
