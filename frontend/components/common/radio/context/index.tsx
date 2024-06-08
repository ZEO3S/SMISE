import { ChangeEventHandler, PropsWithChildren, useState } from "react";

import { RadioContext, RadioContextValue } from "./RadioContext";

interface Props extends PropsWithChildren {
  value?: RadioContextValue;
}

export default function RadioContextProvider({ children }: Props) {
  const [selectedValue, setSelectedValue] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioContext.Provider
      value={{
        selectedValue,
        onChange,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
}
