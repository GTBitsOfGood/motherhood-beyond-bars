import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import SideBar from "@components/SideBar";
import SideBarItems from "@lib/SideBarItems";
import { useRouter } from "next/router";
import UserProvider, { UserContext } from "@lib/contexts/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <div>
        <div className="flex flex-no-wrap h-screen">
          {!router.asPath.includes("/book") && <SideBar items={SideBarItems} />}
          <NextNProgress />
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
