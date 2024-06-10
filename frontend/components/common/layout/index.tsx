import { PropsWithChildren } from "react";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col flex-1'>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
