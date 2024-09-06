import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(private errors: ValidationError[]) {
		super('Invalid Request');

		// Since we extend built in class
		// https://stackoverflow.com/a/41429145
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.errors.map((e) => ({
			message: e.msg,
			field: e.param,
		}));
	}
}
