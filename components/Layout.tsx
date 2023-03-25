import { ReactNode } from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
        {children}
      <Footer />
    </>
  )
}

export default Layout;