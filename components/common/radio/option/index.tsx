import Image from "next/image";
import { ChangeEventHandler, useContext } from "react";

import WhiteCheckSVG from "@/assets/svgs/white_check.svg";
import Text from "../../text";

import { RadioContext } from "../context";

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
    <label className='flex gap-2 relative py-2'>
      <input
        className='w-5 h-5 border border-default-color rounded-full appearance-none'
        type='radio'
        value={value}
        checked={group?.selectedValue === value}
        onChange={handleChangeRadio}
      />
      {group?.selectedValue === value && (
        <Image
          className='absolute w-5 h-5 rounded-full bg-default-color'
          src={WhiteCheckSVG}
          alt='체크'
          priority
        />
      )}
      <Text content={label} />
    </label>
  );
}
