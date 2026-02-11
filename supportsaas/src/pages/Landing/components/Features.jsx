import styles from './Features.module.css';

const features = [
  {
    title: "Real-time Tracking",
    description: "Monitor ticket status as they happen with live updates. Never leave a customer hanging with our instant sync engine.",
    icon: "timer"
  },
  {
    title: "Unified Inbox",
    description: "Email, Slack, WhatsApp, and Intercom—all in one single view for your entire team. No more switching tabs.",
    icon: "inbox"
  },
  {
    title: "Smart Filtering",
    description: "Prioritize what matters with AI-driven sorting and tags. Automatically route high-priority tickets to your top agents.",
    icon: "filter_alt"
  }
];

const Features = () => {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerContent}>
            <h2 className={styles.headline}>Engineered for Efficiency</h2>
            <p className={styles.description}>Powerful tools to help you manage your support tickets like a pro. Scale your team without losing speed.</p>
          </div>
          <button className={styles.exploreLink}>
            Explore all features <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontSize: '30px' }}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>
                {feature.title}
              </h3>
              <p className={styles.cardDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
