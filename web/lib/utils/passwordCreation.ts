import {
  PasswordLengthError,
  PasswordMismatchError,
  SameAsOldPasswordError,
} from "@lib/exceptions/passwordExceptions";

export function validatePassword(
  newPassword: string,
  confirmPassword: string,
  oldPassword?: string
) {
  if (newPassword.length < 8) {
    throw new PasswordLengthError();
  } else if (newPassword !== confirmPassword) {
    throw new PasswordMismatchError();
  } else if (oldPassword && newPassword === oldPassword) {
    throw new SameAsOldPasswordError();
  }
}
