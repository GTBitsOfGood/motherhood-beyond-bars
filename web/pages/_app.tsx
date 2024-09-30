import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserProvider, { UserContext } from "@lib/contexts/userContext";
import MobileNavBar from "@components/molecules/MobileNavBar";
import DesktopNavBar from "@components/molecules/DesktopNavBar";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on component mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (router.asPath.includes('admin')) setIsAdmin(true);
  }, []);


  return (
    <UserProvider>
      {
        isMobile? // use flex-col to put top bar on top
          <div className="flex flex-col flex-no-wrap h-screen">
            <MobileNavBar isAdmin={isAdmin} items={SideBarItems} /> 
            <NextNProgress />
            <Component {...pageProps} />
          </div>
          : 
          // use flex-row to put nav bar on left
          <div className="flex flex-no-wrap h-screen">
            <SideBar isAdmin={isAdmin} items={SideBarItems}/>
            <NextNProgress />
            <Component {...pageProps} />
          </div>
      }
    </UserProvider>
  );
}

export default MyApp;
