import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@components/navBar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavBar />
      <div className="flex flex-no-wrap h-screen">
        <SideBar items={SideBarItems} />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
