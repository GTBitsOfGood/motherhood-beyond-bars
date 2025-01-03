import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserCredential } from "firebase/auth";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";

import { loginWithGoogle } from "db/actions/Login";
import {
  checkAdminCreatedAccount,
  createAccount,
  createCaregiverAccount,
  isUniqueEmail,
} from "db/actions/SignUp";

import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";
import HalfScreen from "@components/logos/HalfScreen";
import BackButton from "@components/atoms/BackButton";
import Banner from "@components/molecules/Banner";
import { useForm } from "react-hook-form";
import { validatePassword } from "@lib/utils/passwordCreation";

const validateNotEmpty = (name: string) => (v: unknown) =>
  !v ? `${name} cannot be empty.` : undefined;

const validatePass = (pass?: string, confirm?: string) => {
  return !pass
    ? "Password cannot be empty."
    : validatePassword({ newPassword: pass, confirmPassword: confirm });
};

const EMAIL_RE = /^[\w.-]+@(?:[\w-]+\.)+[\w-]{2,4}$/;
const validateEmail = (v?: string) =>
  !v
    ? "Email cannot be empty."
    : !EMAIL_RE.test(v)
      ? "Email must be valid."
      : undefined;

// Allows for country code, parens around area code, separation by '-' and ' ' characters
const PHONE_RE =
  /^(?:\+[0-9] ?)?(?:\([0-9]{3}\)|[0-9]{3})(?:-| )?[0-9]{3}(?:-| )?[0-9]{4}$/;
const validatePhone = (v?: string) => {
  return !v
    ? "Phone number cannot be empty."
    : !PHONE_RE.test(v)
      ? "Invalid phone number. Only use numbers."
      : undefined;
};

export default function SignUpScreen() {
  const router = useRouter();

  const { register, formState, trigger, getValues } = useForm<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    phoneNumber: string;
  }>();

  const [page, setPage] = useState(1);
  const [acc, setAcc] = useState<UserCredential>();
  const [doc, setDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
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
                  <Banner text={errorBannerMsg} />
                </div>
              )}
              <p className="text-primary-text text-2xl font-bold font-opensans mb-4 sm:mb-8">
                Sign Up
              </p>
              {errorBannerMsg && (
                <div className="inline -mt-2 sm:hidden sm:mt-0">
                  <Banner text={errorBannerMsg} />
                </div>
              )}
              <div className="flex flex-col w-full gap-2 sm:gap-6">
                {page === 1 ? (
                  <TextInput
                    key="email"
                    label="Email"
                    formValue={register("email", {
                      validate: validateEmail,
                    })}
                    error={formState.errors.email?.message}
                    required={true}
                  />
                ) : (
                  <TextInput
                    key="firstName"
                    label="First Name"
                    formValue={register("firstName", {
                      validate: validateNotEmpty("First name"),
                    })}
                    error={formState.errors.firstName?.message}
                    required={true}
                  />
                )}
                {page === 1 ? (
                  <TextInput
                    key="password"
                    label="Password"
                    inputType="password"
                    formValue={register("password", {
                      validate: (pass, { confirmPassword }) =>
                        validatePass(pass, confirmPassword),
                    })}
                    error={formState.errors.password?.message}
                    required={true}
                  />
                ) : (
                  <div>
                    <TextInput
                      key="lastName"
                      label="Last Name"
                      formValue={register("lastName", {
                        validate: validateNotEmpty("Last name"),
                      })}
                      error={formState.errors.lastName?.message}
                      required={true}
                    />
                  </div>
                )}
                {page === 1 ? (
                  <TextInput
                    key="confirmPassword"
                    label="Confirm Password"
                    inputType="password"
                    formValue={register("confirmPassword", {
                      validate: validateNotEmpty("Confirm password"),
                    })}
                    error={formState.errors.confirmPassword?.message}
                    required={true}
                  />
                ) : (
                  <TextInput
                    key="phoneNumber"
                    label="Phone Number"
                    formValue={register("phoneNumber", {
                      validate: validatePhone,
                    })}
                    error={formState.errors.phoneNumber?.message}
                    required={true}
                  />
                )}
                <div>
                  <div className="mb-5 sm:mb-7">
                    <Button
                      text={`${page === 1 ? "Continue" : "Get started"}`}
                      onClick={async () => {
                        setErrorBannerMsg("");

                        if (page === 1) {
                          const isValid = await trigger(
                            ["email", "password", "confirmPassword"],
                            {
                              shouldFocus: true,
                            }
                          );
                          if (!isValid) return;

                          const { email } = getValues();
                          try {
                            const results = await isUniqueEmail(email);
                            if (!results.isUnique && !results.isAuthNull) {
                              // Account exists and has been used
                              setErrorBannerMsg(
                                "Account already exists. Please log in instead."
                              );
                            } else if (
                              !results.isUnique &&
                              results.isAuthNull
                            ) {
                              // Account created by admin and user signing in for first time
                              setDoc(results.caregiverDoc);
                              setPage(2);
                            } else {
                              // Account is fully new
                              setPage(2);
                            }
                          } catch (err) {
                            console.error(err);
                            setErrorBannerMsg(
                              "Something went wrong, please try again."
                            );
                          }
                        } else {
                          const isValid = await trigger(
                            ["firstName", "lastName", "phoneNumber"],
                            {
                              shouldFocus: true,
                            }
                          );

                          if (!isValid) return;

                          const {
                            email,
                            password,
                            firstName,
                            lastName,
                            phoneNumber,
                          } = getValues();

                          try {
                            let adminCreated;

                            if (doc) {
                              adminCreated = await checkAdminCreatedAccount(
                                firstName,
                                lastName,
                                phoneNumber,
                                doc
                              );

                              if (!adminCreated.success) {
                                setErrorBannerMsg(adminCreated.error);
                                return;
                              }
                            }

                            const accountResult = await createAccount(
                              email,
                              password
                            );
                            if (
                              accountResult.success &&
                              "userCredential" in accountResult
                            ) {
                              setAcc(accountResult.userCredential);
                              const caregiverResult =
                                await createCaregiverAccount(
                                  accountResult.userCredential,
                                  firstName,
                                  lastName,
                                  phoneNumber,
                                  adminCreated
                                    ? adminCreated.matchedCaregiver
                                    : null
                                );
                              if (caregiverResult.success) {
                                router.push("/caregiver/onboarding");
                              } else {
                                caregiverResult?.error &&
                                  setErrorBannerMsg(caregiverResult.error);
                              }
                            }
                          } catch (err) {
                            console.error(err);
                            setErrorBannerMsg(
                              "Something went wrong, please try again."
                            );
                          }
                        }
                      }}
                    ></Button>
                  </div>
                  {page === 1 && (
                    <div className="flex mb-6 sm:mb-2 items-center justify-center">
                      <Button
                        text="Sign up with Google"
                        type="Google"
                        onClick={() => {
                          loginWithGoogle().then((e) => {
                            if (e.success) {
                              if ("isNewUser" in e && !e.isNewUser) {
                                router.push("/caregiver/book");
                              } else {
                                setPage(2);
                              }
                            } else {
                              setErrorBannerMsg("error" in e ? e.error : "");
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
