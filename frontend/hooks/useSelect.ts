import { useState } from 'react';

import { SelectOption } from '@/types/component/select';

export const useSelect = (initialValue: SelectOption | null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(initialValue);

  const updateSelectedOption = (option: SelectOption) => setSelectedOption(option);

  const closeSelect = () => setIsOpen(false);

  const toggleSelect = () => setIsOpen(!isOpen);

  return {
    isOpen,
    selectedOption,
    closeSelect,
    toggleSelect,
    updateSelectedOption,
  };
};
