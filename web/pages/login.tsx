import React, { useContext, useState } from "react";

import { loginWithCredentials, loginWithGoogle } from "db/actions/Login";

import { AuthFormValues } from "@lib/types/common";
import { UserContext } from "@lib/contexts/userContext";

import ErrorAlert from "@components/errorAlert";
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
  const [errorBanner, setErrorBanner] = useState('');
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
                <p className={`text-black text-2xl font-bold font-opensans h-[5%] sm:mb-[8%] sm:order-1 ${errorBanner ? "mb-[3%] sm:mb-[7%]" : "mb-[20%]"}`}>
                  Log In
                </p>
                <div className="sm:w-[55%]">
                  {errorBanner && (
                    <Banner text={errorMsg}></Banner>
                  )}
                </div>
                <div className="flex flex-col w-full sm:w-[55%] sm:order-2">
                  <div className={`${emailError ? "mb-[1.2%] sm:mb-[1.6%]" : "mb-[7%]"}`}>
                    <p className="mb-[2%] sm:mb-[1%]">
                      Email
                    </p>
                    <TextInput errorMsg={emailError} onChange={(event) => {
                      setEmail(event);
                      setEmailError("")
                    }}></TextInput>
                  </div>
                  <div className={`${passwordError ? "mb-[1.2%] sm:mb-[1.6%]" : "mb-[2%]"}`}>
                    <p className="mb-[2%] sm:mb-[1%]">
                      Password
                    </p>
                    <TextInput inputType="password" errorMsg={passwordError} onChange={(event) => {
                      setPassword(event);
                      setPasswordError("")
                    }}></TextInput>
                  </div>
                  <div className="flex justify-end mb-[12%] sm:mb-[8%]">
                    <div className="w-auto text-center text-mbb-pink text-sm font-semibold font-opensans">
                      Forgot Password
                    </div>
                  </div>
                  <div className="mb-[10%] sm:mb-[5%]">
                    <Button text="Log In" onClick={() => {
                      if (email && password) {
                        loginWithCredentials(email, password).then((e) => {
                        if (e.success) {
                          //route to next page
                        } else {
                          //error
                        }
                      })
                      } else {
                        if (!email) {
                          setEmailError("Please enter a email")
                          setErrorBanner("true")
                          setErrorMsg("Email or password is incorrect, please double check the correct email and password for your account.")
                        }
                        if (!password) {
                          setPasswordError("Please enter a password")
                          setErrorBanner("true")
                          setErrorMsg("Email or password is incorrect, please double check the correct email and password for your account.")
                        }
                      }
                    }}></Button>
                  </div>
                  <div className="mb-[20%] sm:mb-[10%]">
                    <Button text="Sign in with Google" type="Google" onClick={() => {
                      loginWithGoogle().then((e) => {
                        if (e.success) {
                          //route to next page
                        } else {
                          //error
                        }
                      })
                      }}></Button>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-[#191919] text-base font-normal font-opensans leading-tight tracking-tight mr-[3%]">Dont have an account?</div>
                    <button className="text-right text-[#b14378] text-base font-semibold font-opensans underline leading-tight tracking-tight">Sign up now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    //             {/* {userAdmin === false && (
    //               <div className="flex flex-row items-center justify-center m-10">
    //                 <ErrorAlert
    //                   title="Error: Account Not Authorized"
    //                   message={
    //                     <p>
    //                       Your account has not been granted access. This site is
    //                       for Motherhood Beyond Bars admin only. Please contact{" "}
    //                       <a
    //                         href="mailto:info@motherhoodbeyond.org"
    //                         className="text-blue-700"
    //                       >
    //                         info@motherhoodbeyond.org
    //                       </a>{" "}
    //                       if you require assistance.
    //                     </p>
    //                   }
    //                 />
    //               </div>
    //             )} */}
  );
}
