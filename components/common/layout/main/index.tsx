import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main
      className='flex flex-1 px-40 py-10'
      style={{
        height: "calc(100% - 64px)",
      }}
    >
      {children}
    </main>
  );
}
