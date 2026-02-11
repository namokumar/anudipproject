import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/login" className={styles.loginButton}>Login</Link>
          <Link to="/signup" className={styles.signupButton}>
            Sign Up Free
          </Link>
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
        </div>
      )}
    </header>
  );
};

export default Header;
