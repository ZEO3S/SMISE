import { useContext } from "react";

import { SelectContext } from "../context/SelectContext";

interface Props {
  value: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

export default function Option({
  value,
  label,
  onSelect,
  disabled = true,
}: Props) {
  const selectedOption = useContext(SelectContext);

  return (
    <div className='w-full first:border-b-0' role='option'>
      <button
        className='w-full p-2 border border-default-color border-opacity-10 text-start disabled:bg-default-color disabled:bg-opacity-10 disabled:text-default-color disabled:text-opacity-20'
        value={value}
        disabled={disabled ? selectedOption?.value === value : false}
        onClick={onSelect}
      >
        {label}
      </button>
    </div>
  );
}
