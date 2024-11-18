import { useRouter } from "next/router";

import EmailSentIcon from "@components/Icons/EmailSentIcon";
import HalfScreen from "@components/logos/HalfScreen";

export default function EmailSentScreen() {
  const router = useRouter();
  return (
    <>
      <div className="flex absolute bg-white">
        <div className="h-screen w-screen">
          <div className="flex flex-col h-full sm:flex-row">
            <HalfScreen />
            <div className="flex flex-col gap-6 justify-center sm:w-1/2 sm:items-center">
              <div className="m-8 sm:m-0">
                <EmailSentIcon />
              </div>
              <div className="flex flex-col gap-10 items-center">
                <div className="flex flex-col gap-3 items-center">
                  <div className="text-2xl font-bold">Email is on its way!</div>
                  <div className="text-center mx-2">
                    We've sent you an email with a link to reset your password.
                  </div>
                </div>
                <div
                  className="text-mbb-pink underline cursor-pointer"
                  onClick={() => {
                    const email = router.query.email;
                    router.push(
                      email ? `forgotPassword?email=${email}` : "forgotPassword"
                    );
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
