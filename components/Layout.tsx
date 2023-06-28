import { ReactNode } from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import ActiveResource from "./ActiveResource";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <ActiveResource />
        {children}
      <Footer />
    </>
  )
}

export default Layout;