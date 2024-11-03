import { useRouter } from "next/router";
import React, { useState } from "react";

import { loginWithCredentials, loginWithGoogle } from "db/actions/Login";

import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import HalfScreen from "@components/logos/HalfScreen";
import Banner from "@components/molecules/Banner";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorBannerMsg, setErrorBannerMsg] = useState("");

  return (
    <div className="flex absolute bg-white">
      <div className="h-screen w-screen">
        <div className="flex flex-col w-full h-full sm:flex-row">
          <HalfScreen></HalfScreen>
          <div className="flex flex-col w-full h-full justify-center items-center mt-8 sm:mt-0 sm:w-1/2">
            <div className={`flex flex-col w-[90%] sm:w-[60%] sm:items-center`}>
              {errorBannerMsg && (
                <div className="hidden sm:inline">
                  <Banner
                    text={errorBannerMsg}
                    onClose={() => setErrorBannerMsg("")}
                  />
                </div>
              )}
              <p
                className={`text-primary-text text-2xl font-bold font-opensans mb-10 sm:order-1`}
              >
                Log In
              </p>
              {errorBannerMsg && (
                <div className="inline -mt-8 sm:hidden sm:mt-0">
                  <Banner
                    text={errorBannerMsg}
                    onClose={() => setErrorBannerMsg("")}
                  />
                </div>
              )}
              <div className="flex flex-col w-full sm:order-2">
                <div className="sm:mb-6">
                  <TextInput
                    label="Email"
                    error={emailError}
                    onChange={(event) => {
                      setEmail(event);
                      setEmailError("");
                    }}
                  ></TextInput>
                </div>
                <TextInput
                  label="Password"
                  inputType="password"
                  error={passwordError}
                  onChange={(event) => {
                    setPassword(event);
                    setPasswordError("");
                  }}
                ></TextInput>
                <div className="flex justify-end mb-9 sm:mb-10">
                  <button
                    className="w-auto text-center text-mbb-pink text-sm font-semibold font-opensans"
                    onClick={() => {
                      router.push("/forgotPassword");
                    }}
                  >
                    Forgot Password
                  </button>
                </div>
                <div className="mb-5 sm:mb-7">
                  <Button
                    text="Log In"
                    onClick={() => {
                      if (email && password) {
                        loginWithCredentials(email, password).then((e) => {
                          if (e.success) {
                            // Push to a generic route, let middleware handle role-based redirection
                            router.push("/home");
                          } else {
                            setErrorBannerMsg("error" in e ? e.error : "");
                          }
                        });
                      } else {
                        if (!email) {
                          setEmailError("Please enter email");
                        }
                        if (!password) {
                          setPasswordError("Please enter password");
                        }
                      }
                    }}
                  />
                </div>
                <div className="mb-10">
                  <Button
                    text="Sign in with Google"
                    type="Google"
                    onClick={() => {
                      loginWithGoogle().then((e) => {
                        if (e.success) {
                          if ("isNewUser" in e && e.isNewUser) {
                            // Redirect new users to the onboarding page
                            router.push("/onboarding");
                          } else {
                            // Push to a generic route, let middleware handle role-based redirection
                            router.push("/home");
                          }
                        } else {
                          setErrorBannerMsg("error" in e ? e.error : "");
                        }
                      });
                    }}
                  ></Button>
                </div>
                <div className="flex flex-row justify-center mb-8 sm:mb-0">
                  <div className="text-light-black text-base font-normal font-opensans leading-tight tracking-tight mr-2">
                    Don&apos;t have an account?&nbsp;
                    <button
                      className="text-mbb-pink text-base font-semibold underline"
                      onClick={() => router.push("/signup")}
                    >
                      Sign up now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
