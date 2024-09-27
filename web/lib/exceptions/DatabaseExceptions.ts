import { HTTP_STATUS_CODE } from "../consts";

export abstract class DatabaseException extends Error {
  code: HTTP_STATUS_CODE;
  constructor(message: string, code: HTTP_STATUS_CODE) {
    super(message);
    this.code = code;
  }
}

export class GenericDatabaseErrorException extends DatabaseException {
    constructor(message = "An error has occurred") {
        super(message, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export class PathNotFoundError extends DatabaseException {
    constructor(path: string) {
        super(`Path not found: ${path}`, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}