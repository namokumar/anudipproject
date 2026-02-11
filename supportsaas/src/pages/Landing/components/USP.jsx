import styles from './USP.module.css';

const USP = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>Why Choose SupportSaaS?</span>
        <h2 className={styles.headline}>
          Speed is our currency. <br />
          <span className={styles.highlight}>Efficiency is our product.</span>
        </h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>2x</span>
            <span className={styles.statLabel}>Faster Resolution Time</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>40%</span>
            <span className={styles.statLabel}>Reduction in Ticket Volume</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;
