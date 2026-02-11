import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Landing/components/Footer';
import styles from './Login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
  };

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

              <form className={styles.form} onSubmit={handleSubmit}>
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
                <button type="submit" className={styles.submitButton}>
                  Sign In
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
