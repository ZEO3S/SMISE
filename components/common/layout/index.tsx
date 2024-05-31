import { PropsWithChildren } from "react";

import Header from "./header";
import Main from "./main";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
