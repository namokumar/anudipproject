/**
 * rateLimiter.js — Client-side brute-force throttle.
 *
 * Tracks failed attempts per action key in memory.
 * After MAX_ATTEMPTS failures, enforces a cooldown period.
 *
 * NOTE: This is a UX-layer defense. Real rate limiting is enforced
 * server-side by Supabase's built-in auth rate limits.
 */

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 30_000; // 30 seconds

// In-memory store: { [key]: { count, lastAttempt, lockedUntil } }
const attempts = new Map();

/**
 * Checks whether the action is currently rate-limited.
 * @param {string} key — unique identifier (e.g. 'login', 'signup')
 * @returns {{ allowed: boolean, remainingSeconds: number }}
 */
export const checkRateLimit = (key) => {
  const record = attempts.get(key);

  if (!record) {
    return { allowed: true, remainingSeconds: 0 };
  }

  // If locked, check if cooldown has expired
  if (record.lockedUntil) {
    const now = Date.now();
    if (now < record.lockedUntil) {
      const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, remainingSeconds };
    }

    // Cooldown expired — reset
    attempts.delete(key);
    return { allowed: true, remainingSeconds: 0 };
  }

  return { allowed: true, remainingSeconds: 0 };
};

/**
 * Records a failed attempt. If the threshold is reached, triggers lockout.
 * @param {string} key — unique identifier
 */
export const recordAttempt = (key) => {
  const record = attempts.get(key) || { count: 0, lastAttempt: 0, lockedUntil: null };

  record.count += 1;
  record.lastAttempt = Date.now();

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + COOLDOWN_MS;
  }

  attempts.set(key, record);
};

/**
 * Resets attempts for a key (call after successful action).
 * @param {string} key
 */
export const resetAttempts = (key) => {
  attempts.delete(key);
};

/**
 * Gets the current attempt count for a key.
 * @param {string} key
 * @returns {number}
 */
export const getAttemptCount = (key) => {
  const record = attempts.get(key);
  return record ? record.count : 0;
};
