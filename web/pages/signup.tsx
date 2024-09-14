import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { loginWithCredentials, loginWithGoogle } from "db/actions/Login";

import { AuthFormValues } from "@lib/types/common";
import { UserContext } from "@lib/contexts/userContext";

import ErrorAlert from "@components/errorAlert";
import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";

import HalfScreen from "@components/logos/HalfScreen";
import { createAccount, createCaregiverAccount } from "db/actions/SignUp";
import { Account } from "@lib/types/users";

export default function SignUpScreen() {
  const { admin: userAdmin } = useContext(UserContext);
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [page, setPage] = useState(1);

  if (userAdmin) {
    return null;
  }

  return (
    <div className="flex absolute bg-white overflow-hidden">
      <div className="h-screen w-screen">
          <div className="flex flex-col w-full h-full sm:flex-row">
            <HalfScreen></HalfScreen>
            <div className="flex flex-col w-full h-[80%] justify-center items-center sm:w-1/2">
              <div className="flex flex-col w-[87%] h-[92%] sm:items-center sm:h-[65%]">
                <p className="text-black text-2xl font-bold font-opensans h-[5%] mb-[5%]">
                  Sign Up
                </p>
                <div className="flex flex-col w-full sm:w-[55%]">
                  <div className={`${emailError ? "mb-[8.9%] sm:mb-[4.5%]" : "mb-[15%] sm:mb-[10%]"}`}>
                    <p className="mb-[2%] sm:mb-[1%]">
                      {`${page === 1 ? "Email" : "First Name"}`}
                    </p>
                    <TextInput errorMsg={page === 1 ? emailError : firstNameError} onChange={(event) => {
                      if (page === 1) {
                        setEmail(event)
                        setEmailError("")
                      } else {
                        setFirstName(event);
                        setFirstNameError("");
                      }
                    }}></TextInput>
                  </div>
                  <div className={`${passwordError ? "mb-[8.9%] sm:mb-[4.5%]" : "mb-[15%] sm:mb-[10%]"}`}>
                    <p className="mb-[2%] sm:mb-[1%]">
                      {`${page === 1 ? "New Password" : "Last Name"}`}
                    </p>
                    <TextInput inputType={`${page === 1 ? "password" : ""}`} errorMsg={page === 1 ? passwordError : lastNameError} onChange={(event) => {
                      if (page === 1) {
                        setPassword(event);
                        setPasswordError("");
                      } else {
                        setLastName(event);
                        setLastNameError("");
                      }
                    }}></TextInput>
                  </div>
                  <div className={`${confirmPasswordError ? "mb-[8.9%] sm:mb-[4.5%]" : "mb-[15%] sm:mb-[10%]"}`}>
                    <p className="mb-[2%] sm:mb-[1%]">
                      {`${page === 1 ? "Confirm Password" : "Phone Number"}`}
                    </p>
                    <TextInput inputType={`${page === 1 ? "password" : ""}`} errorMsg={page === 1 ? confirmPasswordError : phoneNumberError} onChange={(event) => {
                      if (page === 1) {
                        setConfirmPassword(event);
                        setConfirmPasswordError("")
                      } else {
                        setPhoneNumber(event);
                        setPhoneNumberError("");
                      }
                    }}></TextInput>
                  </div>
                  <div className="mb-[6%] sm:mb-[5%]">
                    <Button text={`${page === 1 ? "Continue" : "Get started"}`} onClick={() => {
                      let acc = null;
                      if (page === 1) {
                        if (email && password && password === confirmPassword) {
                          acc = createAccount(email, password).then((e) => {
                          if (e.success) {
                            //route to next page
                            setPage(2);
                          } else {
                            alert("error")
                          }
                        })
                        } else {
                          if (!email) {
                            setEmailError("Please enter a email")
                          }
                          if (!password) {
                            setPasswordError("Please enter a password")
                          } else if (password.length < 10) {
                            setPasswordError("Password must contain at least 10 characters")
                          }
                          if (!confirmPassword) {
                            setConfirmPasswordError("Please enter a password")
                          } else if (password !== confirmPassword) {
                            setConfirmPasswordError("Passwords must match")
                          }
                        }
                      } else {
                        if (firstName && lastName && phoneNumber && /[^0-9]/.test(phoneNumber)) {
                          createCaregiverAccount(acc, firstName, lastName, phoneNumber).then((e) => {
                          // if (e.success) {
                          //   //route to next page
                          //   setPage(2);
                          // } else {
                          //   alert("error")
                          // }
                        })
                        } else {
                          if (!firstName) {
                            setFirstNameError("Please enter a first name")
                          }
                          if (!lastName) {
                            setLastNameError("Please enter a last name")
                          }
                          if (!phoneNumber) {
                            setPhoneNumberError("Please enter a phone number")
                          } else if (/[^0-9]/.test(phoneNumber)) {
                            setPhoneNumberError("Phone number should only contain numbers")
                          }
                        }
                      }
                    }}></Button>
                  </div>
                  <div className="mb-[10%] sm:mb-[5%]">
                    {page === 1 && (
                      <Button text="Sign up with Google" type="Google" onClick={() => {
                        loginWithGoogle().then((e) => {
                          if (e.success) {
                            //route to next page
                          } else {
                            //error
                          }
                        })
                        }}></Button>
                      )}
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-[#191919] text-base font-normal font-opensans leading-tight tracking-tight mr-[3%]">Already have an account?</div>
                    <button className="text-right text-[#b14378] text-base font-semibold font-opensans leading-tight tracking-tight">Log In</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
