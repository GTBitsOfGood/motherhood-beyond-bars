import React, { useContext } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";

import { loginWithCredentials, loginWithGoogle } from "db/actions/Login";

import { AuthFormValues } from "@lib/types/common";
import { UserContext } from "@lib/contexts/userContext";

import ErrorAlert from "@components/errorAlert";
import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";

export default function LoginScreen() {
  const { admin: userAdmin } = useContext(UserContext);
  const { register, handleSubmit } = useForm<AuthFormValues>();

  if (userAdmin) {
    return null;
  }

  return (
    <div className="flex absolute bg-white overflow-hidden">
      <div className="h-screen w-screen">
        <div className="flex h-screen">
          <div className="w-1/2 place-items-center gradient-bg">
            <div className="flex flex-wrap flex-col place-content-center h-full">
              {/* <div className="self-center">
                <MBBLogo />
              </div> */}
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
              <div className="m-auto w-2/3">
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
                <div className="font-opensans text-2xl font-bold text-center mb-8">
                  Log In
                </div>
                <form onSubmit={handleSubmit(loginWithCredentials)}>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-full">
                      <div className="font-opensans text-base">
                        Username or Email
                      </div>
                      <TextInput
                        formValue={{ ...register("email", { required: true }) }}
                      />
                    </div>
                    <br />
                    <br />
                    <div>
                      <div className="font-opensans text-base">Password</div>
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        className="block font-opensans text-base w-80 bg-gray-100 border-1 border-gray-300 p-2"
                        type="password"
                      />
                    </div>
                    <br />
                    <Button text="Log In" submit={true} />
                    <Button
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
