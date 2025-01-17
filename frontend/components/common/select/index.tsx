import Image from 'next/image';
import { PropsWithChildren, useRef } from 'react';

import ArrowSVG from '@/assets/svgs/arrow.svg';

import { SelectOption } from '@/types/component/select';

import Button from '@/components/common/button';
import { Options } from '@/components/common/select/options';
import Option from '@/components/common/select/options/option';

import { useClickOutsideHandler } from '@/hooks/useClickOutsideHandler';
import { useOpenDirection } from '@/hooks/useOpenDirection';
import { useSelect } from '@/hooks/useSelect';

interface Props extends PropsWithChildren {
  initialValue?: SelectOption | null;
  onChange?: (selectedOption?: SelectOption) => void;
}

export default function Select({ initialValue = null, children, onChange }: Props) {
  const ref = useRef<HTMLFieldSetElement | null>(null);
  const { isOpen, selectedOption, closeSelect, toggleSelect, updateSelectedOption } = useSelect(initialValue);
  const { openDirection, updateOpenDirection } = useOpenDirection<HTMLFieldSetElement>(ref);

  useClickOutsideHandler(ref, closeSelect);

  const handleButtonClick = () => {
    updateOpenDirection();
    toggleSelect();
  };

  return (
    <fieldset className='relative' ref={ref} role='combobox' aria-controls='select-list' aria-expanded={isOpen}>
      <Button
        className='flex justify-between gap-1 w-full p-2 border border-default-color border-opacity-10 select-none'
        onClick={handleButtonClick}
      >
        {selectedOption?.label}
        <Image className={isOpen ? 'rotate-180 ' : ''} src={ArrowSVG} alt='토글 버튼' />
      </Button>
      <Options
        selectedOption={selectedOption}
        openDirection={openDirection ?? 'up'}
        isOpen={isOpen}
        updateSelectedOption={updateSelectedOption}
        closeSelect={closeSelect}
        onChange={onChange}
      >
        {children}
      </Options>
    </fieldset>
  );
}

Select.Option = Option;
