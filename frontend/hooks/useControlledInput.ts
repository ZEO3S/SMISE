import { ChangeEventHandler, useState } from 'react';

export const useControlledInput = () => {
  const [value, setValue] = useState<string>('');

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return { value, onChangeInput };
};
