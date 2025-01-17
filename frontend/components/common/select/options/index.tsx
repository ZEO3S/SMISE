import { PropsWithChildren } from 'react';

import { SelectOption } from '@/types/component/select';

import SelectContextProvider from '@/components/common/select/context';

interface Props extends PropsWithChildren {
  selectedOption: SelectOption | null;
  openDirection: 'up' | 'down';
  isOpen: boolean;
  updateSelectedOption: (option: SelectOption) => void;
  closeSelect: () => void;
  onChange?: (selectedOption?: SelectOption) => void;
}

export function Options({
  selectedOption,
  openDirection,
  isOpen,
  children,
  updateSelectedOption,
  onChange,
  closeSelect,
}: Props) {
  const handleOptionSelect = (option: SelectOption) => {
    updateSelectedOption(option);
    onChange?.(option);
    closeSelect();
  };

  return (
    <SelectContextProvider
      value={{
        value: selectedOption?.value || '',
        label: selectedOption?.label || '',
        onSelect: handleOptionSelect,
      }}
    >
      {isOpen && (
        <legend
          className={`absolute w-full bg-white z-20 ${openDirection === 'down' ? 'top-full' : 'bottom-full'}`}
          role='listbox'
        >
          {children}
        </legend>
      )}
    </SelectContextProvider>
  );
}
