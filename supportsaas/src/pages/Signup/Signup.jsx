import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Landing/components/Footer';
import styles from './Signup.module.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', formData);
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
            {/* Signup Card */}
            <div className={styles.loginCard}>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Start your 14-day free trial today</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>person</span>
                    <input
                      type="text"
                      name="fullName"
                      className={styles.input}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Work Email</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>mail</span>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>business</span>
                    <input
                      type="text"
                      name="company"
                      className={styles.input}
                      placeholder="Company Inc."
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className={styles.input}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
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

                {/* Sign Up Button */}
                <button type="submit" className={styles.submitButton}>
                  Create My Account
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
