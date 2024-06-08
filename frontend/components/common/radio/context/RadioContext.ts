import { ChangeEventHandler, createContext } from "react";

export interface RadioContextValue {
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const RadioContext = createContext<RadioContextValue | null>(null);
