import jwt from "jsonwebtoken";
import { SignJWT } from "jose";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type OneOrTwoDigits = `${Digit}` | `${Digit}${Digit}`;

export type JWTDuration =
	| `${OneOrTwoDigits}s`
	| `${OneOrTwoDigits}m`
	| `${OneOrTwoDigits}h`
	| `${OneOrTwoDigits}d`
	| `${OneOrTwoDigits}w`
	| `${OneOrTwoDigits}y`;

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const issuer = "https://service.reckersfluid.de";
const audience = "reckers-service";
const algorithm = "HS256";

export function signJwtToken<T extends Record<string, any>>(
	sub: string,
	payload: T,
	duration: JWTDuration,
) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: algorithm })
		.setIssuer(issuer)
		.setAudience(audience)
		.setSubject(sub)
		.setIssuedAt()
		.setExpirationTime(duration)
		.sign(secret);
}

export enum JWT_TOKEN_VERIFICATION_ERROR {
	TOKEN_INVALID,
	TOKEN_EXPIRED,
}

export function verifyJwtToken<T extends jwt.JwtPayload & Record<string, any>>(
	token: string,
): JWT_TOKEN_VERIFICATION_ERROR | T {
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET!, {
			issuer,
			audience,
			algorithms: [algorithm],
		});

		if (typeof payload !== "object") {
			return JWT_TOKEN_VERIFICATION_ERROR.TOKEN_INVALID;
		}

		return payload as T;
	} catch (error) {
		if ((error as jwt.TokenExpiredError).name === "TokenExpiredError") {
			return JWT_TOKEN_VERIFICATION_ERROR.TOKEN_EXPIRED;
		}
		return JWT_TOKEN_VERIFICATION_ERROR.TOKEN_INVALID;
	}
}

export function isJwtError(value: any): value is JWT_TOKEN_VERIFICATION_ERROR {
	return Object.values(JWT_TOKEN_VERIFICATION_ERROR).includes(value);
}
