import React from "react";
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
  // TODO: loading states with loading, error
  const [user] = useAuthState(auth);

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
            <div className="flex flex-col gap-3">
              <input
                {...(register("email"), { required: true })}
                placeholder="Email Address"
                className="p-3 rounded-lg"
              />
              <input
                {...(register("password"),
                { required: true, type: "password" })}
                placeholder="Password"
                className="p-3 rounded-lg"
              />
              <input
                className="w-full text-center bg-gray-800 p-4 mb-3 rounded-lg"
                type="submit"
              />
            </div>
          </form>
          <button
            className="w-full text-center bg-gray-800 p-4 rounded-lg"
            onClick={loginWithGoogle}
          >
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
