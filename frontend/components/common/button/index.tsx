import { ComponentPropsWithRef } from "react";

export default function Button({
  children,
  ...rest
}: ComponentPropsWithRef<"button">) {
  return <button {...rest}>{children}</button>;
}
