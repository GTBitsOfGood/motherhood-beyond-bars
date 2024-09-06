import crypto from 'crypto';

const key = crypto
	.createHash('sha256')
	.update(String(process.env.SECRET_KEY))
	.digest('base64')
	.substr(0, 32);

const encrypt = (text: string) => {
	const iv = crypto.randomBytes(16);

	const cipher = crypto.createCipheriv('aes-256-ctr', key!, iv);

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	};
};

const decrypt = (hash: { iv: string; content: string }) => {
	const decipher = crypto.createDecipheriv(
		'aes-256-ctr',
		key!,
		Buffer.from(hash.iv, 'hex'),
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	]);

	return decrpyted.toString();
};

export { encrypt, decrypt };
