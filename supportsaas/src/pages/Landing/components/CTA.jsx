import { Link } from 'react-router-dom';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          
          <div className={styles.content}>
            <h2 className={styles.headline}>
              Ready to elevate your support experience?
            </h2>
            <p className={styles.subheadline}>
              Join over 2,000+ teams delivering world-class customer service with SupportSaaS. Scale your support without scaling your stress.
            </p>
            
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>
                Get Started Now
              </button>
              <button className={styles.secondaryButton}>
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
