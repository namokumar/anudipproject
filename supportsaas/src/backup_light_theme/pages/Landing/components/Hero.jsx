import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.headline}>
            <span className={styles.headlineMain}>Customer Support</span>
            <span className={styles.headlineHighlight}>
              Reimagined for Speed
            </span>
          </h1>
          <p className={styles.subheadline}>
            Streamline your support workflow with our AI-powered platform. 
            Resolve tickets faster, delight customers, and scale your team effortlessly.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/signup" className={styles.primaryButton}>
              Start Free Trial
            </Link>
            <Link to="/demo" className={styles.secondaryButton}>
              View Demo
            </Link>
          </div>
        </div>

        <div className={styles.dashboardPreview}>
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardInner}>
                    {/* Placeholder for Dashboard Image */}
                    <div className={styles.placeholderContent}>
                        <svg className={styles.placeholderIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className={styles.placeholderText}>Dashboard Preview</span>
                    </div>
                     {/* Decorative Elements */}
                    <div className={styles.decorativeBlob1}></div>
                    <div className={styles.decorativeBlob2}></div>
                </div>
            </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgBlob1}></div>
        <div className={styles.bgBlob2}></div>
      </div>
    </section>
  );
};

export default Hero;
