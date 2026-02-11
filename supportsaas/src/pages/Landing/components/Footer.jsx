import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <span className="material-symbols-outlined" style={{ fontSize: '30px', color: 'var(--primary-color)' }}>shield_with_heart</span>
              <h2 className={styles.brandName}>SupportSaaS</h2>
            </div>
            <p className={styles.brandDescription}>
              The definitive support portal for high-growth SaaS companies and individual portfolios.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>language</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>alternate_email</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>hub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.columnHeader}>Product</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Features</a></li>
              <li><a href="#" className={styles.link}>API Reference</a></li>
              <li><a href="#" className={styles.link}>Integrations</a></li>
              <li><a href="#" className={styles.link}>Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.columnHeader}>Company</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>About Us</a></li>
              <li><a href="#" className={styles.link}>Careers</a></li>
              <li><a href="#" className={styles.link}>Blog</a></li>
              <li><a href="#" className={styles.link}>Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.columnHeader}>Support</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Help Center</a></li>
              <li><a href="#" className={styles.link}>Contact</a></li>
              <li><a href="#" className={styles.link}>Status</a></li>
              <li><a href="#" className={styles.link}>Docs</a></li>
            </ul>
          </div>

           <div>
            <h4 className={styles.columnHeader}>Legal</h4>
             <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Privacy</a></li>
              <li><a href="#" className={styles.link}>Terms</a></li>
              <li><a href="#" className={styles.link}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SupportSaaS Inc. All rights reserved. Built for modern portfolios.
          </p>
          <div className={styles.status}>
            <span className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
