import { CustomError } from './customError';

export class ForbiddenError extends CustomError {
	statusCode = 401;

	constructor() {
		super('Forbidden Route');

		// Since we extend built in class
		// https://stackoverflow.com/a/41429145
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}

	serializeErrors() {
		return [
			{
				message: 'Not Authorized',
			},
		];
	}
}
