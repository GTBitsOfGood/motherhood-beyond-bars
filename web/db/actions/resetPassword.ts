import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const sendResetPasswordEmail = async (email: string) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "Error sending password reset email:",
        errorCode,
        errorMessage
      );
    });
};
