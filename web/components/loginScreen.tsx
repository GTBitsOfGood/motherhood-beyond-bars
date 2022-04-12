import { UserContext } from "@lib/contexts/userContext";
import { auth } from "@lib/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillGoogleCircle } from "react-icons/ai";

import ButtonWithIcon from "./buttonWithIcon";
import ErrorAlert from "./errorAlert";
import MBBLogo from "./mbbLogo";

type AuthFormValues = {
  email: string;
  password: string;
};

function LoginScreen() {
  const { admin: userAdmin } = useContext(UserContext);
  const { register, handleSubmit } = useForm<AuthFormValues>();

  const loginWithCredentials: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error(error);
      alert("Invalid credentials!");
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <div className="flex absolute bg-white overflow-hidden">
      <div className="h-screen w-screen">
        <div className="flex h-screen">
          <div className="w-1/2 place-items-center gradient-bg">
            <div className="flex flex-wrap flex-col place-content-center h-full">
              <div className="self-center">
                <MBBLogo />
              </div>
              <br />
              <div className="text-white text-4xl uppercase text-center font-opensans font-bold">
                Motherhood <br /> Beyond Bars
              </div>
              <br />
              <div className="text-white text-2xl text-center font-opensans">
                Admin Portal
              </div>
              <br />
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex h-screen">
              <div className="m-auto w-full">
                {console.log(userAdmin)}
                {userAdmin === false && (
                  <div className="flex flex-row items-center justify-center m-10">
                    <ErrorAlert
                      title="Error: Account Not Authorized"
                      message={
                        <p>
                          Your account has not been granted access. This site is
                          for Motherhood Beyond Bars admin only. Please contact{" "}
                          <a
                            href="mailto:info@motherhoodbeyond.org"
                            className="text-blue-700"
                          >
                            info@motherhoodbeyond.org
                          </a>{" "}
                          if you require assistance.
                        </p>
                      }
                    />
                  </div>
                )}
                <div className="text-black font-opensans text-2xl font-bold text-center">
                  Log In
                </div>
                <br />
                <br />
                <form onSubmit={handleSubmit(loginWithCredentials)}>
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <div className="text-black font-opensans text-base">
                        Username or Email
                      </div>
                      <input
                        {...register("email", { required: true })}
                        className="text-black font-opensans text-base w-80 bg-gray-100 border-1 border-gray-300 p-2"
                        type="text"
                      />
                    </div>
                    <br />
                    <br />
                    <div>
                      <div className="text-black font-opensans text-base">
                        Password
                      </div>
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        className="block text-black font-opensans text-base w-80 bg-gray-100 border-1 border-gray-300 p-2"
                        type="password"
                      />
                      <div className="block text-sm float-right text-blue-600 cursor-pointer p-2">
                        Forgot Password
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="text-blue-600 w-80 p-2 border-2 border-blue-600 my-4"
                    >
                      Log In
                    </button>
                    <ButtonWithIcon
                      icon={<AiFillGoogleCircle />}
                      text="Log In with Google"
                      onClick={loginWithGoogle}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
