import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "@components/index";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  data: string;
}

const login = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};
const logout = () => {
  signOut(auth);
};

const Home: NextPage<Props> = ({ data }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="bg-red-200 p-10">
      <Card text={data} />
      <button
        onClick={() => {
          if (user) logout();
          else login();
        }}
      >
        {user ? "Log out" : "Sign in with Google"}
      </button>
      {user?.displayName}
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
