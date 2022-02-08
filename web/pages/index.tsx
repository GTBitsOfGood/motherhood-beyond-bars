import type { GetStaticProps, NextPage } from "next";
import { User } from "firebase/auth";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  data: string;
}

const Home: NextPage<Props> = ({ data }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const [userAdmin, setUserAdmin] = useState(false);

  async function onChange(user: User | null) {
    if (user) {
      const tokenId = await user.getIdTokenResult();
      setUserAdmin(Boolean(tokenId.claims.admin));
    } else {
      setUserAdmin(false);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-200 p-10">
      {user?.displayName}
      {userAdmin ? <p>Welcome Admin</p> : <p>Insufficient Access</p>}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      data: "Hello, World!",
    },
  };
};

export default Home;
