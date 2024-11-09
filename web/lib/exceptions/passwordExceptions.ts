import { PASSWORD_ERROR_CODE } from "@lib/utils/consts";

export abstract class PasswordException extends Error {
  code: PASSWORD_ERROR_CODE;

  constructor(message: string, code: PASSWORD_ERROR_CODE) {
    super(message);
    this.code = code;
  }
}

export class PasswordLengthError extends PasswordException {
  constructor() {
    super(
      "Password is not at least 8 characters.",
      PASSWORD_ERROR_CODE.INVALID_LENGTH
    );
  }
}

export class SameAsOldPasswordError extends PasswordException {
  constructor() {
    super(
      "New password cannot be the same as the old password.",
      PASSWORD_ERROR_CODE.SAME_AS_OLD_PASSWORD
    );
  }
}

export class PasswordMismatchError extends PasswordException {
  constructor() {
    super("Passwords do not match.", PASSWORD_ERROR_CODE.MISMATCH);
  }
}
