import Image from 'next/image';
import { ChangeEventHandler, useState } from 'react';

import WhiteCheckSVG from '@/assets/svgs/white_check.svg';

import Text, { Variant as TextVariant } from '../text';

type BoxPosition = 'left' | 'right';

interface Props {
  value?: string;
  label?: string;
  defaultChecked?: boolean;
  boxPosition?: BoxPosition;
  textVariant?: TextVariant;
  padding?: boolean;
  hover?: boolean;
  rounded?: boolean;
  onCheck?: () => void;
  onUnCheck?: () => void;
  onToggle?: () => void;
}

export default function Checkbox({
  value = '',
  label = '',
  defaultChecked = false,
  boxPosition = 'left',
  textVariant = 'base',
  padding = false,
  hover = false,
  rounded = false,
  onCheck,
  onUnCheck,
  onToggle,
}: Props) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChangeChecked: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      if (onCheck) onCheck();
    } else {
      if (onUnCheck) onUnCheck();
    }

    if (onToggle) onToggle();
  };

  return (
    <label
      className={`
				flex justify-between items-center gap-2 relative py-2 cursor-pointer
				${hover ? 'hover:bg-default-color hover:bg-opacity-10' : ''}
				${padding ? 'p-2' : ''}
				${rounded ? 'rounded' : ''}
			`}
    >
      {boxPosition === 'left' ? (
        <>
          <div className='relative'>
            {checked && (
              <Image className='absolute w-5 h-5 rounded bg-default-color' src={WhiteCheckSVG} alt='체크' priority />
            )}
            <input
              className='w-5 h-5 border-default-color border rounded cursor-pointer appearance-none'
              type='checkbox'
              checked={checked}
              onChange={handleChangeChecked}
              name={value}
            />
          </div>
          <Text variant={textVariant} content={label} />
        </>
      ) : (
        <>
          <Text variant={textVariant} content={label} />
          <div className='relative'>
            {checked && (
              <Image
                className='absolute right-0 w-5 h-5 rounded bg-green-800'
                src={WhiteCheckSVG}
                alt='체크'
                priority
              />
            )}
            <input
              className='w-5 h-5 border-default-color border rounded cursor-pointer appearance-none'
              type='checkbox'
              checked={checked}
              onChange={handleChangeChecked}
              name={value}
            />
          </div>
        </>
      )}
    </label>
  );
}
