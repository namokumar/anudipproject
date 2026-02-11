import styles from './ProblemSolution.module.css';

const ProblemSolution = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Stop fighting fires. Start building relationships.</h2>
          <p className={styles.subheadline}>
            Traditional support tools are slow, clunky, and disconnected. SupportSaaS is built for the way modern teams work.
          </p>
        </div>

        <div className={styles.grid}>
          {/* The Old Way */}
          <div className={`${styles.card} ${styles.problemCard}`}>
            <h3 className={`${styles.cardTitle} ${styles.problemTitle}`}>
              <span className="material-symbols-outlined">cancel</span>
              The Old Way
            </h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.problemIcon}`}>close</span>
                <span>Scattered conversations across Email, Slack, and WhatsApp.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.problemIcon}`}>close</span>
                <span>Slow response times leading to frustrated customers.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.problemIcon}`}>close</span>
                <span>Manual tagging and routing that wastes hours every week.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.problemIcon}`}>close</span>
                <span>No visibility into team performance or metrics.</span>
              </li>
            </ul>
          </div>

          {/* The SupportSaaS Way */}
          <div className={`${styles.card} ${styles.solutionCard}`}>
            <h3 className={`${styles.cardTitle} ${styles.solutionTitle}`}>
              <span className="material-symbols-outlined">check_circle</span>
              The SupportSaaS Way
            </h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.solutionIcon}`}>check</span>
                <span>All channels unified in one shared inbox.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.solutionIcon}`}>check</span>
                <span>AI-powered summaries and suggested responses for instant replies.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.solutionIcon}`}>check</span>
                <span>Automated workflows that route tickets to the right expert instantly.</span>
              </li>
              <li className={styles.listItem}>
                <span className={`material-symbols-outlined ${styles.icon} ${styles.solutionIcon}`}>check</span>
                <span>Real-time analytics to track and improve team efficiency.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
