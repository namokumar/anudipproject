/**
 * validation.js — Input validation and sanitization utilities.
 * Prevents XSS, enforces password strength, and validates email format.
 */

/**
 * Validates email against a strict regex pattern.
 * @param {string} email
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required.' };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long.' };
  }

  // RFC 5322 simplified — covers 99.9% of valid emails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  return { valid: true, error: null };
};

/**
 * Validates password strength and returns a score + detailed errors.
 * @param {string} password
 * @returns {{ valid: boolean, score: number, errors: string[], label: string }}
 *
 * Score: 0–5 (0 = terrible, 5 = excellent)
 */
export const validatePassword = (password) => {
  const errors = [];
  let score = 0;

  if (!password || typeof password !== 'string') {
    return { valid: false, score: 0, errors: ['Password is required.'], label: 'Too weak' };
  }

  // Minimum length
  if (password.length < 8) {
    errors.push('At least 8 characters');
  } else {
    score += 1;
    if (password.length >= 12) score += 1; // Bonus for 12+
  }

  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('At least 1 uppercase letter');
  } else {
    score += 1;
  }

  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('At least 1 lowercase letter');
  } else {
    score += 1;
  }

  // Digit
  if (!/[0-9]/.test(password)) {
    errors.push('At least 1 number');
  } else {
    score += 1;
  }

  // Special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) {
    errors.push('At least 1 special character (!@#$%...)');
  } else {
    score += 1;
  }

  // Cap score at 5
  score = Math.min(score, 5);

  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const label = labels[score];

  return {
    valid: errors.length === 0,
    score,
    errors,
    label,
  };
};

/**
 * Sanitizes user input to prevent XSS and script injection.
 * Strips HTML tags, script content, and dangerous characters.
 * @param {string} str
 * @returns {string} cleaned string
 */
export const sanitizeInput = (str) => {
  if (!str || typeof str !== 'string') return '';

  return str
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove javascript: and data: protocol URLs
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:/gi, '')
    // Remove event handler attributes
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
    // Remove null bytes
    .replace(/\0/g, '')
    // Trim whitespace
    .trim();
};

/**
 * Validates a name field (for full name, company name, etc.).
 * @param {string} name
 * @param {string} fieldLabel - e.g. "Full name" or "Company name"
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateName = (name, fieldLabel = 'Name') => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: `${fieldLabel} is required.` };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: `${fieldLabel} must be at least 2 characters.` };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: `${fieldLabel} is too long.` };
  }

  // Block obvious injection patterns (SQL, script tags)
  const dangerousPatterns = /(<script|<\/script|DROP\s+TABLE|SELECT\s+\*|INSERT\s+INTO|DELETE\s+FROM|UPDATE\s+.*SET|UNION\s+SELECT)/i;
  if (dangerousPatterns.test(trimmed)) {
    return { valid: false, error: `${fieldLabel} contains invalid characters.` };
  }

  return { valid: true, error: null };
};
