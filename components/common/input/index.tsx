import Image from "next/image";
import {
  ComponentPropsWithoutRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

import Button from "../button";
import Text from "../text";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  hasButton?: boolean;
  buttonImage?: any;
  onEnter?: () => void;
  onClickButton?: () => void;
}

export default function Input({
  label = "",
  value,
  hasButton = false,
  buttonImage = "",
  onChange,
  onEnter,
  onClickButton,
  ...rest
}: Props) {
  const handleKeyDownEnter: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== "Enter") return;

    if (onEnter) onEnter();
  };

  const handleClickButton: MouseEventHandler<HTMLButtonElement> = () => {
    if (onClickButton) onClickButton();
  };

  return (
    <label className='flex flex-1 justify-between px-6 py-3 rounded-full bg-default-color bg-opacity-10'>
      {label && <Text content={label} />}
      <input
        className='flex-1 bg-default-color bg-opacity-0 placeholder:text-default-color placeholder:text-opacity-50 outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDownEnter}
        {...rest}
      />
      {hasButton && (
        <Button onClick={handleClickButton}>
          <Image src={buttonImage} alt='검색 버튼' />
        </Button>
      )}
    </label>
  );
}
