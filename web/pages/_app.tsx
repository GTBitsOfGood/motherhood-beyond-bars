import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@components/navBar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div>
      {/* <NavBar /> */}
      <div className="flex flex-no-wrap h-screen">
        {!router.asPath.includes("/book") && <SideBar items={SideBarItems} />}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
