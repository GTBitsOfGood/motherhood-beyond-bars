import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import LeftChevronIcon from "@components/Icons/LeftChevronIcon";
import HalfScreen from "@components/logos/HalfScreen";
import { useRouter } from "next/router";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <>
      <div className="flex absolute bg-white">
        <div className="h-screen w-screen">
          <div className="flex flex-col h-full sm:flex-row">
            <HalfScreen />
            <div className="flex flex-col justify-center m-6 mt-8 gap-10 sm:w-1/2 sm:items-center">
              <div className="flex flex-col gap-3 sm:items-center">
                <div className="text-2xl font-bold">Set New Password?</div>
                <div>Password must be at least 8 characters</div>
              </div>
              <div className="flex flex-col gap-5 max-w-lg w-full">
                <TextInput
                  label="New Password"
                  placeholder="Create a secure password"
                />
                <TextInput
                  label="Confirm New Password"
                  placeholder="Confirm your password"
                />
                <Button text="Reset Password"></Button>
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
