import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "@components/index";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User,
} from "firebase/auth";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "@components/navBar";
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
            setUserAdmin(!!tokenId.claims.admin);
        } else {
            setUserAdmin(false);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(onChange);
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-red-200 p-10">
            <Card text={data} />
            <NavBar />
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
