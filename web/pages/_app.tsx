import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@components/navBar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";
import { useRouter } from "next/router";
import UserProvider, { UserContext } from "@lib/contexts/userContext";
import { useContext } from "react";
import LoginScreen from "@components/loginScreen";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <div>
        {/* <NavBar /> */}
        <div className="flex flex-no-wrap h-screen">
          {!router.asPath.includes("/book") && <SideBar items={SideBarItems} />}
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
