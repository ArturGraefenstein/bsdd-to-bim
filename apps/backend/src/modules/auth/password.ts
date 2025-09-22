import argon2 from "argon2";

const PEPPER = process.env.PASSWORD_PEPPER ?? "service-reckers-pepper"; // optional

export async function hashPassword(plain: string) {
	return argon2.hash(plain + PEPPER);
}

export async function verifyPassword(hash: string, plain: string) {
	return argon2.verify(hash, plain + PEPPER);
}
