import { CustomError } from './customError';

export class InternalServerError extends CustomError {
	statusCode = 500;

	constructor(private reason: string) {
		super(reason);

		// Since we extend built in class
		// https://stackoverflow.com/a/41429145
		Object.setPrototypeOf(this, InternalServerError.prototype);
	}

	serializeErrors() {
		return [
			{
				message: this.reason,
			},
		];
	}
}
