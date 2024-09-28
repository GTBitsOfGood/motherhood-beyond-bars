import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserCredential } from "firebase/auth";

import { loginWithGoogle } from "db/actions/Login";
import { createAccount, createCaregiverAccount } from "db/actions/SignUp";

import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import HalfScreen from "@components/logos/HalfScreen";
import BackButton from "@components/atoms/BackButton";
import Banner from "@components/molecules/Banner";

export default function SignUpScreen() {
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

  const [page, setPage] = useState(1);
  const [acc, setAcc] = useState<UserCredential>();
  const [errorBannerMsg, setErrorBannerMsg] = useState("");

  return (
    <div className="flex absolute bg-white">
      <div className="h-screen w-screen">
        <div className="flex flex-col w-full h-full sm:flex-row">
          <HalfScreen
            caregiver={true}
            backButtonFunction={page == 2 ? () => setPage(1) : undefined}
          />
          <div className="flex flex-col w-full h-full justify-center items-center mt-6 sm:mt-0 sm:w-1/2">
            <div className="flex flex-col w-[90%] sm:w-[60%] sm:items-center">
              <div className="hidden sm:flex w-full justify-start sm:mb-8">
                {page === 2 && <BackButton onClick={() => setPage(1)} />}
              </div>
              {errorBannerMsg && (
                <div className="hidden sm:inline mt-0 sm:-mt-4">
                  <Banner
                    text={errorBannerMsg}
                    onClose={() => setErrorBannerMsg("")}
                  />
                </div>
              )}
              <p className="text-primary-text text-2xl font-bold font-opensans mb-4 sm:mb-8">
                Sign Up
              </p>
              {errorBannerMsg && (
                <div className="inline -mt-2 sm:hidden sm:mt-0">
                  <Banner
                    text={errorBannerMsg}
                    onClose={() => setErrorBannerMsg("")}
                  />
                </div>
              )}
              <div className="flex flex-col w-full gap-2 sm:gap-6">
                {page === 1 ? (
                  <TextInput
                    key="email"
                    label="Email"
                    currentValue={email}
                    error={emailError}
                    onChange={(event) => {
                      setEmail(event);
                      setEmailError("");
                    }}
                  />
                ) : (
                  <TextInput
                    key="firstName"
                    label="First Name"
                    currentValue={firstName}
                    error={firstNameError}
                    onChange={(event) => {
                      setFirstName(event);
                      setFirstNameError("");
                    }}
                  />
                )}
                {page === 1 ? (
                  <TextInput
                    key="password"
                    label="Password"
                    currentValue={password}
                    inputType="password"
                    error={passwordError}
                    onChange={(event) => {
                      setPassword(event);
                      setPasswordError("");
                    }}
                  />
                ) : (
                  <div>
                    <TextInput
                      key="lastName"
                      label="Last Name"
                      currentValue={lastName}
                      error={lastNameError}
                      onChange={(event) => {
                        setLastName(event);
                        setLastNameError("");
                      }}
                    />
                  </div>
                )}
                {page === 1 ? (
                  <TextInput
                    key="confirmPassword"
                    label="Confirm Password"
                    currentValue={confirmPassword}
                    inputType="password"
                    error={confirmPasswordError}
                    onChange={(event) => {
                      setConfirmPassword(event);
                      setConfirmPasswordError("");
                    }}
                  />
                ) : (
                  <TextInput
                    key="phoneNumber"
                    label="Phone Number"
                    currentValue={phoneNumber}
                    error={phoneNumberError}
                    onChange={(event) => {
                      setPhoneNumber(event);
                      setPhoneNumberError("");
                    }}
                  />
                )}
                <div>
                  <div className="mb-5 sm:mb-7">
                    <Button
                      text={`${page === 1 ? "Continue" : "Get started"}`}
                      onClick={async () => {
                        // TODO fix backend logic
                        if (page === 1) {
                          if (
                            email &&
                            password &&
                            password === confirmPassword
                          ) {
                            const acc = await createAccount(
                              email,
                              password
                            ).then((e) => {
                              if (e.success) {
                                //route to next page
                                setPage(2);
                                return e.userCredential;
                              } else {
                                alert("error");
                              }
                              setAcc(acc);
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
                              setConfirmPasswordError(
                                "Please enter a password"
                              );
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
                              setPhoneNumberError(
                                "Please enter a phone number"
                              );
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
                  {page === 1 && (
                    <div className="mb-6 sm:mb-2">
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
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-center mb-8 sm:mb-0">
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
