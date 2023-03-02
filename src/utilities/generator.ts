/**
 * Generator utility functions.
 */

import * as crypto from "crypto";
import { generateKeyPairSync } from "crypto";

function generateRandomNumber(min: number, max: number) {
	return crypto.randomInt(min, max);
}

export const { privateKey, publicKey } = generateKeyPairSync("rsa", {
	modulusLength: 2048,
	publicKeyEncoding: {
		type: "spki",
		format: "pem"
	},
	privateKeyEncoding: {
		type: "pkcs8",
		format: "pem"
	}
});

export function generateUsername(firstName: string, lastName: string) {
	const name = `${firstName}${lastName}`;
	const nameLowerCase = name.toLowerCase();
	const generatedNumbers = generateRandomNumber(100000000, 1000000000);

	return `${nameLowerCase}${generatedNumbers}`;
}

export function generateNoteUniqueId(): string {
	const prependedId = "noteuuid";
	const appendedId = crypto.randomBytes(16).toString("hex");

	return `${prependedId}${appendedId}`;
}