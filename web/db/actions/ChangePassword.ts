import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return { success: false, message: "No user is logged in" };
  }

  // Check if the user is an email/password user
  const isPasswordUser = user.providerData.some(
    (provider) => provider.providerId === "password"
  );

  if (!isPasswordUser) {
    return {
      success: false,
      message: "Password change is not available for Google login users.",
    };
  }

  try {
    // Reauthenticate the email/password user with current password
    const credential = EmailAuthProvider.credential(
      user.email || "",
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update the user's password
    await updatePassword(user, newPassword);
    return { success: true, message: "Password updated successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to update password: ${error.message}`,
    };
  }
}
