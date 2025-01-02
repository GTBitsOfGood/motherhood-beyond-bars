import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const sendResetPasswordEmail = async (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "Error sending password reset email:",
        errorCode,
        errorMessage
      );
      return false;
    });
};
