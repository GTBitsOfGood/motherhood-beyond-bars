import SideBar from '@components/SideBar';
import UserProvider, { UserContext } from '@lib/contexts/userContext';
import SideBarItems from '@lib/SideBarItems';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);
  return (
    <UserProvider>
      <div>
        <div className='flex flex-no-wrap h-screen'>
          {!router.asPath.includes('/book') && <SideBar items={SideBarItems} />}
          <NextNProgress />
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
