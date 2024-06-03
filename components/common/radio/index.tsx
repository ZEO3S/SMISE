import { ComponentPropsWithoutRef } from "react";

import Option from "./option";
import RadioContextProvider from "./context";

export default function Radio({ children }: ComponentPropsWithoutRef<"input">) {
  return (
    <fieldset>
      <RadioContextProvider>
        <legend>{children}</legend>
      </RadioContextProvider>
    </fieldset>
  );
}

Radio.Option = Option;
