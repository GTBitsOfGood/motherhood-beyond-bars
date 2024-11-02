import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import LeftChevronIcon from "@components/Icons/LeftChevronIcon";
import HalfScreen from "@components/logos/HalfScreen";
import { sendResetPasswordEmail } from "db/firebase/resetPassword";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onReset = () => {
    sendResetPasswordEmail(email);
  };

  return (
    <>
      <div className="flex absolute bg-white">
        <div className="h-screen w-screen">
          <div className="flex flex-col h-full sm:flex-row">
            <HalfScreen />
            <div className="flex flex-col justify-center mx-6 mt-8 gap-10 sm:w-1/2 sm:items-center sm:mx-0">
              <div className="flex flex-col gap-3 justify-center sm:items-center">
                <div className="text-2xl font-bold">Forgot Password?</div>
                <div>No problem, we'll send you reset instructions.</div>
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
