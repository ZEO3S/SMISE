import Image from "next/image";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from "react";

import Button from "../button";

interface Props {
  hasButton?: boolean;
  buttonImage?: any;
  onEnter?: (value: string) => void;
}

export default function Input({
  hasButton = false,
  buttonImage = "",
  onEnter,
}: Props) {
  const [value, setValue] = useState<string>("");

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDownEnter: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== "Enter") return;

    if (onEnter) onEnter(value);
  };

  const handleClickButton: MouseEventHandler<HTMLButtonElement> = () => {
    if (onEnter) onEnter(value);
  };

  return (
    <div className='flex flex-1 justify-between px-6 py-3 rounded-full bg-default-color bg-opacity-10'>
      <input
        className='flex-1 bg-default-color bg-opacity-0 placeholder:text-default-color placeholder:text-opacity-50 outline-none'
        value={value}
        placeholder='검색어를 입력해 주세요.'
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownEnter}
      />
      {hasButton && (
        <Button onClick={handleClickButton}>
          <Image src={buttonImage} alt='검색 버튼' />
        </Button>
      )}
    </div>
  );
}
