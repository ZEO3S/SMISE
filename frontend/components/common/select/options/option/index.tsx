import { useContext } from 'react';

import { SelectOption } from '@/types/component/select';

import { SelectContext } from '@/components/common/select/context/SelectContext';

interface Props {
  option: SelectOption;
}

export default function Option({ option }: Props) {
  const context = useContext(SelectContext);

  if (!context) throw new Error('Option must be used within a SelectContextProvider');

  const isSelected = context.value === option.value;

  return (
    <div className='w-full first:border-b-0' role='option' aria-selected={isSelected}>
      <button
        className='w-full p-2 border border-default-color border-opacity-10 text-start hover:bg-default-color hover:bg-opacity-10'
        disabled={isSelected}
        onClick={() => context.onSelect(option)}
      >
        {option.label}
      </button>
    </div>
  );
}
