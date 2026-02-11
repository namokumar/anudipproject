import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navWrapper}>
          <div className={styles.logo}>
            <Link to="/">SupportSaaS</Link>
          </div>
          
          <nav className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </nav>

          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginLink}>Log in</Link>
            <Link to="/signup" className={styles.signupButton}>
              Get Started
            </Link>
          </div>

          <div className={styles.mobileMenuButton}>
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <a href="#features" className={styles.mobileNavLink}>Features</a>
          <a href="#pricing" className={styles.mobileNavLink}>Pricing</a>
          <a href="#about" className={styles.mobileNavLink}>About</a>
          <div className={styles.mobileAuthButtons}>
             <Link to="/login" className={styles.mobileNavLink}>Log in</Link>
             <Link to="/signup" className={styles.mobileSignupButton}>
                Get Started
             </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
