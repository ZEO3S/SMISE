import { useState } from "react";

export const useSelectToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSelect = () => setIsOpen(false);

  const toggleSelect = () => setIsOpen(!isOpen);

  return {
    isOpen,
    closeSelect,
    toggleSelect,
  };
};
