import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  // Close mobile menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>
                shield_with_heart
            </span>
          </div>
          <Link to="/" className={styles.logoText}>
            SupportSaaS
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Product</a>
          <a href="#" className={styles.navLink}>Integrations</a>
          <a href="#" className={styles.navLink}>Pricing</a>
          <a href="#" className={styles.navLink}>Docs</a>
        </nav>

        <div className={styles.actions}>
          {!loading && user ? (
            /* Authenticated: show Dashboard button */
            <Link to="/dashboard" className={styles.dashboardButton}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', verticalAlign: 'middle', marginRight: '0.35rem' }}>
                dashboard
              </span>
              Dashboard
            </Link>
          ) : (
            /* Guest: show Login + Sign Up */
            <>
              <Link to="/login" className={styles.loginButton}>Login</Link>
              <Link to="/signup" className={styles.signupButton}>
                Sign Up Free
              </Link>
            </>
          )}
           <button 
            className={styles.mobileMenuButton} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" className={styles.mobileNavLink}>Product</a>
          <a href="#" className={styles.mobileNavLink}>Integrations</a>
          <a href="#" className={styles.mobileNavLink}>Pricing</a>
          <a href="#" className={styles.mobileNavLink}>Docs</a>
          <div className={styles.mobileActions}>
            {!loading && user ? (
              <Link to="/dashboard" className={styles.mobileSignupButton} onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className={styles.mobileLoginButton} onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className={styles.mobileSignupButton} onClick={() => setIsOpen(false)}>
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
