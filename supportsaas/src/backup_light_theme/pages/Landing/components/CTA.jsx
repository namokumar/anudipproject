import { Link } from 'react-router-dom';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>
      
      <div className={styles.container}>
        <h2 className={styles.headline}>
          Ready to transform your customer support?
        </h2>
        <p className={styles.subheadline}>
          Join thousands of fast-growing companies using SupportSaaS to delight their customers every day.
        </p>
        
        <div className={styles.buttonGroup}>
          <Link to="/signup" className={styles.primaryButton}>
            Get Started for Free
          </Link>
          <button className={styles.secondaryButton}>
            Contact Sales
          </button>
        </div>
        
        <p className={styles.disclaimer}>
          No credit card required. 14-day free trial on all plans.
        </p>
      </div>
    </section>
  );
};

export default CTA;
