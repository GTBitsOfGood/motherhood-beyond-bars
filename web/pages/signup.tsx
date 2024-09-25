import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import { loginWithGoogle } from "db/actions/Login";
import { createAccount, createCaregiverAccount } from "db/actions/SignUp";
import { UserContext } from "@lib/contexts/userContext";

import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import HalfScreen from "@components/logos/HalfScreen";
import BackButton from "@components/atoms/BackButton";

export default function SignUpScreen() {
  const { admin: userAdmin } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [page, setPage] = useState(2);

  if (userAdmin) {
    return null;
  }

  return (
    <div className="flex absolute bg-white">
      <div className="h-screen w-screen">
        <div className="flex flex-col w-full h-full sm:flex-row">
          <HalfScreen></HalfScreen>
          <div className="flex flex-col w-full h-full justify-center items-center sm:w-1/2">
            <div className="flex flex-col w-[90%] sm:w-[60%] sm:items-center">
              {page === 2 ? (
                <div className="flex w-full justify-start mb-2">
                  <BackButton onClick={() => setPage(1)} />
                </div>
              ) : null}
              <p className="text-primary-text text-2xl font-bold font-opensans mb-5">
                Sign Up
              </p>
              <div className="flex flex-col w-full">
                <div
                  className={`${emailError || firstNameError ? "mb-5 sm:mb-3" : "mb-10 sm:mb-8"}`}
                >
                  {page === 1 ? (
                    <div>
                      <p className="mb-2 sm:mb-1">Email</p>
                      <TextInput
                        key="email"
                        currentValue={email}
                        errorMsg={emailError}
                        onChange={(event) => {
                          setEmail(event);
                          setEmailError("");
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 sm:mb-1">First Name</p>
                      <TextInput
                        key="firstName"
                        currentValue={firstName}
                        errorMsg={firstNameError}
                        onChange={(event) => {
                          setFirstName(event);
                          setFirstNameError("");
                        }}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`${passwordError || lastNameError ? "mb-5 sm:mb-3" : "mb-10 sm:mb-8"}`}
                >
                  {page === 1 ? (
                    <div>
                      <p className="mb-2 sm:mb-1">Password</p>
                      <TextInput
                        key="password"
                        currentValue={password}
                        inputType="password"
                        errorMsg={passwordError}
                        onChange={(event) => {
                          setPassword(event);
                          setPasswordError("");
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 sm:mb-1">Last Name</p>
                      <TextInput
                        key="lastName"
                        currentValue={lastName}
                        errorMsg={lastNameError}
                        onChange={(event) => {
                          setLastName(event);
                          setLastNameError("");
                        }}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`${confirmPasswordError || phoneNumberError ? "mb-5 sm:mb-3" : "mb-10 sm:mb-8"}`}
                >
                  {page === 1 ? (
                    <div>
                      <p className="mb-2 sm:mb-1">Confirm Password</p>
                      <TextInput
                        key="confirmPassword"
                        currentValue={confirmPassword}
                        inputType="password"
                        errorMsg={confirmPasswordError}
                        onChange={(event) => {
                          setConfirmPassword(event);
                          setConfirmPasswordError("");
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 sm:mb-1">Phone Number</p>
                      <TextInput
                        key="phoneNumber"
                        currentValue={phoneNumber}
                        errorMsg={phoneNumberError}
                        onChange={(event) => {
                          setPhoneNumber(event);
                          setPhoneNumberError("");
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-5 sm:mb-7">
                  <Button
                    text={`${page === 1 ? "Continue" : "Get started"}`}
                    onClick={() => {
                      let acc = null;
                      if (page === 1) {
                        if (email && password && password === confirmPassword) {
                          acc = createAccount(email, password).then((e) => {
                            if (e.success) {
                              setPage(2);
                            } else {
                              alert("error");
                            }
                          });
                        } else {
                          if (!email) {
                            setEmailError("Please enter a email");
                          }
                          if (!password) {
                            setPasswordError("Please enter a password");
                          } else if (password.length < 10) {
                            setPasswordError(
                              "Password must contain at least 10 characters"
                            );
                          }
                          if (!confirmPassword) {
                            setConfirmPasswordError("Please enter a password");
                          } else if (password !== confirmPassword) {
                            setConfirmPasswordError("Passwords must match");
                          }
                        }
                      } else {
                        if (
                          firstName &&
                          lastName &&
                          phoneNumber &&
                          /[^0-9]/.test(phoneNumber)
                        ) {
                          createCaregiverAccount(
                            acc,
                            firstName,
                            lastName,
                            phoneNumber
                          ).then((e) => {
                            if (e.success) {
                              router.push("/caregiver/onboarding");
                            } else {
                              // TODO handle error
                            }
                          });
                        } else {
                          if (!firstName) {
                            setFirstNameError("Please enter a first name");
                          }
                          if (!lastName) {
                            setLastNameError("Please enter a last name");
                          }
                          if (!phoneNumber) {
                            setPhoneNumberError("Please enter a phone number");
                          } else if (/[^0-9]/.test(phoneNumber)) {
                            setPhoneNumberError(
                              "Phone number should only contain numbers"
                            );
                          }
                        }
                      }
                    }}
                  ></Button>
                </div>
                <div className="mb-8">
                  {page === 1 && (
                    <Button
                      text="Sign up with Google"
                      type="Google"
                      onClick={() => {
                        loginWithGoogle().then((e) => {
                          if (e.success) {
                            router.push("/caregiver/onboarding");
                          } else {
                            //TODO handle error
                          }
                        });
                      }}
                    ></Button>
                  )}
                </div>
                <div className="flex flex-row justify-center">
                  <div className="text-light-black text-base font-normal font-opensans leading-tight tracking-tight mr-2">
                    Already have an account?&nbsp;
                    <button
                      className="text-mbb-pink font-semibold underline"
                      onClick={() => router.push("/login")}
                    >
                      Log In
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
