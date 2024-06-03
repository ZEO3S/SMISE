import Image from "next/image";
import { ChangeEventHandler, useState } from "react";

import WhiteCheckSVG from "@/assets/svgs/white_check.svg";
import Text from "../text";

interface Props {
  value?: string;
  label?: string;
  onToggle?: () => void;
}

export default function Checkbox({ value = "", label = "", onToggle }: Props) {
  const [checked, setChecked] = useState(false);

  const handleChangeChecked: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.checked);

    if (onToggle) onToggle();
  };

  return (
    <label className='flex gap-2 relative py-2'>
      <input
        className='w-5 h-5 border-default-color border rounded appearance-none'
        type='checkbox'
        checked={checked}
        onChange={handleChangeChecked}
        name={value}
      />
      {checked && (
        <Image
          className='absolute w-5 h-5 rounded bg-default-color'
          src={WhiteCheckSVG}
          alt='체크'
          priority
        />
      )}
      <Text content={label} />
    </label>
  );
}
