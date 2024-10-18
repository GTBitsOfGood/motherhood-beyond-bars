import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserProvider from "@lib/contexts/userContext";
import MobileNavBar from "@components/molecules/MobileNavBar";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640); // sm breakpoint in Tailwind
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
      <div className="flex flex-col sm:flex-row flex-no-wrap h-screen">
        {
          isMobile ? <MobileNavBar isAdmin={isAdmin} items={SideBarItems} /> 
            : 
          <SideBar isAdmin={isAdmin} items={SideBarItems}/>
        }
        <NextNProgress />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
