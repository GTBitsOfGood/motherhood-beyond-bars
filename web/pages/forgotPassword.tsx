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
              <div className="flex flex-col gap-3 justify-center sm:items-center">
                <div className="text-2xl font-bold">Forgot Password?</div>
                <div>No problem, we'll send you reset instructions.</div>
              </div>
              <div className="flex flex-col gap-5 max-w-lg w-full">
                <TextInput label="Email" />
                <Button
                  text="Reset Password"
                  onClick={() => {
                    router.push("/resetPassword");
                  }}
                ></Button>
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
