import { useRouter } from "next/router";
import { useState } from "react";

import { doesCaregiverWithEmailExist } from "db/actions/admin/Caregiver";
import { sendResetPasswordEmail } from "db/actions/resetPassword";

import { isValidEmail } from "@lib/utils/contactInfo";

import HalfScreen from "@components/logos/HalfScreen";
import ErrorToast from "@components/Onboarding/ErrorToast";
import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import LeftChevronIcon from "@components/Icons/LeftChevronIcon";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(
    "query" in router ? (router.query.email as string) : ""
  );
  const [error, setError] = useState("");

  const onReset = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const caregiverExists = await doesCaregiverWithEmailExist(email);
    if (!caregiverExists) {
      setError(
        "Unable to find account, check the email entered or create an account."
      );
      return;
    }
    const hasReset = await sendResetPasswordEmail(email);
    if (hasReset) {
      router.push(`emailSent?email=${encodeURIComponent(email)}`);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="flex absolute bg-white">
        <div className="h-screen w-screen">
          <div className="flex flex-col h-full sm:flex-row">
            <HalfScreen />
            <div className="flex flex-col justify-center mx-6 mt-8 gap-10 sm:w-1/2 sm:items-center sm:mx-0">
              <div className="sm:absolute sm:top-12 sm:left-3/4 sm:transform sm:-translate-x-1/2 w-full sm:max-w-lg">
                {error && (
                  <ErrorToast
                    text={error}
                    onClose={() => {
                      setError("");
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 justify-center sm:items-center">
                <div className="text-2xl font-bold">Forgot Password?</div>
                <div>No problem, we&apos;ll send you reset instructions.</div>
              </div>
              <div className="flex flex-col gap-5 max-w-lg w-full">
                <TextInput
                  label="Email"
                  currentValue={email}
                  onChange={setEmail}
                />
                <Button text="Reset Password" onClick={onReset}></Button>
              </div>

              <button
                className="flex leading-tight tracking-tight items-center gap-1 justify-center"
                onClick={() => {
                  router.push("login");
                }}
              >
                <LeftChevronIcon width={13.5} height={12} />
                Back to Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
