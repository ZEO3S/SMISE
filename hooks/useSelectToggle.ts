import { useEffect, useRef, useState } from "react";

export const useSelectToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const closeSelect = () => setIsOpen(false);

  const toggleSelect = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside: EventListenerOrEventListenerObject = (event) => {
      if (
        !sectionRef.current ||
        sectionRef.current.contains(event.target as Node)
      )
        return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isOpen,
    sectionRef,
    closeSelect,
    toggleSelect,
  };
};
