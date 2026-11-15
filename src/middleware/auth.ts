import { createHash, timingSafeEqual } from "node:crypto";
import type { IncomingMessage } from "node:http";

function digest(value: string) {
	return createHash("sha256").update(value).digest();
}

/** Checks the `Authorization: Bearer <token>` header in constant time. */
export function isAuthorized(req: IncomingMessage, token: string): boolean {
	const header = req.headers.authorization ?? "";
	const [scheme, presented = ""] = header.split(" ");

	if (scheme?.toLowerCase() !== "bearer") return false;

	return timingSafeEqual(digest(presented), digest(token));
}
