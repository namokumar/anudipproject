import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { validateEmail } from '../../utils/validation';
import { checkRateLimit, recordAttempt, resetAttempts } from '../../utils/rateLimiter';
import Footer from '../Landing/components/Footer';
import styles from './Login.module.css';

const RATE_LIMIT_KEY = 'login';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for rate limiting
  const startCountdown = (seconds) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // --- Rate limit check ---
    const rateCheck = checkRateLimit(RATE_LIMIT_KEY);
    if (!rateCheck.allowed) {
      setError(`Too many failed attempts. Please wait ${rateCheck.remainingSeconds}s before trying again.`);
      if (countdown === 0) startCountdown(rateCheck.remainingSeconds);
      return;
    }

    // --- Email validation ---
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error);
      return;
    }

    // --- Password presence check ---
    if (!password || password.length < 1) {
      setError('Password is required.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (loginError) {
        // Record failed attempt for rate limiting
        recordAttempt(RATE_LIMIT_KEY);

        // Check if now locked out
        const postCheck = checkRateLimit(RATE_LIMIT_KEY);
        if (!postCheck.allowed) {
          startCountdown(postCheck.remainingSeconds);
          throw new Error(`Too many failed attempts. Please wait ${postCheck.remainingSeconds}s before trying again.`);
        }

        // Generic error message — don't reveal whether email exists
        throw new Error('Invalid email or password. Please try again.');
      }

      if (data.user) {
        // Reset rate limiter on success
        resetAttempts(RATE_LIMIT_KEY);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLocked = countdown > 0;

  return (
    <div className={styles.page}>
      {/* Abstract Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoIcon}>
              <span className="material-symbols-outlined">shield_with_heart</span>
            </div>
            <h2 className={styles.logoText}>SupportSaaS</h2>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.helpText}>Need help?</span>
            <button className={styles.contactButton}>Contact Sales</button>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.loginWrapper}>
            {/* Login Card */}
            <div className={styles.loginCard}>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Log in to manage your support tickets</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>mail</span>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      maxLength={254}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>Password</label>
                    <Link to="/forgot-password" className={styles.forgotLink}>
                      Forgot password?
                    </Link>
                  </div>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={styles.input}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      maxLength={128}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    id="remember"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className={styles.checkboxLabel}>
                    Stay signed in for 30 days
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading || isLocked}
                >
                  {isLocked
                    ? `Locked Out (${countdown}s)`
                    : loading
                      ? 'Signing In...'
                      : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>Or continue with</span>
                <div className={styles.dividerLine}></div>
              </div>

              {/* Social Login */}
              <div className={styles.socialButtons}>
                <button className={styles.socialButton}>
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className={styles.googleIcon}
                  />
                  Google
                </button>
                <button className={styles.socialButton}>
                  <span className="material-symbols-outlined">terminal</span>
                  SSO
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className={styles.signupPrompt}>
              <p>
                Don't have an account?
                <Link to="/signup" className={styles.signupLink}>
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Shared Footer Component */}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
