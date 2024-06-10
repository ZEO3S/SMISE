import Image from "next/image";
import { ChangeEventHandler, useContext } from "react";

import WhiteCheckSVG from "@/assets/svgs/white_check.svg";
import Text from "../../text";

import { RadioContext } from "../context/RadioContext";

interface Props {
  value: string;
  label: string;
  onChecked?: () => void;
}

export default function Option({ value, label, onChecked }: Props) {
  const group = useContext(RadioContext);

  const handleChangeRadio: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (group) group.onChange(event);
    if (onChecked) onChecked();
  };

  return (
    <label className='flex flex-1 gap-2 relative py-2 cursor-pointer hover:bg-default-color hover:bg-opacity-10'>
      <input
        className='w-5 h-5 border border-default-color rounded-full cursor-pointer'
        type='radio'
        value={value}
        checked={group?.selectedValue === value}
        onChange={handleChangeRadio}
      />
      {group?.selectedValue === value && (
        <Image
          className='absolute w-5 h-5 rounded-full bg-green-800'
          src={WhiteCheckSVG}
          alt='체크'
          priority
        />
      )}
      <Text content={label} />
    </label>
  );
}
