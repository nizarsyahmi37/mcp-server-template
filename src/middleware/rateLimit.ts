export interface RateLimitOptions {
	/** Maximum requests allowed per client within the window. */
	max: number;
	/** Window length in milliseconds. */
	windowMs: number;
}

export interface RateLimitResult {
	allowed: boolean;
	retryAfterSeconds: number;
}

/** In-memory fixed-window limiter keyed by client id (e.g. IP address). */
export function createRateLimiter({ max, windowMs }: RateLimitOptions) {
	const windows = new Map<string, { count: number; resetAt: number }>();

	return {
		check(key: string, now = Date.now()): RateLimitResult {
			for (const [id, entry] of windows) {
				if (entry.resetAt <= now) windows.delete(id);
			}

			const entry = windows.get(key) ?? { count: 0, resetAt: now + windowMs };

			entry.count += 1;
			windows.set(key, entry);

			return {
				allowed: entry.count <= max,
				retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
			};
		},
	};
}
