import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      {/* Background Glow */}
      <div className={styles.heroGlowContainer}>
         <div className={styles.heroGlow}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.badge}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>auto_awesome</span>
          Now with AI-Powered Summaries
        </div>

        <h1 className={styles.headline}>
          Streamline Your <br/>
          <span className={styles.headlineGradient}>Support Workflow</span>
        </h1>
        
        <p className={styles.subheadline}>
          The all-in-one platform for managing customer inquiries with speed and precision. Build a portfolio-ready support experience for your modern SaaS.
        </p>
        
        <div className={styles.ctaGroup}>
          <Link to="/signup" className={styles.primaryButton}>
            Get Started for Free
          </Link>
          <Link to="/demo" className={styles.secondaryButton}>
            <span className="material-symbols-outlined">play_circle</span>
            View Demo
          </Link>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className={styles.dashboardContainer}>
          <div className={styles.dashboardGroup}> {/* Added group wrapper for hover effect */}
            <div className={styles.dashboardGlowBg}></div>
            <div className={styles.dashboardCard}>
              <div className={styles.browserHeader}>
                <div className={styles.windowControls}>
                  <div className={`${styles.controlDot} ${styles.redDot}`}></div>
                  <div className={`${styles.controlDot} ${styles.yellowDot}`}></div>
                  <div className={`${styles.controlDot} ${styles.greenDot}`}></div>
                </div>
                <div className={styles.urlBar}>app.supportsaas.io/dashboard</div>
                <div style={{ width: '40px' }}></div>
              </div>
              
              {/* Using the image from the design provided by user */}
              <img 
                className={styles.dashboardImage} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTEp5rQ7oIbn2fIe-1HcHpnE84DHmNmnzI4xD5QnKUPvUbTbonUNxWhiUZro7TuoOQP-lDZda5cSqfUIy0FPlEvZ-vFdhDI7EFh2BI3qpj8h640WAU07PdkVaxe5smK7hRBpbpFDbMRo20rq3aLHMALWICFSJIrAEFRqweMfjmGDN9SoO_V_m96jwRi89ZIUBPRFFn_FvPz4eHxUL2iDbHQWAQNj-s8kwlUZQtXVcoTDkUeP_u4N-fNQI6bK4S6lis_0LquS6vwG4" 
                alt="Modern dark mode SaaS dashboard showing support ticket analytics and charts" 
              />
            </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
