import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { useClickOutsideHandler } from "@/hooks/useClickOutsideHandler";

interface Props extends PropsWithChildren {
  openState: boolean;
  onClose: () => void;
}

export default function Modal({ openState, children, onClose }: Props) {
  const divRef = useClickOutsideHandler<HTMLDivElement>(onClose);

  if (!openState) return null;

  return createPortal(
    <div className='flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-default-color bg-opacity-50 z-20'>
      <div ref={divRef}>{children}</div>
    </div>,
    document.body
  );
}
