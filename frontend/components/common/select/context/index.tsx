import { PropsWithChildren } from "react";

import { SelectContext, SelectContextValue } from "./SelectContext";

interface Props extends PropsWithChildren {
  value: SelectContextValue;
}

export default function SelectContextProvider({ value, children }: Props) {
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}
