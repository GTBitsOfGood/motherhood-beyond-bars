import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Cookies from "js-cookie";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

import SideBar from "@components/SideBar";
import MobileNavBar from "@components/molecules/MobileNavBar";

import UserProvider from "@lib/contexts/userContext";
import SideBarItems from "@lib/SideBarItems";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640); // sm breakpoint in Tailwind
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check on component mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (router.asPath.includes("admin")) setIsAdmin(true);
  }, [router.asPath]);

  useEffect(() => {
    if (
      router.asPath.includes("admin") ||
      router.asPath.includes("/caregiver/")
    ) {
      const auth = getAuth();

      // Refresh auth token 10 mins before token expires (aka with 50 mins left)
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setInterval(
            async () => {
              const newToken = await user.getIdToken(true);
              Cookies.set("authToken", newToken, {
                path: "/",
                secure: true,
                sameSite: "Strict",
              });
            },
            50 * 60 * 1000
          );
        }
      });
    }
  }, [router.asPath]);

  const hideNavBar =
    router.asPath.includes("/login") ||
    router.asPath.includes("/signup") ||
    router.asPath.includes("/admin/book") ||
    router.asPath.includes("/caregiver/onboarding");

  return (
    <UserProvider>
      <div className="flex flex-col sm:flex-row flex-no-wrap h-screen">
        {!hideNavBar &&
          (isMobile ? (
            <MobileNavBar isAdmin={isAdmin} items={SideBarItems}/>
          ) : (
            <SideBar isAdmin={isAdmin} items={SideBarItems}/>
          ))}
        <NextNProgress />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
