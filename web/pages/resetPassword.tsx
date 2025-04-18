import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import LeftChevronIcon from "@components/Icons/LeftChevronIcon";
import HalfScreen from "@components/logos/HalfScreen";
import ErrorToast from "@components/Onboarding/ErrorToast";
import {
  MIN_PASSWORD_LEN,
  validatePassword,
} from "@lib/utils/passwordCreation";
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { oobCode } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (oobCode) {
      try {
        verifyPasswordResetCode(auth, oobCode as string);
      } catch (e) {
        router.push("/login");
      }
    }
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const invalidReason = validatePassword({ newPassword, confirmPassword });

      if (invalidReason) {
        setError(invalidReason);
        return;
      }

      const auth = getAuth();
      if (oobCode) {
        await confirmPasswordReset(auth, oobCode as string, newPassword);
      } else {
        setError("Invalid reset link.");
      }
    } catch (err) {
      console.error(err);
      router.push("/login");
    }
  };

  return (
    <div className="flex absolute bg-white w-screen h-screen">
      <div className="flex flex-col h-full sm:flex-row w-full">
        <HalfScreen />
        <form
          className="flex flex-col justify-center mx-6 mt-8 gap-10 sm:w-1/2 sm:items-center sm:mx-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <div className="max-w-lg w-full flex flex-col gap-6 sm:mt-[calc(60px)]">
              <div className="flex flex-col gap-3 sm:items-center">
                <h1 className="text-2xl font-bold">Set New Password?</h1>
                <p>Password must be at least {MIN_PASSWORD_LEN} characters.</p>
              </div>
            </div>
            <div className="sm:absolute sm:top-12 sm:left-3/4 sm:transform sm:-translate-x-1/2 w-full sm:max-w-lg">
              {error && (
                <ErrorToast text={error} onClose={() => setError(null)} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 max-w-lg w-full">
            <TextInput
              label="New Password"
              placeholder="Create a secure password"
              currentValue={newPassword}
              onChange={setNewPassword}
              inputType="password"
            />
            <TextInput
              label="Confirm New Password"
              placeholder="Confirm your password"
              currentValue={confirmPassword}
              onChange={setConfirmPassword}
              inputType="password"
            />
            <button type="submit">
              <Button text="Reset Password" />
            </button>
          </div>
          <button
            className="flex leading-tight tracking-tight items-center gap-1 justify-center mb-10"
            onClick={() => {
              router.push("/login");
            }}
          >
            <LeftChevronIcon width={13.5} height={12} />
            Back to Log In
          </button>
        </form>
      </div>
    </div>
  );
}
