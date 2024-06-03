import {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

interface RadioContextValue {
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const RadioContext = createContext<RadioContextValue | null>(null);

export default function RadioContextProvider({ children }: PropsWithChildren) {
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
