import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
const { hash, compare } = bcrypt;

// Hash Password
export const hashPassword = async (rawPassword) => new Promise((resolve, reject) => {
	hash(rawPassword, 10)
		.then(resolve)
		.catch(reject);
});

// Compare Password
export const matchPassword = async (raw, encrypted) => new Promise((resolve, reject) => {
	compare(raw, encrypted)
		.then(resolve)
		.catch(reject);
});

// Assign Token
export const assignToken = (payload, secret) => {
	return sign(payload, secret);
};

// Verify Token
export const verifyToken = async (payload, secret) => {
	return await verify(payload, secret)
};

// Access Token
export const generateAuthToken = function (id) {
	return sign({ id, role: 'TRAINER' }, process.env.JWT_HASH, { expiresIn: '15d' });
};

// Refresh Token
export const generateRefreshToken = function (id) {
	return sign({ id, role: 'TRAINER' }, process.env.JWT_HASH, { expiresIn: '30d' });
};
