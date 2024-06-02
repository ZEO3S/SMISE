import { useState } from "react";
import Image from "next/image";

import Button from "../button";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import { Option } from "@/types/components/select";
import { useSelectToggle } from "@/hooks/useSelectToggle";

interface Props {
  options: Array<Option>;
  onSelect?: (selectedOption: Option) => void;
}

export default function Select({ options, onSelect }: Props) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { isOpen, sectionRef, closeSelect, toggleSelect } = useSelectToggle();

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    closeSelect();

    if (onSelect) onSelect(option);
  };

  return (
    <section className='relative' ref={sectionRef} role='combobox'>
      <Button
        className='flex gap-1 p-2 border border-default-color border-opacity-10'
        onClick={toggleSelect}
      >
        {selectedOption.label}
        <Image
          className={isOpen ? "rotate-180" : ""}
          src={ArrowSVG}
          alt='토글 버튼'
        />
      </Button>
      {isOpen && (
        <ul className='absolute w-full bg-white' role='listbox'>
          {options.map((option) => {
            return (
              <li
                className='w-full first:border-b-0'
                key={option.value}
                role='option'
              >
                <button
                  className='w-full p-2 border border-default-color border-opacity-10 text-start disabled:bg-default-color disabled:bg-opacity-10 disabled:text-default-color disabled:text-opacity-20'
                  value={option.value}
                  disabled={selectedOption.value === option.value}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
