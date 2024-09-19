import React, { useContext, useState } from "react";
import { loginWithCredentials, loginWithGoogle } from "db/actions/Login";
import { UserContext } from "@lib/contexts/userContext";

import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import HalfScreen from "@components/logos/HalfScreen";
import Banner from "@components/molecules/Banner";

export default function LoginScreen() {
  const { admin: userAdmin } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (userAdmin) {
    return null;
  }

  return (
    <div className="flex absolute bg-white overflow-hidden">
      <div className="h-screen w-screen">
          <div className="flex flex-col w-full h-full sm:flex-row">
            <HalfScreen></HalfScreen>
            <div className="flex flex-col w-full h-[80%] justify-center items-center sm:w-1/2">
              <div className={`flex flex-col w-[87%] h-[92%] sm:items-center ${errorBanner ? "sm:h-[73.5%]" : "sm:h-[55%]"}`}>
                <p className={`text-primary-text text-2xl font-bold font-opensans sm:mb-10 sm:order-1 ${errorBanner ? "mb-1" : "mb-16"}`}>
                  Log In
                </p>
                <div className="sm:w-[55%]">
                  {errorBanner && (
                    <Banner text={errorMsg} onClose={() => setErrorBanner(false)}></Banner>
                  )}
                </div>
                <div className="flex flex-col w-full sm:w-[55%] sm:order-2">
                  <div className={`${emailError ? "mb-1 sm:mb-1" : "mb-6"}`}>
                    <p className="mb-2 sm:mb-1">
                      Email
                    </p>
                    <TextInput errorMsg={emailError} onChange={(event) => {
                      setEmail(event);
                      setEmailError("")
                    }}></TextInput>
                  </div>
                  <div className={`${passwordError ? "mb-1 sm:mb-1" : "mb-2"}`}>
                    <p className="mb-2 sm:mb-1">
                      Password
                    </p>
                    <TextInput inputType="password" errorMsg={passwordError} onChange={(event) => {
                      setPassword(event);
                      setPasswordError("")
                    }}></TextInput>
                  </div>
                  <div className="flex justify-end mb-10 sm:mb-8">
                    <div className="w-auto text-center text-mbb-pink text-sm font-semibold font-opensans">
                      Forgot Password
                    </div>
                  </div>
                  <div className="mb-8 sm:mb-6">
                    <Button text="Log In" onClick={() => {
                      if (email && password) {
                        loginWithCredentials(email, password).then((e) => {
                        if (e.success) {
                          //route to next page
                        } else {
                          setErrorMsg("Email or password is incorrect, please double check the correct email and password for your account.")
                          setErrorBanner(true)
                        }
                      })
                      } else {
                        if (!email) {
                          setEmailError("Please enter a email")
                        }
                        if (!password) {
                          setPasswordError("Please enter a password")
                        }
                      }
                    }}></Button>
                  </div>
                  <div className="mb-16 sm:mb-10">
                    <Button text="Sign in with Google" type="Google" onClick={() => {
                      loginWithGoogle().then((e) => {
                        if (e.success) {
                          //route to next page
                        } else {
                          setErrorMsg("Email or password is incorrect, please double check the correct email and password for your account.")
                          setErrorBanner(true)
                        }
                      })
                      }}></Button>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-light-black text-base font-normal font-opensans leading-tight tracking-tight mr-2">Dont have an account?</div>
                    <button className="text-right text-mbb-pink text-base font-semibold font-opensans underline leading-tight tracking-tight">Sign up now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
