import EmailSentIcon from "@components/Icons/emailSentIcon";
import HalfScreen from "@components/logos/HalfScreen";
import { useRouter } from "next/router";

export default function EmailSentScreen() {
  const router = useRouter();
  return (
    <>
      <div className="flex absolute bg-white">
        <div className="h-screen w-screen">
          <div className="flex flex-col h-full sm:flex-row">
            <HalfScreen />
            <div className="flex flex-col gap-6 justify-center sm:w-1/2 sm:items-center">
              <EmailSentIcon />
              <div className="flex flex-col gap-10 items-center">
                <div className="flex flex-col gap-3 items-center">
                  <div className="text-2xl font-bold">Email is on its way!</div>
                  <div>
                    We've sent you an email with a link to reset your password.
                  </div>
                </div>
                <div
                  className="text-mbb-pink underline cursor-pointer"
                  onClick={() => {
                    router.push("forgotPassword");
                  }}
                >
                  Didn't get an email?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
