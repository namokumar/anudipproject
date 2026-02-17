import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { validateEmail, validatePassword, validateName, sanitizeInput } from '../../utils/validation';
import Footer from '../Landing/components/Footer';
import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, errors: [], label: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }

    // Live password strength check
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // --- Validate all fields ---
    const errors = {};

    const nameCheck = validateName(formData.fullName, 'Full name');
    if (!nameCheck.valid) errors.fullName = nameCheck.error;

    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) errors.email = emailCheck.error;

    const companyCheck = validateName(formData.company, 'Company name');
    if (!companyCheck.valid) errors.company = companyCheck.error;

    const passCheck = validatePassword(formData.password);
    if (!passCheck.valid) {
      errors.password = passCheck.errors.join(', ');
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      // Sanitize text inputs before sending to Supabase
      const cleanName = sanitizeInput(formData.fullName);
      const cleanCompany = sanitizeInput(formData.company);

      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            full_name: cleanName,
            company: cleanCompany,
          }
        }
      });

      if (signupError) throw signupError;

      if (data.user) {
        alert('Signup successful! Please check your email for verification.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Password strength bar colors
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4'];
  const strengthColor = strengthColors[passwordStrength.score] || '#ef4444';

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
            {/* Signup Card */}
            <div className={styles.loginCard}>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Start your 14-day free trial today</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {error && <div className={styles.errorMessage}>{error}</div>}

                {/* Full Name Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <div className={`${styles.inputWrapper} ${fieldErrors.fullName ? styles.inputError : ''}`}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>person</span>
                    <input
                      type="text"
                      name="fullName"
                      className={styles.input}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      maxLength={100}
                    />
                  </div>
                  {fieldErrors.fullName && <span className={styles.fieldError}>{fieldErrors.fullName}</span>}
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Work Email</label>
                  <div className={`${styles.inputWrapper} ${fieldErrors.email ? styles.inputError : ''}`}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>mail</span>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      maxLength={254}
                    />
                  </div>
                  {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
                </div>

                {/* Company Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name</label>
                  <div className={`${styles.inputWrapper} ${fieldErrors.company ? styles.inputError : ''}`}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>business</span>
                    <input
                      type="text"
                      name="company"
                      className={styles.input}
                      placeholder="Company Inc."
                      value={formData.company}
                      onChange={handleChange}
                      required
                      autoComplete="organization"
                      maxLength={100}
                    />
                  </div>
                  {fieldErrors.company && <span className={styles.fieldError}>{fieldErrors.company}</span>}
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <div className={`${styles.inputWrapper} ${fieldErrors.password ? styles.inputError : ''}`}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className={styles.input}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
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

                  {/* Password Strength Meter */}
                  {formData.password.length > 0 && (
                    <div className={styles.strengthMeter}>
                      <div className={styles.strengthBar}>
                        <div
                          className={styles.strengthFill}
                          style={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                            backgroundColor: strengthColor,
                          }}
                        />
                      </div>
                      <span className={styles.strengthLabel} style={{ color: strengthColor }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  )}

                  {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}

                  {/* Password requirements list */}
                  {formData.password.length > 0 && passwordStrength.errors.length > 0 && (
                    <ul className={styles.passwordRules}>
                      {passwordStrength.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="terms"
                    className={styles.checkbox}
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="terms" className={styles.checkboxLabel}>
                    I agree to the <a href="#" className={styles.termsLink}>Terms of Service</a> and <a href="#" className={styles.termsLink}>Privacy Policy</a>
                  </label>
                </div>
                {fieldErrors.agreeToTerms && <span className={styles.fieldError}>{fieldErrors.agreeToTerms}</span>}

                {/* Sign Up Button */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create My Account'}
                </button>
              </form>

              {/* Divider */}
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>Or join with</span>
                <div className={styles.dividerLine}></div>
              </div>

              {/* Social Signup */}
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

            {/* Login Prompt */}
            <div className={styles.signupPrompt}>
              <p>
                Already have an account?
                <Link to="/login" className={styles.signupLink}>
                  Log in
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

export default Signup;
