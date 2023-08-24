import { ReactNode } from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import ActiveResource from "./ActiveResource";
import { WithAPIProps } from "@/pages/withAPI_4";

export interface LayoutProps {
  children: ReactNode,
}

function Layout({
  children,
  setIsResourceActive = undefined,
  isResourceActive = undefined, 
}: LayoutProps & WithAPIProps) {
  return (
    <>
      <NavBar />
      <ActiveResource isResourceActive={isResourceActive} setIsResourceActive={setIsResourceActive} />
        {children}
      <Footer />
    </>
  ) 
}

export default Layout;