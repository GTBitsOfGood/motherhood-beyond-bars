import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "@lib/firebase";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

type AuthFormValues = {
    email: string;
    password: string;
};

function NavBar() {
    const { register, handleSubmit } = useForm<AuthFormValues>();
    const [user, loading, error] = useAuthState(auth);

    const loginWithCredentials: SubmitHandler<AuthFormValues> = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password);
    };

    const loginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider());
    };

    const logout = () => {
        signOut(auth);
    };

    return (
        <div className="p-5">
            {!user ? (
                <>
                    <form onSubmit={handleSubmit(loginWithCredentials)}>
                        <input
                            {...(register("email"), { required: true })}
                            placeholder="Email Address"
                        />
                        <input
                            {...(register("password"),
                            { required: true, type: "password" })}
                            placeholder="Password"
                        />
                        <input type="submit" />
                    </form>
                    <button onClick={loginWithGoogle}>
                        Sign in with Google
                    </button>
                </>
            ) : (
                <button onClick={logout}>Sign out</button>
            )}
        </div>
    );
}

export default NavBar;
