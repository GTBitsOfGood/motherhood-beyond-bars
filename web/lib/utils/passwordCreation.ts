export const MIN_PASSWORD_LEN = 10;

export function validatePassword({
  newPassword,
  confirmPassword,
  oldPassword,
}: {
  newPassword: string;
  confirmPassword?: string;
  oldPassword?: string;
}) {
  if (newPassword.length < MIN_PASSWORD_LEN) {
    return `Password must be at least ${MIN_PASSWORD_LEN} characters.`;
  } else if (newPassword !== confirmPassword) {
    return "Passwords must match.";
  } else if (oldPassword && newPassword === oldPassword) {
    return "New password must be different from old password.";
  }
}
